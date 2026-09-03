import axiosClient from './axiosClient';

export const getIndustryCurriculums = async (query = {}) => {
  return await axiosClient.get('/curriculum/industry', { params: query });
};

export const getCurriculumById = async (id) => {
  return await axiosClient.get(`/curriculum/industry/${id}`);
};

export const getStudentSkillGap = async (studentId, targetRole) => {
  return await axiosClient.get('/curriculum/skill-gap', {
    params: { studentId, targetRole },
  });
};

export const getDynamicLearningPath = async (params = {}) => {
  return await axiosClient.get('/curriculum/adaptive-path', { params });
};

export const submitCurriculumFeedback = async (payload) => {
  return await axiosClient.post('/curriculum/feedback', payload);
};
