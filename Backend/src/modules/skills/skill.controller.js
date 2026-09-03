import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import skillService from './skill.service.js';

export const getSkillsHandler = asyncHandler(async (req, res) => {
  const result = await skillService.getAllSkills(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, 'Skills fetched successfully')
  );
});

export const getSkillByIdHandler = asyncHandler(async (req, res) => {
  const skill = await skillService.getSkillById(req.params.id);
  return res.status(200).json(
    new ApiResponse(200, skill, 'Skill details fetched successfully')
  );
});

export const createSkillHandler = asyncHandler(async (req, res) => {
  const skill = await skillService.createSkill(req.body);
  return res.status(201).json(
    new ApiResponse(201, skill, 'Skill created successfully in catalog')
  );
});

export const updateSkillHandler = asyncHandler(async (req, res) => {
  const skill = await skillService.updateSkill(req.params.id, req.body);
  return res.status(200).json(
    new ApiResponse(200, skill, 'Skill updated successfully')
  );
});

export const deleteSkillHandler = asyncHandler(async (req, res) => {
  await skillService.deleteSkill(req.params.id);
  return res.status(200).json(
    new ApiResponse(200, null, 'Skill deactivated successfully')
  );
});

export default {
  getSkillsHandler,
  getSkillByIdHandler,
  createSkillHandler,
  updateSkillHandler,
  deleteSkillHandler,
};
