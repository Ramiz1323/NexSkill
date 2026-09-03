import axiosClient from './axiosClient';

export const getTrainerProgramsApi = async (params = {}) => {
  return await axiosClient.get('/trainer/programs', { params });
};

export const getTrainerProgramByIdApi = async (id) => {
  return await axiosClient.get(`/trainer/programs/${id}`);
};

export const enrollTrainerInProgramApi = async (enrollmentData) => {
  return await axiosClient.post('/trainer/enroll', enrollmentData);
};

const trainerDevApi = {
  getTrainerProgramsApi,
  getTrainerProgramByIdApi,
  enrollTrainerInProgramApi,
};

export default trainerDevApi;
