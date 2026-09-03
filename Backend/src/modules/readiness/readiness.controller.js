import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import readinessService from './readiness.service.js';

export const getMyReadinessHandler = asyncHandler(async (req, res) => {
  const readiness = await readinessService.calculateCompositeReadinessScore(req.user.id);
  return res.status(200).json(
    new ApiResponse(200, readiness, 'Job readiness score calculated successfully')
  );
});

export const getStudentReadinessHandler = asyncHandler(async (req, res) => {
  const readiness = await readinessService.calculateCompositeReadinessScore(req.params.studentId);
  return res.status(200).json(
    new ApiResponse(200, readiness, 'Student readiness score calculated successfully')
  );
});

export default {
  getMyReadinessHandler,
  getStudentReadinessHandler,
};
