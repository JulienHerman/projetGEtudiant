import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image, Alert, Spinner } from 'react-bootstrap';
import { Person, Envelope, Lock, Calendar, CheckCircle, Pencil, XCircle, Check2 } from 'react-bootstrap-icons';
import { useUser } from '../../hooks/UserContext';
import UserAvatar from '../../components/Header/UserAvatar';
import { useTheme } from '../../hooks/ThemeContext';

const Profile = () => {
  const { user, setUser, loading } = useUser();
  const {darkMode} = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation simple
      if (formData.password && formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }

      // Mise à jour via le contexte
      setUser({
        ...user,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        updated_at: new Date().toISOString()
      });

      setEditMode(false);
      setSuccessMessage('Profil mis à jour avec succès !');
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className={`py-5 ${darkMode ? 'bg-dark text-white':'bg-white text-dark'}`}>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Mon Profil</h2>
                {!editMode ? (
                  <Button 
                    variant="outline-primary" 
                    onClick={() => {
                      setFormData({ ...user, password: '', confirmPassword: '' });
                      setEditMode(true);
                    }}
                    className="d-flex align-items-center gap-2"
                  >
                    <Pencil /> Modifier
                  </Button>
                ) : (
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-danger" 
                      onClick={() => {
                        setEditMode(false);
                        setErrorMessage('');
                      }}
                      className="d-flex align-items-center gap-2"
                    >
                      <XCircle /> Annuler
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={handleSubmit}
                      className="d-flex align-items-center gap-2"
                    >
                      <Check2 /> Enregistrer
                    </Button>
                  </div>
                )}
              </div>

              {successMessage && (
                <Alert variant="success" className="mb-4">
                  {successMessage}
                </Alert>
              )}

              {errorMessage && (
                <Alert variant="danger" className="mb-4">
                  {errorMessage}
                </Alert>
              )}

              <Row className="g-4">
                <Col md={4} className="text-center">
                  <div className="mb-3 position-relative">
                    <UserAvatar user={user} size={120} className="mx-auto" />
                    {editMode && (
                      <Button 
                        variant="light" 
                        size="sm" 
                        className="position-absolute bottom-0 end-0 rounded-circle shadow-sm"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <Pencil size={14} />
                      </Button>
                    )}
                  </div>
                  <h4 className="mb-1">{user.name} {user.surname}</h4>
                  <div className="d-flex align-items-center justify-content-center gap-1 text-muted mb-2">
                    <CheckCircle className="text-success" />
                    <small>Compte {user.status.toLowerCase()}</small>
                  </div>
                  <div className="text-muted">
                    <small className="d-flex align-items-center justify-content-center gap-1">
                      <Calendar size={12} />
                      Membre depuis {formatDate(user.created_at)}
                    </small>
                  </div>
                </Col>

                <Col md={8}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center gap-2 text-muted">
                        <Person /> Nom
                      </Form.Label>
                      {editMode ? (
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <div className="p-2 bg-light rounded">{user.name}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center gap-2 text-muted">
                        <Person /> Prénom
                      </Form.Label>
                      {editMode ? (
                        <Form.Control
                          type="text"
                          name="surname"
                          value={formData.surname}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <div className="p-2 bg-light rounded">{user.surname}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center gap-2 text-muted">
                        <Envelope /> Email
                      </Form.Label>
                      {editMode ? (
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <div className="p-2 bg-light rounded">{user.email}</div>
                      )}
                    </Form.Group>

                    {editMode && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label className="d-flex align-items-center gap-2 text-muted">
                            <Lock /> Nouveau mot de passe
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Laisser vide pour ne pas changer"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="d-flex align-items-center gap-2 text-muted">
                            <Lock /> Confirmer le mot de passe
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmer le nouveau mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </>
                    )}
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 mt-4">
            <Card.Body className="p-4">
              <h5 className="mb-4">Statistiques du compte</h5>
              <Row className="g-3 text-center">
                <Col xs={6} md={3}>
                  <div className="p-3 bg-light rounded">
                    <div className="h4 mb-1 text-primary">{user.role}</div>
                    <small className="text-muted">Rôle</small>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="p-3 bg-light rounded">
                    <div className="h4 mb-1 text-success">
                      {user.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                    </div>
                    <small className="text-muted">Statut</small>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="p-3 bg-light rounded">
                    <div className="h4 mb-1">{formatDate(user.created_at)}</div>
                    <small className="text-muted">Date de création</small>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="p-3 bg-light rounded">
                    <div className="h4 mb-1">{formatDate(user.updated_at)}</div>
                    <small className="text-muted">Dernière mise à jour</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
