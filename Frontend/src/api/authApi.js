import axiosClient from './axiosClient';

export const loginApi = async (credentials) => {
  const response = await axiosClient.post('/auth/login', credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await axiosClient.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosClient.post('/auth/logout');
  return response.data;
};

const authApi = {
  loginApi,
  registerApi,
  getCurrentUserApi,
  logoutApi,
};

export default authApi;
