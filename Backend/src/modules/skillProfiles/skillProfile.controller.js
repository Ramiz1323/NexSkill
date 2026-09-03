import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import skillProfileService from './skillProfile.service.js';

export const getMySkillsHandler = asyncHandler(async (req, res) => {
  const skills = await skillProfileService.getStudentSkills(req.user.id);
  return res.status(200).json(
    new ApiResponse(200, skills, 'Student skill profile retrieved successfully')
  );
});

export const getSkillsByStudentIdHandler = asyncHandler(async (req, res) => {
  const skills = await skillProfileService.getStudentSkills(req.params.studentId);
  return res.status(200).json(
    new ApiResponse(200, skills, 'Student skills retrieved successfully')
  );
});

export const upsertMySkillHandler = asyncHandler(async (req, res) => {
  const updatedSkill = await skillProfileService.upsertStudentSkill(req.user.id, req.body);
  return res.status(200).json(
    new ApiResponse(200, updatedSkill, 'Skill proficiency updated successfully')
  );
});

export const deleteMySkillHandler = asyncHandler(async (req, res) => {
  await skillProfileService.deleteStudentSkill(req.user.id, req.params.skillId);
  return res.status(200).json(
    new ApiResponse(200, null, 'Skill removed from profile successfully')
  );
});

export default {
  getMySkillsHandler,
  getSkillsByStudentIdHandler,
  upsertMySkillHandler,
  deleteMySkillHandler,
};
