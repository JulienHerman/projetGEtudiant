import React from 'react';
import { useUser } from '../hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Spinners/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;