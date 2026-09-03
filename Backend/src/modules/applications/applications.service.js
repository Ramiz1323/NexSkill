import Application from './applications.model.js';
import { incrementApplicantsCount } from '../jobs/jobs.service.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Submit candidate job application
 */
export const submitApplication = async (applicationData) => {
  const application = await Application.create({
    ...applicationData,
    statusHistory: [{ status: 'Applied', changedAt: new Date(), note: 'Application submitted' }],
  });

  // Increment applicants count on job
  await incrementApplicantsCount(application.job);

  return application.populate('job');
};

/**
 * Retrieve application by ID
 */
export const getApplicationById = async (applicationId) => {
  const application = await Application.findById(applicationId).populate({
    path: 'job',
    populate: { path: 'employer' },
  });
  return application;
};

/**
 * List applications for a specific job posting
 */
export const getApplicationsByJob = async (jobId, query = {}) => {
  const { status, minMatchScore } = query;
  const filter = { job: jobId };

  if (status) {
    filter.status = status;
  }
  if (minMatchScore) {
    filter.matchScore = { $gte: Number(minMatchScore) };
  }

  const { page, limit, skip } = getPagination(query);

  const [applications, total] = await Promise.all([
    Application.find(filter).sort({ matchScore: -1, createdAt: -1 }).skip(skip).limit(limit),
    Application.countDocuments(filter),
  ]);

  return formatPaginatedResponse(applications, total, page, limit);
};

/**
 * List applications submitted by a student
 */
export const getApplicationsByStudent = async (identifier, query = {}) => {
  const filter = {
    $or: [{ 'student.studentId': identifier }, { 'student.email': identifier }],
  };

  const { page, limit, skip } = getPagination(query);

  const [applications, total] = await Promise.all([
    Application.find(filter)
      .populate({ path: 'job', populate: { path: 'employer' } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Application.countDocuments(filter),
  ]);

  return formatPaginatedResponse(applications, total, page, limit);
};

/**
 * Update application pipeline status (Shortlisted, Interview, Selected, Rejected)
 */
export const updateApplicationStatus = async (applicationId, status, note = '') => {
  const application = await Application.findByIdAndUpdate(
    applicationId,
    {
      $set: { status },
      $push: { statusHistory: { status, changedAt: new Date(), note } },
    },
    { new: true, runValidators: true }
  ).populate('job');

  return application;
};

/**
 * Schedule interview for candidate
 */
export const scheduleInterview = async (applicationId, interviewDetails) => {
  const application = await Application.findByIdAndUpdate(
    applicationId,
    {
      $set: {
        status: 'Interview',
        interviewDetails,
      },
      $push: {
        statusHistory: {
          status: 'Interview',
          changedAt: new Date(),
          note: `Interview scheduled on ${interviewDetails.scheduledAt}`,
        },
      },
    },
    { new: true, runValidators: true }
  ).populate('job');

  return application;
};
