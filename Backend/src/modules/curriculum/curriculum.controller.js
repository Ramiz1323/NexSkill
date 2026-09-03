import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as curriculumService from './curriculum.service.js';

export const handleCreateCurriculum = asyncHandler(async (req, res) => {
  const { title, domain, targetRole } = req.body;
  if (!title || !domain || !targetRole) {
    throw new ApiError(400, 'Title, domain, and targetRole are required');
  }

  const curriculum = await curriculumService.createCurriculum(req.body);
  res.status(201).json(new ApiResponse(201, curriculum, 'Curriculum created successfully'));
});

export const handleGetCurriculumById = asyncHandler(async (req, res) => {
  const curriculum = await curriculumService.getCurriculumById(req.params.id);
  if (!curriculum) {
    throw new ApiError(404, 'Curriculum not found');
  }
  res.status(200).json(new ApiResponse(200, curriculum, 'Curriculum retrieved successfully'));
});

export const handleUpdateCurriculum = asyncHandler(async (req, res) => {
  const curriculum = await curriculumService.updateCurriculum(req.params.id, req.body);
  if (!curriculum) {
    throw new ApiError(404, 'Curriculum not found');
  }
  res.status(200).json(new ApiResponse(200, curriculum, 'Curriculum updated successfully'));
});

export const handleDeleteCurriculum = asyncHandler(async (req, res) => {
  const curriculum = await curriculumService.deleteCurriculum(req.params.id);
  if (!curriculum) {
    throw new ApiError(404, 'Curriculum not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Curriculum deleted successfully'));
});

export const handleListCurricula = asyncHandler(async (req, res) => {
  const result = await curriculumService.listCurricula(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Curricula retrieved successfully'));
});
