import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as roadmapService from './roadmap.service.js';

export const handleGenerateRoadmap = asyncHandler(async (req, res) => {
  const { studentId, targetRole } = req.body;
  if (!studentId || !targetRole) {
    throw new ApiError(400, 'Student ID and target role are required to generate roadmap');
  }

  const roadmap = await roadmapService.generatePersonalizedRoadmap(req.body);
  res.status(201).json(new ApiResponse(201, roadmap, 'Personalized roadmap generated successfully'));
});

export const handleGetRoadmapById = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.getRoadmapById(req.params.id);
  if (!roadmap) {
    throw new ApiError(404, 'Roadmap not found');
  }
  res.status(200).json(new ApiResponse(200, roadmap, 'Roadmap retrieved successfully'));
});

export const handleGetStudentRoadmaps = asyncHandler(async (req, res) => {
  const roadmaps = await roadmapService.getRoadmapsByStudent(req.params.studentId);
  res.status(200).json(new ApiResponse(200, roadmaps, 'Student roadmaps retrieved successfully'));
});

export const handleUpdateMilestone = asyncHandler(async (req, res) => {
  const { isCompleted } = req.body;
  if (isCompleted === undefined) {
    throw new ApiError(400, 'isCompleted boolean flag is required');
  }

  const roadmap = await roadmapService.updateMilestoneStatus(
    req.params.id,
    req.params.weekNumber,
    isCompleted
  );
  if (!roadmap) {
    throw new ApiError(404, 'Roadmap or milestone not found');
  }
  res.status(200).json(new ApiResponse(200, roadmap, 'Milestone status updated successfully'));
});

export const handleDeleteRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.deleteRoadmap(req.params.id);
  if (!roadmap) {
    throw new ApiError(404, 'Roadmap not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Roadmap deleted successfully'));
});
