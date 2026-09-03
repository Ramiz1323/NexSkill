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
