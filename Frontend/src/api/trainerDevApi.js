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
  const id = typeof programData === 'string' ? programData : programData?.programId || programData?.id;
  const payload = typeof programData === 'object' && programData !== null ? programData : { programId: id };
  const response = await axiosClient.post(`/trainer/programs/${id}/enroll`, payload);
  return response.data || response;
};

export const enrollTrainerProgramApi = enrollTrainerInProgramApi;

/**
 * Unenroll faculty/trainer from an industry development program
 * @param {string|Object} programData
 */
export const unenrollTrainerProgramApi = async (programData) => {
  const id = typeof programData === 'string' ? programData : programData?.programId || programData?.id;
  const payload = typeof programData === 'object' && programData !== null ? programData : { programId: id };
  const response = await axiosClient.post(`/trainer/programs/${id}/unenroll`, payload);
  return response.data || response;
};

/**
 * Fetch list of enrolled programs for the faculty
 */
export const getEnrolledProgramsApi = async () => {
  const response = await axiosClient.get('/trainer/enrolled');
  return response.data || response;
};

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
  unenrollTrainerProgramApi,
  getEnrolledProgramsApi,
  getTrainerCertificationsApi,
};

export default trainerDevApi;
