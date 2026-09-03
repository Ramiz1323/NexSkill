import axiosClient from './axiosClient';

export const getMarketDemandTrends = async (params = {}) => {
  return await axiosClient.get('/market-intelligence/demand', { params });
};

export const getIndustrySkillDistribution = async (params = {}) => {
  return await axiosClient.get('/market-intelligence/skills', { params });
};

export const getLabourMarketSummary = async (params = {}) => {
  return await axiosClient.get('/market-intelligence/summary', { params });
};
