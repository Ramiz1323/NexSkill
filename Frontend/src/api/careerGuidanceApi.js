import axiosClient from './axiosClient';

export const getCareerTracksApi = async (params = {}) => {
  return await axiosClient.get('/career/tracks', { params });
};

export const getCareerPathwayByIdApi = async (id) => {
  return await axiosClient.get(`/career/tracks/${id}`);
};

export const generateCustomCareerPathApi = async (preferences) => {
  return await axiosClient.post('/career/generate-pathway', preferences);
};

const careerGuidanceApi = {
  getCareerTracksApi,
  getCareerPathwayByIdApi,
  generateCustomCareerPathApi,
};

export default careerGuidanceApi;
/**
 * Request tailored career recommendations based on skills, aspirations, and interests
 * @param {Object} profileData - { targetDomain, currentSkills, experienceLevel, interests }
 */
export const getCareerRecommendationsApi = async (profileData = {}) => {
  const response = await axiosClient.post('/career-guidance/recommendations', profileData);
  return response.data;
};

/**
 * Fetch detailed step-by-step milestone learning roadmap for a target role
 * @param {string} roleId
 */
export const getRoadmapForRoleApi = async (roleId) => {
  const response = await axiosClient.get(`/career-guidance/roadmap/${roleId}`);
  return response.data;
};

/**
 * Send inquiry or prompt to interactive AI career advisor
 * @param {string} prompt
 * @param {Object} context - Optional current user skills, chosen target role, etc.
 */
export const askCareerAdvisorApi = async (prompt, context = {}) => {
  const response = await axiosClient.post('/career-guidance/chat', { prompt, context });
  return response.data;
};
