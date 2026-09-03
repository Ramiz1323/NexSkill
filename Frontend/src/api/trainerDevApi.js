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
/**
 * Fetch faculty upskilling programs with optional category, mode, and search filtering
 * @param {Object} filters - { category, mode, search }
 */
export const getTrainerProgramsApi = async (filters = {}) => {
  const response = await axiosClient.get('/trainer/programs', { params: filters });
  return response.data;
};

/**
 * Fetch program syllabus and details by ID
 * @param {string} programId
 */
export const getTrainerProgramByIdApi = async (programId) => {
  const response = await axiosClient.get(`/trainer/programs/${programId}`);
  return response.data;
};

/**
 * Enroll faculty/trainer in an industry development program
 * @param {string} programId
 */
export const enrollTrainerProgramApi = async (programId) => {
  const response = await axiosClient.post(`/trainer/programs/${programId}/enroll`);
  return response.data;
};

/**
 * Fetch faculty earned and available industry certifications
 */
export const getTrainerCertificationsApi = async () => {
  const response = await axiosClient.get('/trainer/certifications');
  return response.data;
};
