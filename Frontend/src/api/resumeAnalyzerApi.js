import axiosClient from './axiosClient';

export const analyzeResumeApi = async (formData) => {
  const response = await axiosClient.post('/resume/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const resumeAnalyzerApi = {
  analyzeResumeApi,
};

export default resumeAnalyzerApi;
