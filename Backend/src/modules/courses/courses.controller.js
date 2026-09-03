import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as courseService from './courses.service.js';

export const handleCreateCourse = asyncHandler(async (req, res) => {
  const { title, description, provider } = req.body;
  if (!title || !description || !provider) {
    throw new ApiError(400, 'Title, description, and provider are required');
  }

  const course = await courseService.createCourse(req.body);
  res.status(201).json(new ApiResponse(201, course, 'Course created successfully'));
});

export const handleGetCourseById = asyncHandler(async (req, res) => {
  const course = await courseService.getCourseById(req.params.id);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  res.status(200).json(new ApiResponse(200, course, 'Course retrieved successfully'));
});

export const handleUpdateCourse = asyncHandler(async (req, res) => {
  const course = await courseService.updateCourse(req.params.id, req.body);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  res.status(200).json(new ApiResponse(200, course, 'Course updated successfully'));
});

export const handleDeleteCourse = asyncHandler(async (req, res) => {
  const course = await courseService.deleteCourse(req.params.id);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Course deleted successfully'));
});

export const handleListCourses = asyncHandler(async (req, res) => {
  const result = await courseService.listCourses(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Courses retrieved successfully'));
});

export const handleGetCoursesBySkills = asyncHandler(async (req, res) => {
  const { skills, limit } = req.query;
  if (!skills) {
    throw new ApiError(400, 'Skills query parameter is required');
  }
  const courses = await courseService.getCoursesBySkills(skills, limit);
  res.status(200).json(new ApiResponse(200, courses, 'Matched skill courses retrieved successfully'));
});
