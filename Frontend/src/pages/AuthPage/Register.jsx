import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useTheme } from '../../hooks/ThemeContext';
import { userRegistration } from '../../api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const toastId = toast.loading("Création du compte...");
      const { firstname, lastname, email, password, role } = form;

      const response = await userRegistration({
        name: firstname,
        surname:lastname,
        email,
        password,
        role,
        status: 'ACTIVE',
      });

      if (response.status === 201) {
        toast.update(toastId, {
          render: 'Inscription réussie!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        navigate('/dashboard');
      } else {
        const resData = await response.data;
        toast.update(toastId, {
          render: resData.message || "Erreur lors de l'inscription.",
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error('Erreur de connexion au serveur.');
    }
  };

  const bgColor = darkMode ? '#1e1e1e' : '#f8f9fa';
  const cardBg = darkMode ? '#2c2c2c' : 'white';
  const textColor = darkMode ? 'text-light' : 'text-dark';
  const inputClass = darkMode ? 'bg-dark text-light border-secondary' : '';

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: bgColor }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme={darkMode ? 'dark' : 'light'}
      />

      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={5}>
          <Card className={`shadow-sm ${textColor}`} style={{ backgroundColor: cardBg }}>
            <Card.Body>
              <h3 className="text-center mb-4">Créer un compte</h3>

              <Form onSubmit={handleRegister}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Prénom</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Nom</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Rôle</Form.Label>
                  <Form.Select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="USER">Utilisateur</option>
                    <option value="ADMIN">Administrateur</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPwd ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                    <Button
                      variant={darkMode ? 'outline-light' : 'outline-secondary'}
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      {showPwd ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPwd ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                    <Button
                      variant={darkMode ? 'outline-light' : 'outline-secondary'}
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                    >
                      {showConfirmPwd ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  S'inscrire
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
