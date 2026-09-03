import Course from '../models/Course.js';
import Feedback from '../models/Feedback.js';
import ApiError from '../utils/ApiError.js';
import { calculateSkillGap, generateAdaptiveLearningPath } from '../modules/skillGaps/skillGap.service.js';

export const getIndustryCurriculums = async (query = {}) => {
  const filter = { isActive: true };
  if (query.role && query.role !== 'All') {
    filter.targetRole = { $regex: query.role, $options: 'i' };
  }
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  const courses = await Course.find(filter).sort({ alignmentScore: -1 });
  return courses;
};

export const getCurriculumById = async (id) => {
  const course = await Course.findById(id);
  if (!course) {
    throw new ApiError(404, `Curriculum track not found with id: ${id}`);
  }
  return course;
};

export const submitCurriculumFeedback = async (data) => {
  const feedback = await Feedback.create(data);
  return feedback;
};

export default {
  getIndustryCurriculums,
  getCurriculumById,
  submitCurriculumFeedback,
  calculateSkillGap,
  generateAdaptiveLearningPath,
};
