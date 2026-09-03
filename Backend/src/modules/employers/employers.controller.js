import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as employerService from './employers.service.js';

export const handleCreateEmployer = asyncHandler(async (req, res) => {
  const { companyName, industry, location, contactEmail } = req.body;
  if (!companyName || !industry || !location || !contactEmail) {
    throw new ApiError(400, 'Company name, industry, location, and contact email are required');
  }

  const employer = await employerService.createEmployer(req.body);
  res.status(201).json(new ApiResponse(201, employer, 'Employer profile created successfully'));
});

export const handleGetEmployerById = asyncHandler(async (req, res) => {
  const employer = await employerService.getEmployerById(req.params.id);
  if (!employer) {
    throw new ApiError(404, 'Employer not found');
  }
  res.status(200).json(new ApiResponse(200, employer, 'Employer retrieved successfully'));
});

export const handleUpdateEmployer = asyncHandler(async (req, res) => {
  const employer = await employerService.updateEmployerProfile(req.params.id, req.body);
  if (!employer) {
    throw new ApiError(404, 'Employer not found');
  }
  res.status(200).json(new ApiResponse(200, employer, 'Employer updated successfully'));
});

export const handleListEmployers = asyncHandler(async (req, res) => {
  const result = await employerService.listEmployers(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Employers retrieved successfully'));
});

export const handleDeleteEmployer = asyncHandler(async (req, res) => {
  const employer = await employerService.deleteEmployer(req.params.id);
  if (!employer) {
    throw new ApiError(404, 'Employer not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Employer deleted successfully'));
});
