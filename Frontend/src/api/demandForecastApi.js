import axiosClient from './axiosClient';

export const getSkillDemandForecast = async (params = {}) => {
  return await axiosClient.get('/demand-forecast/projections', { params });
};

export const getEmergingTechRoles = async (params = {}) => {
  return await axiosClient.get('/demand-forecast/emerging-roles', { params });
};

export const getAutomationImpactAnalysis = async (params = {}) => {
  return await axiosClient.get('/demand-forecast/automation-risk', { params });
};
