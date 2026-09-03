import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as emergingSkillService from './emergingSkills.service.js';

export const handleCreateEmergingSkill = asyncHandler(async (req, res) => {
  const { skillName, category, projectedGrowthRate } = req.body;
  if (!skillName || !category || projectedGrowthRate === undefined) {
    throw new ApiError(400, 'Skill name, category, and projected growth rate are required');
  }

  const skill = await emergingSkillService.createEmergingSkill(req.body);
  res.status(201).json(new ApiResponse(201, skill, 'Emerging skill recorded successfully'));
});

export const handleGetEmergingSkillById = asyncHandler(async (req, res) => {
  const skill = await emergingSkillService.getEmergingSkillById(req.params.id);
  if (!skill) {
    throw new ApiError(404, 'Emerging skill not found');
  }
  res.status(200).json(new ApiResponse(200, skill, 'Emerging skill retrieved successfully'));
});

export const handleUpdateEmergingSkill = asyncHandler(async (req, res) => {
  const skill = await emergingSkillService.updateEmergingSkill(req.params.id, req.body);
  if (!skill) {
    throw new ApiError(404, 'Emerging skill not found');
  }
  res.status(200).json(new ApiResponse(200, skill, 'Emerging skill updated successfully'));
});

export const handleDeleteEmergingSkill = asyncHandler(async (req, res) => {
  const skill = await emergingSkillService.deleteEmergingSkill(req.params.id);
  if (!skill) {
    throw new ApiError(404, 'Emerging skill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Emerging skill deleted successfully'));
});

export const handleListEmergingSkills = asyncHandler(async (req, res) => {
  const result = await emergingSkillService.listEmergingSkills(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Emerging skills retrieved successfully'));
});

export const handleGetTopForecastedSkills = asyncHandler(async (req, res) => {
  const skills = await emergingSkillService.getTopForecastedSkills(req.query.limit);
  res.status(200).json(new ApiResponse(200, skills, 'Top forecasted skills retrieved successfully'));
});

export const handleGetDisplacementAnalysis = asyncHandler(async (req, res) => {
  const analysis = await emergingSkillService.getSkillsDisplacementAnalysis();
  res.status(200).json(new ApiResponse(200, analysis, 'Skills displacement analysis retrieved successfully'));
});
