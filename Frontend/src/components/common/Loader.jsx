import React from 'react';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="loader-container p-4 text-center">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
