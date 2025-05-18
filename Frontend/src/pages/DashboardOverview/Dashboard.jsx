import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, ButtonGroup, Button, Alert } from 'react-bootstrap';
import { 
  PeopleFill, 
  PersonBadge,
  GenderMale,
  GenderFemale,
  BarChart,
  PieChart,
  PersonCheck,
  PersonX
} from 'react-bootstrap-icons';
import { useTheme } from '../../hooks/ThemeContext';
import { Chart as ChartJS, BarElement, PieController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { fetchStudents } from '../../api/studentsApi';
import { fetchUsers } from '../../api/userApi';

ChartJS.register(
  BarElement, PieController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend
);

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    students: [],
    users: [],
    loading: true,
    error: null
  });
  const [activeStudentChart, setActiveStudentChart] = useState('byClass');
  const [activeUserChart, setActiveUserChart] = useState('byStatus');

  // Options de style dynamiques
  const cardStyle = {
    backgroundColor: darkMode ? '#2c3034' : '#fff',
    border: darkMode ? '1px solid #495057' : '1px solid #dee2e6'
  };

  const textStyle = {
    color: darkMode ? '#f8f9fa' : '#212529'
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#fff' : '#333',
          font: { size: 12 }
        }
      },
      tooltip: {
        bodyFont: { size: 14 },
        titleFont: { size: 16 }
      }
    },
    scales: {
      y: {
        ticks: {
          color: darkMode ? '#ccc' : '#666',
          font: { size: 12 }
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          color: darkMode ? '#ccc' : '#666',
          font: { size: 12 }
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
          const students = await fetchStudents();
          if(!students)throw new Error("Échec récupération des etudiants");
          const users = await fetchUsers();
          if (!users) throw new Error("Échec récupération des utilisateurs");
        setStats({
          students,
          users,
          loading: false,
          error: null
        });
      } catch (err) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: err.response?.data?.message || 'Erreur de chargement'
        }));
      }
    };

    fetchData();
  }, []);

  // Préparer les données pour les graphiques étudiants
  const prepareStudentData = () => {
    // Regrouper par classe (niveau + parcours)
    const classes = {};
    stats.students.forEach(student => {
      const key = `${student.niveau} ${student.parcours}`;
      if (!classes[key]) {
        classes[key] = {
          niveau: student.niveau,
          parcours: student.parcours,
          total: 0,
          HOMME: 0,
          FEMME: 0
        };
      }
      classes[key].total++;
      classes[key][student.sexe]++;
    });

    const classNames = Object.keys(classes);
    const classData = Object.values(classes);

    // Données pour le graphique par classe
    const byClassData = {
      labels: classNames,
      datasets: [{
        label: 'Étudiants par classe',
        data: classData.map(c => c.total),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    // Données pour le graphique par sexe
    const bySexData = {
      labels: ['Hommes', 'Femmes'],
      datasets: [{
        label: 'Répartition par sexe',
        data: [
          classData.reduce((sum, c) => sum + c.HOMME, 0),
          classData.reduce((sum, c) => sum + c.FEMME, 0)
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };

    return { byClassData, bySexData, classData };
  };

  // Préparer les données pour les graphiques utilisateurs
  const prepareUserData = () => {
    const byStatusData = {
      labels: ['Actifs', 'Inactifs'],
      datasets: [{
        label: 'Statut des utilisateurs',
        data: [
          stats.users.filter(u => u.status === 'ACTIVE').length,
          stats.users.filter(u => u.status === 'INACTIVE').length
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const byRoleData = {
      labels: ['Admin', 'User'],
      datasets: [{
        label: 'Répartition par rôle',
        data: [
          stats.users.filter(u => u.role === 'ADMIN').length,
          stats.users.filter(u => u.role === 'USER').length
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    };

    return { byStatusData, byRoleData };
  };

  const { byClassData, bySexData, classData } = prepareStudentData();
  const { byStatusData, byRoleData } = prepareUserData();

  if (stats.loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant={darkMode ? "light" : "primary"} />
      </Container>
    );
  }

  if (stats.error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">{stats.error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <h3 className="mb-4" style={textStyle}>Tableau de bord</h3>

      <Row className="mb-4">
        {/* Carte Étudiants */}
        <Col md={6} className="mb-3">
          <Card className="shadow-sm" style={cardStyle}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <PeopleFill size={24} className="text-primary me-2" />
                  <h5 className="mb-0" style={textStyle}>Étudiants</h5>
                </div>
                <ButtonGroup size="sm">
                  <Button 
                    variant={activeStudentChart === 'byClass' ? 'primary' : darkMode ? 'outline-light' : 'outline-secondary'}
                    onClick={() => setActiveStudentChart('byClass')}
                  >
                    <BarChart className="me-1" /> Par classe
                  </Button>
                  <Button 
                    variant={activeStudentChart === 'bySex' ? 'primary' : darkMode ? 'outline-light' : 'outline-secondary'}
                    onClick={() => setActiveStudentChart('bySex')}
                  >
                    <PieChart className="me-1" /> Par sexe
                  </Button>
                </ButtonGroup>
              </div>
              
              <div className="text-center mb-2">
                <h2 style={textStyle}>{stats.students.length}</h2>
                <small className={darkMode ? "text-light" : "text-muted"}>Total étudiants</small>
              </div>

              {activeStudentChart === 'byClass' && (
                <div style={{ height: '300px' }}>
                  <Bar data={byClassData} options={chartOptions} />
                </div>
              )}

              {activeStudentChart === 'bySex' && (
                <div style={{ height: '300px' }}>
                  <Pie data={bySexData} options={chartOptions} />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Carte Utilisateurs */}
        <Col md={6} className="mb-3">
          <Card className="shadow-sm" style={cardStyle}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <PersonBadge size={24} className="text-success me-2" />
                  <h5 className="mb-0" style={textStyle}>Utilisateurs</h5>
                </div>
                <ButtonGroup size="sm">
                  <Button 
                    variant={activeUserChart === 'byStatus' ? 'primary' : darkMode ? 'outline-light' : 'outline-secondary'}
                    onClick={() => setActiveUserChart('byStatus')}
                  >
                    <PersonCheck className="me-1" /> Statut
                  </Button>
                  <Button 
                    variant={activeUserChart === 'byRole' ? 'primary' : darkMode ? 'outline-light' : 'outline-secondary'}
                    onClick={() => setActiveUserChart('byRole')}
                  >
                    <PersonX className="me-1" /> Rôles
                  </Button>
                </ButtonGroup>
              </div>
              
              <div className="text-center mb-2">
                <h2 style={textStyle}>{stats.users.length}</h2>
                <small className={darkMode ? "text-light" : "text-muted"}>Total utilisateurs</small>
              </div>

              {activeUserChart === 'byStatus' && (
                <div style={{ height: '300px' }}>
                  <Pie data={byStatusData} options={chartOptions} />
                </div>
              )}

              {activeUserChart === 'byRole' && (
                <div style={{ height: '300px' }}>
                  <Pie data={byRoleData} options={chartOptions} />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Détails par classe */}
      {activeStudentChart === 'byClass' && (
        <Row className="mb-4">
          {classData.map((classe, index) => (
            <Col md={6} className="mb-3" key={index}>
              <Card className="shadow-sm" style={cardStyle}>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h5 className="mb-0" style={textStyle}>
                      {classe.niveau} {classe.parcours} - {classe.total} étudiants
                    </h5>
                  </div>
                  <div className="d-flex justify-content-around mb-3">
                    <div className="text-center">
                      <GenderMale size={24} className="text-primary" />
                      <div style={textStyle}>{classe.HOMME}</div>
                      <small className={darkMode ? "text-light" : "text-muted"}>Hommes</small>
                    </div>
                    <div className="text-center">
                      <GenderFemale size={24} className="text-danger" />
                      <div style={textStyle}>{classe.FEMME}</div>
                      <small className={darkMode ? "text-light" : "text-muted"}>Femmes</small>
                    </div>
                  </div>
                  <div style={{ height: '200px' }}>
                    <Pie 
                      data={{
                        labels: ['Hommes', 'Femmes'],
                        datasets: [{
                          data: [classe.HOMME, classe.FEMME],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 99, 132, 0.7)'
                          ],
                          borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)'
                          ],
                          borderWidth: 1
                        }]
                      }} 
                      options={{
                        ...chartOptions,
                        plugins: {
                          legend: {
                            display: false
                          }
                        }
                      }} 
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;