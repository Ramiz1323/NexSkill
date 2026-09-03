import axiosClient from './axiosClient';

export const fetchProgressApi = async () => {
  const response = await axiosClient.get('/progress');
  return response.data;
};

export const addCredentialApi = async (credentialData) => {
  const response = await axiosClient.post('/progress/credentials', credentialData);
  return response.data;
};

const progressTrackerApi = {
  fetchProgressApi,
  addCredentialApi,
};

export default progressTrackerApi;
