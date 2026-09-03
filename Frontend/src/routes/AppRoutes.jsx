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
import MarketIntelligence from '../pages/marketIntelligence/MarketIntelligence';
import IndustryCurriculum from '../pages/curriculum/IndustryCurriculum';
import DynamicCurriculum from '../pages/curriculum/DynamicCurriculum';
import DemandForecasting from '../pages/demandForecasting/DemandForecasting';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/market-intelligence" element={<MarketIntelligence />} />
        <Route path="/industry-curriculum" element={<IndustryCurriculum />} />
        <Route path="/curriculum/industry" element={<IndustryCurriculum />} />
        <Route path="/dynamic-curriculum" element={<DynamicCurriculum />} />
        <Route path="/curriculum/dynamic" element={<DynamicCurriculum />} />
        <Route path="/demand-forecasting" element={<DemandForecasting />} />
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
          <Route path="/dashboard/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/dashboard/industry-curriculum" element={<IndustryCurriculum />} />
          <Route path="/dashboard/dynamic-curriculum" element={<DynamicCurriculum />} />
          <Route path="/dashboard/demand-forecasting" element={<DemandForecasting />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
