import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken')); // Ensure proper check

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
