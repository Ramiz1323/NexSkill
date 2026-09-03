import axiosClient from './axiosClient';

export const getCandidatesApi = async (params = {}) => {
  return await axiosClient.get('/employer/candidates', { params });
};

export const getJobListingsApi = async (params = {}) => {
  return await axiosClient.get('/employer/jobs', { params });
};

export const postJobRequirementApi = async (jobData) => {
  return await axiosClient.post('/employer/jobs', jobData);
};

const employerApi = {
  getCandidatesApi,
  getJobListingsApi,
  postJobRequirementApi,
};

export default employerApi;
