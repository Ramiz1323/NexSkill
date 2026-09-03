import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import skillGapService from './skillGap.service.js';

export const getSkillGapHandler = asyncHandler(async (req, res) => {
  const studentId = req.query.studentId || (req.user && req.user.id);
  const targetRole = req.query.targetRole || 'Software Engineer';

  const gapAnalysis = await skillGapService.calculateSkillGap(studentId, targetRole);

  return res.status(200).json(
    new ApiResponse(200, gapAnalysis, 'Skill gap analysis calculated successfully')
  );
});

export const getAdaptivePathHandler = asyncHandler(async (req, res) => {
  const studentId = req.query.studentId || (req.user && req.user.id);
  const targetRole = req.query.targetRole || 'Software Engineer';

  const roadmap = await skillGapService.generateAdaptiveLearningPath(studentId, targetRole);

  return res.status(200).json(
    new ApiResponse(200, roadmap, 'Adaptive learning roadmap generated successfully')
  );
});

export default {
  getSkillGapHandler,
  getAdaptivePathHandler,
};
