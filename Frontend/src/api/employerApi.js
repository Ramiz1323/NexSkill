import axiosClient from './axiosClient';

/**
 * Search candidates with filtering and pagination
 * @param {Object} params - { search, skills, minScore, experienceLevel, page, limit }
 */
export const searchCandidatesApi = async (params = {}) => {
  const response = await axiosClient.get('/employer/candidates', { params });
  return response.data || response;
};

export const getCandidatesApi = searchCandidatesApi;

/**
 * Fetch detailed candidate profile by ID
 * @param {string} candidateId
 */
export const getCandidateByIdApi = async (candidateId) => {
  const response = await axiosClient.get(`/employer/candidates/${candidateId}`);
  return response.data || response;
};

/**
 * Update candidate recruitment status
 * @param {string} candidateId
 * @param {string} status - e.g., 'shortlisted', 'contacted', 'interview_scheduled'
 */
export const updateCandidateStatusApi = async (candidateId, status) => {
  const response = await axiosClient.patch(`/employer/candidates/${candidateId}/status`, { status });
  return response.data || response;
};

/**
 * Toggle candidate shortlist status
 * @param {string} candidateId
 */
export const shortlistCandidateApi = async (candidateId) => {
  const response = await axiosClient.post(`/employer/candidates/${candidateId}/shortlist`);
  return response.data || response;
};

export const getJobListingsApi = async (params = {}) => {
  const response = await axiosClient.get('/employer/jobs', { params });
  return response.data || response;
};

export const postJobRequirementApi = async (jobData) => {
  const response = await axiosClient.post('/employer/jobs', jobData);
  return response.data || response;
};

const employerApi = {
  searchCandidatesApi,
  getCandidatesApi,
  getCandidateByIdApi,
  updateCandidateStatusApi,
  shortlistCandidateApi,
  getJobListingsApi,
  postJobRequirementApi,
};

export default employerApi;
