import axiosClient from './axiosClient';

export const getSkillDemandForecast = async (params = {}) => {
  const response = await axiosClient.get('/demand-forecast/projections', { params });
  return response?.data ?? response;
};

export const getEmergingTechRoles = async (params = {}) => {
  const response = await axiosClient.get('/demand-forecast/emerging-roles', { params });
  return response?.data ?? response;
};

export const getAutomationImpactAnalysis = async (params = {}) => {
  const response = await axiosClient.get('/demand-forecast/automation-risk', { params });
  return response?.data ?? response;
};
