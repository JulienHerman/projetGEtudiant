import React, { useState, useEffect } from 'react';
import {
  Table,
  Form,
  InputGroup,
  Button,
  Pagination,
  Badge,
  Spinner,
  Dropdown,
  Modal
} from 'react-bootstrap';
import {
  Search,
  Plus,
  Pencil,
  Trash,
  ThreeDotsVertical
} from 'react-bootstrap-icons';
import { useTheme } from '../../hooks/ThemeContext';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../../api/studentsApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
  const { darkMode } = useTheme();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const studentsPerPage = 5;

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const studentsData = await fetchStudents();
      setStudents(studentsData);
    } catch (error) {
      toast.error('Erreur lors du chargement des étudiants');
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les étudiants
  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.nom.toLowerCase().includes(searchLower) ||
      student.prenom.toLowerCase().includes(searchLower) ||
      student.numero_inscription.toLowerCase().includes(searchLower) ||
      student.niveau.toLowerCase().includes(searchLower) ||
      student.parcours.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Extraire l'année de la date
  const getYear = (dateString) => new Date(dateString).getFullYear();

  // Gestion de la suppression
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    
    try {
      setDeleting(true);
      const toastId = toast.loading('Suppression en cours...');
      await deleteStudent(studentToDelete.id);
      
      toast.update(toastId, {
        render: 'Étudiant supprimé avec succès',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
      
      // Rafraîchir la liste
      await loadStudents();
      // Reset la pagination si nécessaire
      if (currentStudents.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      toast.error('Échec de la suppression de l\'étudiant');
      console.error('Error deleting student:', error);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  // Style dynamique selon le thème
  const tableVariant = darkMode ? 'dark' : 'light';
  const searchButtonVariant = darkMode ? 'outline-light' : 'primary';
  const addButtonVariant = darkMode ? 'light' : 'primary';
  const dropdownVariant = darkMode ? 'dark' : 'light';
  const modalVariant = darkMode ? 'dark' : 'light';

  return (
    <div className={`p-3 ${darkMode ? 'bg-dark text-white' : ''}`}>
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

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Liste des étudiants</h3>
        <Link
          to="/students/add"
          className={`btn ${addButtonVariant} d-flex align-items-center gap-2 ${darkMode ? 'text-white' : ''}`}
        >
          <Plus /> Ajouter un étudiant
        </Link>
      </div>

      <Form className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Rechercher par nom, prénom, matricule, niveau ou parcours"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={darkMode ? 'bg-dark text-white border-secondary' : ''}
          />
          <Button variant={searchButtonVariant}>
            <Search />
          </Button>
        </InputGroup>
      </Form>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant={darkMode ? "light" : "primary"} />
          <p className="mt-2">Chargement des étudiants...</p>
        </div>
      ) : (
        <>
          <Table striped bordered hover variant={tableVariant} responsive>
            <thead>
              <tr>
                <th>Matricule</th>
                <th>Nom & Prénom</th>
                <th>Niveau</th>
                <th>Parcours</th>
                <th>Sexe</th>
                <th>Année</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.numero_inscription}</td>
                    <td>{student.nom} {student.prenom}</td>
                    <td>{student.niveau}</td>
                    <td>{student.parcours}</td>
                    <td>{student.sexe === 'HOMME' ? 'Homme' : 'Femme'}</td>
                    <td>{getYear(student.created_at)}</td>
                    <td>
                      <Badge bg={student.statut === 'ACTIVE' ? 'success' : 'secondary'}>
                        {student.statut === 'ACTIVE' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant={dropdownVariant} size="sm" id="dropdown-actions">
                          <ThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant={dropdownVariant}>
                          <Dropdown.Item 
                            className="d-flex align-items-center gap-2" 
                            as={Link} 
                            to={`/students/edit/${student.id}`}
                          >
                            <Pencil size={14} /> Modifier
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item 
                            className="d-flex align-items-center gap-2 text-danger"
                            onClick={() => handleDeleteClick(student)}
                          >
                            <Trash size={14} /> Supprimer
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Aucun étudiant trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="justify-content-center">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />

              {[...Array(totalPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={currentPage === idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          )}
        </>
      )}

      {/* Modal de confirmation de suppression */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} variant={modalVariant}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer l'étudiant {studentToDelete?.nom} {studentToDelete?.prenom}?
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant={darkMode ? "outline-light" : "outline-secondary"} 
            onClick={() => setShowDeleteModal(false)}
            disabled={deleting}
          >
            Annuler
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
            disabled={deleting}
          >
            {deleting ? (
              <Spinner as="span" size="sm" animation="border" role="status" />
            ) : (
              'Supprimer'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentList;
