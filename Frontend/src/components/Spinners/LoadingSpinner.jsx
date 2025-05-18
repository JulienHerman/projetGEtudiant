import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="d-flex justify-content-center">
        <div className="loading-spinner" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;