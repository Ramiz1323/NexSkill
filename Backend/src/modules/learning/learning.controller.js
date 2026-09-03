import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as learningService from './learning.service.js';

export const handleEnrollCourse = asyncHandler(async (req, res) => {
  const { studentId, courseId, roadmapId } = req.body;
  if (!studentId || !courseId) {
    throw new ApiError(400, 'Student ID and course ID are required');
  }

  const enrollment = await learningService.enrollCourse({
    studentId,
    courseId,
    roadmapId,
  });
  res.status(201).json(new ApiResponse(201, enrollment, 'Enrolled in course successfully'));
});

export const handleUpdateProgress = asyncHandler(async (req, res) => {
  const enrollment = await learningService.updateProgress(req.params.id, req.body);
  if (!enrollment) {
    throw new ApiError(404, 'Enrollment record not found');
  }
  res.status(200).json(new ApiResponse(200, enrollment, 'Course progress updated successfully'));
});

export const handleGetStudentLearningSummary = asyncHandler(async (req, res) => {
  const summary = await learningService.getStudentLearningSummary(req.params.studentId);
  res.status(200).json(new ApiResponse(200, summary, 'Learning summary retrieved successfully'));
});

export const handleListEnrollments = asyncHandler(async (req, res) => {
  const result = await learningService.listEnrollments(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Course enrollments retrieved successfully'));
});

export const handleGetEnrollmentById = asyncHandler(async (req, res) => {
  const enrollment = await learningService.getEnrollmentById(req.params.id);
  if (!enrollment) {
    throw new ApiError(404, 'Enrollment record not found');
  }
  res.status(200).json(new ApiResponse(200, enrollment, 'Enrollment retrieved successfully'));
});
