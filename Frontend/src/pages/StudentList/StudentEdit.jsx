import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import { useTheme } from '../../hooks/ThemeContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PersonCheck } from 'react-bootstrap-icons';
import { fetchStudentById, updateStudent } from '../../api/studentsApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentEdit = () => {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    numero_inscription: '',
    niveau: '',
    parcours: '',
    mention: '',
    statut: 'PASSANT',
    sexe: 'HOMME'
  });

  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [availableParcours, setAvailableParcours] = useState([]);
  const [availableMentions, setAvailableMentions] = useState([]);

  const niveaux = ['L1', 'L2', 'L3', 'M1', 'M2'];
  const sexes = ['HOMME', 'FEMME'];
  const statuts = ['PASSANT', 'REDOUBLANT'];

  const allParcours = {
    'L1-L3': ['Génie Informatique', 'Génie Electronique Informatique', 'Batiment et travaux publique', 'Génie Biomedical', 'Génie Thermique'],
    'M1-M2': ['Génie Logiciel', 'Télécommunication et Réseau', 'Biomedical', 'Génie Electronique Informatique', 'Génie Thermique']
  };

  const allMentions = {
    'Génie Informatique': ['STNPA'],
    'Génie Electronique Informatique': ['STNPA'],
    'Batiment et travaux publique': ['BTP'],
    'Génie Biomedical': ['Biomedical'],
    'Génie Thermique': ['STNPA'],
    'Génie Logiciel': ['STNPA'],
    'Télécommunication et Réseau': ['STNPA']
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const toastId = toast.loading('Chargement des données étudiant...');
        const student = await fetchStudentById(id);
        
        setForm(student);
        toast.update(toastId, {
          render: 'Données étudiant chargées avec succès',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
      } catch (err) {
        console.error('Erreur chargement étudiant', err);
        toast.error('Échec du chargement des données étudiant');
        setError('Impossible de charger les données de l\'étudiant');
      } finally {
        setFetching(false);
      }
    };

    fetchStudent();
  }, [id]);

  useEffect(() => {
    if (form.niveau) {
      const isLicence = ['L1', 'L2', 'L3'].includes(form.niveau);
      setAvailableParcours(isLicence ? allParcours['L1-L3'] : allParcours['M1-M2']);
      
      if (form.parcours && !availableParcours.includes(form.parcours)) {
        setForm(prev => ({ ...prev, parcours: '', mention: '' }));
      }
    }
  }, [form.niveau]);

  useEffect(() => {
    if (form.parcours) {
      setAvailableMentions(allMentions[form.parcours] || []);
      
      if (form.mention && !availableMentions.includes(form.mention)) {
        setForm(prev => ({ ...prev, mention: '' }));
      }
    }
  }, [form.parcours]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.nom || !form.prenom || !form.numero_inscription) {
      setError('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    if (form.niveau && !form.parcours) {
      setError('Veuillez sélectionner un parcours pour le niveau choisi');
      return;
    }

    if (form.parcours && !form.mention) {
      setError('Veuillez sélectionner une mention pour le parcours choisi');
      return;
    }

    setError('');
    setSubmitting(true);
    console.log(form);
    try {
      const toastId = toast.loading('Mise à jour de l\'étudiant en cours...');
      const response = await updateStudent(id, form);
      console.log(response.status);
      if (response.status === 200) {
        toast.update(toastId, {
          render: 'Étudiant mis à jour avec succès',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
        navigate('/students');
      } else {
        toast.update(toastId, {
          render: 'Erreur lors de la mise à jour',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
        console.error('Mise à jour échouée:', response);
      }  
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour');
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Style dynamique selon le thème
  const cardStyle = {
    backgroundColor: darkMode ? '#2c3034' : '#fff',
    border: darkMode ? '1px solid #495057' : '1px solid #dee2e6'
  };

  const formControlStyle = darkMode ? { 
    backgroundColor: '#343a40', 
    color: 'white', 
    borderColor: '#6c757d' 
  } : {};

  const formLabelStyle = { color: darkMode ? 'white' : 'inherit' };

  if (fetching) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant={darkMode ? "light" : "primary"} />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
      
      <Card className="shadow-sm" style={cardStyle}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0" style={{ color: darkMode ? 'white' : 'inherit' }}>
              <PersonCheck className="me-2" /> Modifier l'étudiant
            </h3>
            <Button 
              variant={darkMode ? "outline-light" : "outline-secondary"} 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="me-1" /> Retour
            </Button>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nom">
                  <Form.Label style={formLabelStyle}>Nom *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Entrez le nom"
                    style={formControlStyle}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="prenom">
                  <Form.Label style={formLabelStyle}>Prénom *</Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    placeholder="Entrez le prénom"
                    style={formControlStyle}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="numero_inscription">
                  <Form.Label style={formLabelStyle}>Matricule *</Form.Label>
                  <Form.Control
                    type="text"
                    name="numero_inscription"
                    value={form.numero_inscription}
                    onChange={handleChange}
                    placeholder="Numéro d'inscription"
                    style={formControlStyle}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="sexe">
                  <Form.Label style={formLabelStyle}>Sexe *</Form.Label>
                  <Form.Select
                    name="sexe"
                    value={form.sexe}
                    onChange={handleChange}
                    style={formControlStyle}
                    required
                  >
                    {sexes.map(sexe => (
                      <option key={sexe} value={sexe}>
                        {sexe === 'HOMME' ? 'Homme' : 'Femme'}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="niveau">
                  <Form.Label style={formLabelStyle}>Niveau</Form.Label>
                  <Form.Select
                    name="niveau"
                    value={form.niveau}
                    onChange={handleChange}
                    style={formControlStyle}
                  >
                    <option value="">Sélectionnez un niveau</option>
                    {niveaux.map(niveau => (
                      <option key={niveau} value={niveau}>{niveau}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="parcours">
                  <Form.Label style={formLabelStyle}>Parcours</Form.Label>
                  <Form.Select
                    name="parcours"
                    value={form.parcours}
                    onChange={handleChange}
                    style={formControlStyle}
                    disabled={!form.niveau}
                  >
                    <option value="">{form.niveau ? 'Sélectionnez' : 'Choisissez d\'abord un niveau'}</option>
                    {availableParcours.map(parcours => (
                      <option key={parcours} value={parcours}>{parcours}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="mention">
                  <Form.Label style={formLabelStyle}>Mention</Form.Label>
                  <Form.Select
                    name="mention"
                    value={form.mention}
                    onChange={handleChange}
                    style={formControlStyle}
                    disabled={!form.parcours}
                  >
                    <option value="">{form.parcours ? 'Sélectionnez' : 'Choisissez d\'abord un parcours'}</option>
                    {availableMentions.map(mention => (
                      <option key={mention} value={mention}>{mention}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="statut">
                  <Form.Label style={formLabelStyle}>Statut *</Form.Label>
                  <Form.Select
                    name="statut"
                    value={form.statut}
                    onChange={handleChange}
                    style={formControlStyle}
                    required
                  >
                    {statuts.map(statut => (
                      <option key={statut} value={statut}>
                        {statut === 'PASSANT' ? 'Passant' : 'Redoublant'}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-3 mt-4">
              <Button 
                variant={darkMode ? "outline-light" : "outline-secondary"} 
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                Annuler
              </Button>
              <Button 
                variant={darkMode ? "light" : "primary"} 
                type="submit"
                disabled={submitting}
                className="d-flex align-items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Spinner as="span" size="sm" animation="border" role="status" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <PersonCheck /> Enregistrer
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentEdit;