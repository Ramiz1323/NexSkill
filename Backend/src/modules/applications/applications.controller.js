import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as applicationService from './applications.service.js';

export const handleSubmitApplication = asyncHandler(async (req, res) => {
  const { job, student } = req.body;
  if (!job || !student || !student.name || !student.email) {
    throw new ApiError(400, 'Job ID and student name & email are required');
  }

  const application = await applicationService.submitApplication(req.body);
  res.status(201).json(new ApiResponse(201, application, 'Application submitted successfully'));
});

export const handleGetApplicationById = asyncHandler(async (req, res) => {
  const application = await applicationService.getApplicationById(req.params.id);
  if (!application) {
    throw new ApiError(404, 'Application not found');
  }
  res.status(200).json(new ApiResponse(200, application, 'Application retrieved successfully'));
});

export const handleGetApplicationsByJob = asyncHandler(async (req, res) => {
  const result = await applicationService.getApplicationsByJob(req.params.jobId, req.query);
  res.status(200).json(new ApiResponse(200, result, 'Job applications retrieved successfully'));
});

export const handleGetApplicationsByStudent = asyncHandler(async (req, res) => {
  const result = await applicationService.getApplicationsByStudent(
    req.params.studentId,
    req.query
  );
  res.status(200).json(new ApiResponse(200, result, 'Student applications retrieved successfully'));
});

export const handleUpdateStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  const application = await applicationService.updateApplicationStatus(
    req.params.id,
    status,
    note
  );
  if (!application) {
    throw new ApiError(404, 'Application not found');
  }
  res.status(200).json(new ApiResponse(200, application, 'Application status updated successfully'));
});

export const handleScheduleInterview = asyncHandler(async (req, res) => {
  const { scheduledAt, mode, meetingLink, notes } = req.body;
  if (!scheduledAt) {
    throw new ApiError(400, 'Interview scheduledAt date/time is required');
  }

  const application = await applicationService.scheduleInterview(req.params.id, {
    scheduledAt,
    mode,
    meetingLink,
    notes,
  });
  if (!application) {
    throw new ApiError(404, 'Application not found');
  }
  res.status(200).json(new ApiResponse(200, application, 'Interview scheduled successfully'));
});
