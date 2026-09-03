import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as analyticsService from './analytics.service.js';

export const handleGetPlatformOverview = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getPlatformOverviewStats();
  res.status(200).json(new ApiResponse(200, stats, 'Platform overview statistics retrieved successfully'));
});

export const handleGetSkillDemandAnalytics = asyncHandler(async (req, res) => {
  const demand = await analyticsService.getSkillDemandAnalytics();
  res.status(200).json(new ApiResponse(200, demand, 'Skill demand analytics retrieved successfully'));
});

export const handleGetPlacementAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getPlacementAnalyticsSummary();
  res.status(200).json(new ApiResponse(200, analytics, 'Placement analytics retrieved successfully'));
});

export const handleGetEmployerHiringTrends = asyncHandler(async (req, res) => {
  const trends = await analyticsService.getEmployerHiringTrends(req.params.employerId);
  res.status(200).json(new ApiResponse(200, trends, 'Employer hiring pipeline trends retrieved successfully'));
});
