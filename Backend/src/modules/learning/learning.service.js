import LearningEnrollment from './learning.model.js';
import Course from '../courses/courses.model.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Enroll student in a course
 */
export const enrollCourse = async ({ studentId, courseId, roadmapId }) => {
  // Check if already enrolled
  let enrollment = await LearningEnrollment.findOne({
    studentId,
    course: courseId,
  });

  if (enrollment) {
    return enrollment.populate('course');
  }

  enrollment = await LearningEnrollment.create({
    studentId,
    course: courseId,
    roadmap: roadmapId || null,
    status: 'Enrolled',
    progressPercentage: 0,
  });

  // Increment course enrolled count
  await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

  return enrollment.populate('course');
};

/**
 * Update course progress and log quiz/activity
 */
export const updateProgress = async (enrollmentId, updateData) => {
  const { progressPercentage, completedModule, additionalHours, quizScore } = updateData;

  const enrollment = await LearningEnrollment.findById(enrollmentId);
  if (!enrollment) return null;

  if (progressPercentage !== undefined) {
    enrollment.progressPercentage = Math.min(100, Math.max(0, Number(progressPercentage)));
  }

  if (completedModule && !enrollment.completedModules.includes(completedModule)) {
    enrollment.completedModules.push(completedModule);
  }

  if (additionalHours) {
    enrollment.timeSpentHours += Number(additionalHours);
  }

  if (quizScore) {
    enrollment.quizScores.push(quizScore);
  }

  // Update status based on progress %
  if (enrollment.progressPercentage >= 100) {
    enrollment.status = 'Completed';
    enrollment.completionDate = new Date();
  } else if (enrollment.progressPercentage > 0) {
    enrollment.status = 'In Progress';
  }

  await enrollment.save();
  return enrollment.populate('course');
};

/**
 * Get comprehensive learning analytics summary for a student
 */
export const getStudentLearningSummary = async (studentId) => {
  const enrollments = await LearningEnrollment.find({ studentId }).populate('course');

  const totalEnrolled = enrollments.length;
  const completedCourses = enrollments.filter((e) => e.status === 'Completed').length;
  const inProgressCourses = enrollments.filter((e) => e.status === 'In Progress').length;
  const totalHoursSpent = enrollments.reduce((sum, e) => sum + (e.timeSpentHours || 0), 0);

  const averageProgress = totalEnrolled > 0
    ? Math.round(
        enrollments.reduce((sum, e) => sum + (e.progressPercentage || 0), 0) / totalEnrolled
      )
    : 0;

  return {
    totalEnrolled,
    completedCourses,
    inProgressCourses,
    totalHoursSpent,
    averageProgress,
    enrollments,
  };
};

/**
 * List enrollments with filters and pagination
 */
export const listEnrollments = async (query = {}) => {
  const { studentId, status, courseId } = query;
  const filter = {};

  if (studentId) filter.studentId = studentId;
  if (status) filter.status = status;
  if (courseId) filter.course = courseId;

  const { page, limit, skip } = getPagination(query);

  const [enrollments, total] = await Promise.all([
    LearningEnrollment.find(filter)
      .populate('course')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit),
    LearningEnrollment.countDocuments(filter),
  ]);

  return formatPaginatedResponse(enrollments, total, page, limit);
};

/**
 * Retrieve enrollment by ID
 */
export const getEnrollmentById = async (enrollmentId) => {
  const enrollment = await LearningEnrollment.findById(enrollmentId).populate('course');
  return enrollment;
};
