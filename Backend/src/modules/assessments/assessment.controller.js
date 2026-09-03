import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import assessmentService from './assessment.service.js';

export const getAssessmentsHandler = asyncHandler(async (req, res) => {
  const result = await assessmentService.getAllAssessments(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, 'Assessments retrieved successfully')
  );
});

export const getAssessmentByIdHandler = asyncHandler(async (req, res) => {
  const assessment = await assessmentService.getAssessmentById(req.params.id);
  return res.status(200).json(
    new ApiResponse(200, assessment, 'Assessment details retrieved')
  );
});

export const createAssessmentHandler = asyncHandler(async (req, res) => {
  const assessment = await assessmentService.createAssessment(req.body);
  return res.status(201).json(
    new ApiResponse(201, assessment, 'Assessment created successfully')
  );
});

export const submitAssessmentHandler = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const evaluation = await assessmentService.submitAssessment(
    req.params.id,
    req.user.id,
    answers
  );

  return res.status(200).json(
    new ApiResponse(200, evaluation, 'Assessment submitted and evaluated successfully')
  );
});

export const getMyHistoryHandler = asyncHandler(async (req, res) => {
  const history = await assessmentService.getStudentAssessmentHistory(req.user.id);
  return res.status(200).json(
    new ApiResponse(200, history, 'Assessment history retrieved successfully')
  );
});

export default {
  getAssessmentsHandler,
  getAssessmentByIdHandler,
  createAssessmentHandler,
  submitAssessmentHandler,
  getMyHistoryHandler,
};
