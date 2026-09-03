import axiosClient from './axiosClient';

/**
 * Fetch faculty upskilling programs with optional category, mode, and search filtering
 * @param {Object} filters - { category, mode, search }
 */
export const getTrainerProgramsApi = async (filters = {}) => {
  const response = await axiosClient.get('/trainer/programs', { params: filters });
  return response.data || response;
};

/**
 * Fetch program syllabus and details by ID
 * @param {string} programId
 */
export const getTrainerProgramByIdApi = async (programId) => {
  const response = await axiosClient.get(`/trainer/programs/${programId}`);
  return response.data || response;
};

/**
 * Enroll faculty/trainer in an industry development program
 * @param {string|Object} programData
 */
export const enrollTrainerInProgramApi = async (programData) => {
  const id = typeof programData === 'string' ? programData : programData.programId;
  const response = await axiosClient.post(`/trainer/programs/${id}/enroll`, programData);
  return response.data || response;
};

export const enrollTrainerProgramApi = enrollTrainerInProgramApi;

/**
 * Fetch faculty earned and available industry certifications
 */
export const getTrainerCertificationsApi = async () => {
  const response = await axiosClient.get('/trainer/certifications');
  return response.data || response;
};

const trainerDevApi = {
  getTrainerProgramsApi,
  getTrainerProgramByIdApi,
  enrollTrainerInProgramApi,
  enrollTrainerProgramApi,
  getTrainerCertificationsApi,
};

export default trainerDevApi;
