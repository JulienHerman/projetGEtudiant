import React from 'react';
import { Navbar, Container, Nav, Dropdown, Image, Button } from 'react-bootstrap';
import { Sun, Moon, Person, BoxArrowRight, ChevronDown, PersonFill } from 'react-bootstrap-icons';
import { useUser } from '../../hooks/UserContext';
import UserAvatar from './UserAvatar';
import isstm_logo from '../../assets/isstm_logo.png';
import { useTheme } from '../../hooks/ThemeContext';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useUser();

  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      expand="lg"
      className="shadow-sm px-3 py-2"
    >
      <Container fluid className="d-flex align-items-center justify-content-between">

        {/* Logo et Titre */}
        <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
          <Image src={isstm_logo} alt="Logo" height="30" />
          <span className="fw-bold">Gestion Étudiant</span>
        </Navbar.Brand>

        {/* Actions à droite */}
        <Nav className="d-flex align-items-center gap-3">

          {/* Mode Sombre/Clair */}
          <Button
            variant="link"
            onClick={toggleTheme}
            title="Changer de thème"
            className="p-0 border-0"
            style={{
              color: darkMode ? 'white' : 'black',
              fontSize: '1.2rem',
            }}
          >
            {darkMode ? <Sun /> : <Moon />}
          </Button>


          {/* Dropdown Utilisateur */}
          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              id="dropdown-user"
              className="d-flex align-items-center gap-2 px-2 py-1 rounded border"
              style={{
                cursor: 'pointer',
                backgroundColor: darkMode ? '#343a40' : '#f8f9fa',
                height: '38px',
              }}
            >
              <UserAvatar user={user} size={28} />
              <ChevronDown size={14} />
            </Dropdown.Toggle>

            <Dropdown.Menu variant={`${darkMode ? 'dark' : 'light'}`} className={`mt-2 shadow`}>
              <Dropdown.Item href="/profile">
                <Person className={`me-2`} /> Profil
              </Dropdown.Item>
              <Dropdown.Item href="/register">
                <PersonFill className="me-2" /> S'inscrire
                </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/logout">
                <BoxArrowRight className={`me-2`} />Déconnexion
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
