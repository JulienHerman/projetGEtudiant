import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const UserAdd = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation simple
    if (!form.nom || !form.email || !form.role || !form.password || !form.confirmPassword) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setError('');
    // Enlever confirmPassword avant d’envoyer
    const { confirmPassword, ...userData } = form;
    onAdd(userData);
  };

  return (
    <Container className="py-4">
      <h3>Ajouter un nouvel utilisateur</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="nom">
              <Form.Label>Nom complet *</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Entrez le nom complet"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Entrez l'email"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="role">
              <Form.Label>Rôle *</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="">-- Sélectionnez un rôle --</option>
                <option value="admin">Administrateur</option>
                <option value="user">Utilisateur</option>
                <option value="manager">Manager</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label>Mot de passe *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Entrez le mot de passe"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirmer mot de passe *</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmez le mot de passe"
              />
            </Form.Group>
          </Col>
        </Row>

        <div>
          <Button variant="secondary" className="me-2" onClick={onCancel}>
            Annuler
          </Button>
          <Button variant="success" type="submit">
            Ajouter
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UserAdd;
