import Job from './jobs.model.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Create a new job posting
 */
export const createJob = async (jobData) => {
  const job = await Job.create(jobData);
  return job.populate('employer');
};

/**
 * Retrieve job by ID with employer populated
 */
export const getJobById = async (jobId) => {
  const job = await Job.findById(jobId).populate('employer');
  return job;
};

/**
 * Update job posting
 */
export const updateJob = async (jobId, updateData) => {
  const job = await Job.findByIdAndUpdate(
    jobId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('employer');
  return job;
};

/**
 * Delete job posting
 */
export const deleteJob = async (jobId) => {
  const job = await Job.findByIdAndDelete(jobId);
  return job;
};

/**
 * List jobs with comprehensive filtering (skills, workplace, experience, search, status)
 */
export const listJobs = async (query = {}) => {
  const {
    search,
    skills,
    workplaceType,
    experienceLevel,
    employmentType,
    employerId,
    status = 'Active',
  } = query;

  const filter = {};

  if (status && status !== 'All') {
    filter.status = status;
  }
  if (employerId) {
    filter.employer = employerId;
  }
  if (workplaceType) {
    filter.workplaceType = workplaceType;
  }
  if (experienceLevel) {
    filter.experienceLevel = experienceLevel;
  }
  if (employmentType) {
    filter.employmentType = employmentType;
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }
  if (skills) {
    const skillList = Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim());
    filter.requiredSkills = { $in: skillList };
  }

  const { page, limit, skip } = getPagination(query);

  const [jobs, total] = await Promise.all([
    Job.find(filter)
      .populate('employer')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Job.countDocuments(filter),
  ]);

  return formatPaginatedResponse(jobs, total, page, limit);
};

/**
 * Increment applicants count on a job
 */
export const incrementApplicantsCount = async (jobId) => {
  return Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } }, { new: true });
};
