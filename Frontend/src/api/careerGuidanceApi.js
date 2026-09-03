import axiosClient from './axiosClient';

/**
 * Request tailored career recommendations based on skills, aspirations, and interests
 * @param {Object} profileData - { targetDomain, currentSkills, experienceLevel, interests }
 */
export const getCareerRecommendationsApi = async (profileData = {}) => {
  const response = await axiosClient.post('/career-guidance/recommendations', profileData);
  return response.data || response;
};

export const getCareerTracksApi = async (params = {}) => {
  const response = await axiosClient.get('/career/tracks', { params });
  return response.data || response;
};

export const getCareerPathwayByIdApi = async (id) => {
  const response = await axiosClient.get(`/career/tracks/${id}`);
  return response.data || response;
};

export const generateCustomCareerPathApi = async (preferences) => {
  const response = await axiosClient.post('/career/generate-pathway', preferences);
  return response.data || response;
};

/**
 * Fetch detailed step-by-step milestone learning roadmap for a target role
 * @param {string} roleId
 */
export const getRoadmapForRoleApi = async (roleId) => {
  const response = await axiosClient.get(`/career-guidance/roadmap/${roleId}`);
  return response.data || response;
};

/**
 * Send inquiry or prompt to interactive AI career advisor
 * @param {string} prompt
 * @param {Object} context - Optional current user skills, chosen target role, etc.
 */
export const askCareerAdvisorApi = async (prompt, context = {}) => {
  const response = await axiosClient.post('/career-guidance/chat', { prompt, context });
  return response.data || response;
};

const careerGuidanceApi = {
  getCareerRecommendationsApi,
  getCareerTracksApi,
  getCareerPathwayByIdApi,
  generateCustomCareerPathApi,
  getRoadmapForRoleApi,
  askCareerAdvisorApi,
};

export default careerGuidanceApi;
