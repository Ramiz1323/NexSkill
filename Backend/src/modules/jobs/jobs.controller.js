import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as jobService from './jobs.service.js';

export const handleCreateJob = asyncHandler(async (req, res) => {
  const { title, employer, description, location } = req.body;
  if (!title || !employer || !description || !location) {
    throw new ApiError(400, 'Title, employer ID, description, and location are required');
  }

  const job = await jobService.createJob(req.body);
  res.status(201).json(new ApiResponse(201, job, 'Job posting created successfully'));
});

export const handleGetJobById = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  if (!job) {
    throw new ApiError(404, 'Job not found');
  }
  res.status(200).json(new ApiResponse(200, job, 'Job retrieved successfully'));
});

export const handleUpdateJob = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body);
  if (!job) {
    throw new ApiError(404, 'Job not found');
  }
  res.status(200).json(new ApiResponse(200, job, 'Job updated successfully'));
});

export const handleDeleteJob = asyncHandler(async (req, res) => {
  const job = await jobService.deleteJob(req.params.id);
  if (!job) {
    throw new ApiError(404, 'Job not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Job deleted successfully'));
});

export const handleListJobs = asyncHandler(async (req, res) => {
  const result = await jobService.listJobs(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Jobs retrieved successfully'));
});
