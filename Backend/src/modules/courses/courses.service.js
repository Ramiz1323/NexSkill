import Course from './courses.model.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Create a new course
 */
export const createCourse = async (courseData) => {
  const course = await Course.create(courseData);
  return course;
};

/**
 * Retrieve course by ID
 */
export const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId);
  return course;
};

/**
 * Update course details
 */
export const updateCourse = async (courseId, updateData) => {
  const course = await Course.findByIdAndUpdate(
    courseId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return course;
};

/**
 * Delete course
 */
export const deleteCourse = async (courseId) => {
  const course = await Course.findByIdAndDelete(courseId);
  return course;
};

/**
 * List courses with filtering and pagination
 */
export const listCourses = async (query = {}) => {
  const { search, skills, difficulty, provider, tag } = query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (difficulty) {
    filter.difficulty = difficulty;
  }
  if (provider) {
    filter.provider = { $regex: provider, $options: 'i' };
  }
  if (tag) {
    filter.tags = tag;
  }
  if (skills) {
    const skillList = Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim());
    filter.skillsTaught = { $in: skillList };
  }

  const { page, limit, skip } = getPagination(query);

  const [courses, total] = await Promise.all([
    Course.find(filter).sort({ rating: -1, enrolledCount: -1 }).skip(skip).limit(limit),
    Course.countDocuments(filter),
  ]);

  return formatPaginatedResponse(courses, total, page, limit);
};

/**
 * Find courses that teach specific required skills (for skill gap bridge)
 */
export const getCoursesBySkills = async (skills = [], limit = 10) => {
  const skillList = Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim());
  const courses = await Course.find({
    skillsTaught: { $in: skillList },
  })
    .sort({ rating: -1 })
    .limit(Number(limit));

  return courses;
};
