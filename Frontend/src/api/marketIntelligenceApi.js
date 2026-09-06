import axiosClient from './axiosClient';

export const getMarketDemandTrends = async (params = {}) => {
  const response = await axiosClient.get('/market-intelligence/demand', { params });
  return response?.data ?? response;
};

export const getIndustrySkillDistribution = async (params = {}) => {
  const response = await axiosClient.get('/market-intelligence/skills', { params });
  return response?.data ?? response;
};

export const getLabourMarketSummary = async (params = {}) => {
  const response = await axiosClient.get('/market-intelligence/summary', { params });
  return response?.data ?? response;
};
