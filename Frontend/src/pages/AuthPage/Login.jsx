import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Spinner
} from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useTheme } from '../../hooks/ThemeContext';
import { useUser } from '../../hooks/UserContext';
import { userLogin } from '../../api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { darkMode } = useTheme();
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const toastId = toast.loading('Connexion en cours...');
      const response = await userLogin({ email, password });
      
      if (response.status === 200) {
        const { access_token, user } = response.data;

        login(user,access_token);

        toast.update(toastId, {
          render: 'Connexion réussie!',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });

        // Rediriger vers la page d'accueil
        navigate('/dashboard');
      } else {
        toast.update(toastId, {
          render: 'Email ou mot de passe incorrect',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (err) {
      toast.error('Erreur de connexion au serveur');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const bgColor = darkMode ? '#1e1e1e' : '#f8f9fa';
  const cardBg = darkMode ? '#2c2c2c' : 'white';
  const textColor = darkMode ? 'text-light' : 'text-dark';

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: bgColor }}
    >
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

      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card
            className={`shadow-sm ${textColor}`}
            style={{ backgroundColor: cardBg }}
          >
            <Card.Body>
              <h3 className="text-center mb-4">Connexion</h3>

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ex: etudiant@isstm.mg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPwd ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                    />
                    <Button
                      variant={darkMode ? 'outline-light' : 'outline-secondary'}
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      {showPwd ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner as="span" size="sm" animation="border" role="status" />
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;