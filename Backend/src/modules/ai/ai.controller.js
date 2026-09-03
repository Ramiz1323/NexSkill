import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as aiService from './ai.service.js';
import Job from '../jobs/jobs.model.js';

export const handleCalculateMatch = asyncHandler(async (req, res) => {
  const { candidateSkills, jobId } = req.body;
  if (!candidateSkills || !jobId) {
    throw new ApiError(400, 'Candidate skills and jobId are required');
  }

  const job = await Job.findById(jobId).populate('employer');
  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  const match = aiService.calculateCandidateJobMatch(candidateSkills, job);
  res.status(200).json(new ApiResponse(200, { job, ...match }, 'Candidate job match calculated successfully'));
});

export const handleRecommendJobs = asyncHandler(async (req, res) => {
  const { candidateId, candidateSkills, limit } = req.body;
  if (!candidateSkills || !Array.isArray(candidateSkills)) {
    throw new ApiError(400, 'candidateSkills must be an array of skills');
  }

  const recommendations = await aiService.recommendJobsForCandidate({
    candidateId,
    candidateSkills,
    limit,
  });

  res.status(200).json(new ApiResponse(200, recommendations, 'Job recommendations generated successfully'));
});

export const handleRecommendCareerPaths = asyncHandler(async (req, res) => {
  const { candidateSkills, aspirations } = req.body;
  if (!candidateSkills || !Array.isArray(candidateSkills)) {
    throw new ApiError(400, 'candidateSkills must be an array of skills');
  }

  const careerPaths = await aiService.recommendCareerPaths({
    candidateSkills,
    aspirations,
  });

  res.status(200).json(new ApiResponse(200, careerPaths, 'Career path recommendations generated successfully'));
});

export const handleGetRecommendationHistory = asyncHandler(async (req, res) => {
  const history = await aiService.getRecommendationHistory(req.params.candidateId);
  res.status(200).json(new ApiResponse(200, history, 'Recommendation history retrieved successfully'));
});
