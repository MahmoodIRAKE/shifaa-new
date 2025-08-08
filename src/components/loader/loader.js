import React from 'react';
import './Loader.css';

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <div className="spinner"></div>
        <p className="loader-text">جاري الإرسال...</p>
      </div>
    </div>
  );
};

export default Loader;
