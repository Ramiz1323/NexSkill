import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as placementService from './placement.service.js';

export const handleRecordPlacement = asyncHandler(async (req, res) => {
  const { studentName, studentEmail, job, employer, packageOffered, academicYear, department } =
    req.body;

  if (
    !studentName ||
    !studentEmail ||
    !job ||
    !employer ||
    !packageOffered ||
    !academicYear ||
    !department
  ) {
    throw new ApiError(
      400,
      'Student name, email, job, employer, packageOffered, academicYear, and department are required'
    );
  }

  const placement = await placementService.recordPlacement(req.body);
  res.status(201).json(new ApiResponse(201, placement, 'Placement recorded successfully'));
});

export const handleGetPlacementById = asyncHandler(async (req, res) => {
  const placement = await placementService.getPlacementById(req.params.id);
  if (!placement) {
    throw new ApiError(404, 'Placement record not found');
  }
  res.status(200).json(new ApiResponse(200, placement, 'Placement retrieved successfully'));
});

export const handleListPlacements = asyncHandler(async (req, res) => {
  const result = await placementService.listPlacements(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Placements retrieved successfully'));
});

export const handleGetPlacementStats = asyncHandler(async (req, res) => {
  const stats = await placementService.getPlacementStats(req.query);
  res.status(200).json(new ApiResponse(200, stats, 'Placement statistics retrieved successfully'));
});
