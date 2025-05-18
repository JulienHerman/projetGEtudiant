import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer les données locales
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirection vers la page de connexion
    navigate('/');
  }, [navigate]);

  return null; // Rien à afficher
}

export default Logout;
