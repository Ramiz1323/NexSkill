import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (loading) {
    return <Loader message="Verifying session security..." />;
  }

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

