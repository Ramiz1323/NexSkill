import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import DashboardOverview from '../pages/dashboard/DashboardOverview';
import AtsResumeAnalyzer from '../pages/resumeAnalyzer/AtsResumeAnalyzer';
import CredentialTracker from '../pages/progressTracker/CredentialTracker';
import EmployerDiscovery from '../pages/employerPanel/EmployerDiscovery';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth Routes wrapped in AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes wrapped in ProtectedRoute & DashboardLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/resume-analyzer" element={<AtsResumeAnalyzer />} />
          <Route path="/credential-tracker" element={<CredentialTracker />} />
          <Route path="/employer-discovery" element={<EmployerDiscovery />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
