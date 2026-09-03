import { calculateKeywordMatchRatio } from '../utils/matching.js';
import resumeService from '../modules/resume/resume.service.js';

export const matchResumeAgainstJob = async (resumeData, jobSkills = []) => {
  return calculateKeywordMatchRatio(jobSkills, resumeData);
};

export default {
  matchResumeAgainstJob,
  ...resumeService,
};
