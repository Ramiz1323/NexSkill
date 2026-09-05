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
import DemandForecasting from '../pages/demandForecasting/DemandForecasting';
import DynamicCurriculum from '../pages/curriculum/DynamicCurriculum';
import IndustryCurriculum from '../pages/curriculum/IndustryCurriculum';
import EmployerDiscovery from '../pages/employerPanel/EmployerDiscovery';
import AiCareerGuidance from '../pages/careerGuidance/AiCareerGuidance';
import TrainerDevelopment from '../pages/trainerDevelopment/TrainerDevelopment';
import SkillAssessment from '../pages/assessment/SkillAssessment';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Route wrapped in MainLayout */}
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
          <Route path="/assessment" element={<SkillAssessment />} />
          <Route path="/resume-analyzer" element={<AtsResumeAnalyzer />} />
          <Route path="/credential-tracker" element={<CredentialTracker />} />
          <Route path="/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/demand-forecasting" element={<DemandForecasting />} />
          <Route path="/dynamic-curriculum" element={<DynamicCurriculum />} />
          <Route path="/industry-curriculum" element={<IndustryCurriculum />} />
          <Route path="/dashboard/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/dashboard/industry-curriculum" element={<IndustryCurriculum />} />
          <Route path="/dashboard/dynamic-curriculum" element={<DynamicCurriculum />} />
          <Route path="/dashboard/demand-forecasting" element={<DemandForecasting />} />
          <Route path="/employer-discovery" element={<EmployerDiscovery />} />
          <Route path="/career-guidance" element={<AiCareerGuidance />} />
          <Route path="/trainer-development" element={<TrainerDevelopment />} />
        </Route>
      </Route>
    </Routes>
  );
};


export default AppRoutes;
