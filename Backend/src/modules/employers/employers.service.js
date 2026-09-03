import Employer from './employers.model.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Create a new Employer company profile
 */
export const createEmployer = async (employerData) => {
  const employer = await Employer.create(employerData);
  return employer;
};

/**
 * Retrieve employer profile by ID
 */
export const getEmployerById = async (employerId) => {
  const employer = await Employer.findById(employerId);
  return employer;
};

/**
 * Update employer profile details
 */
export const updateEmployerProfile = async (employerId, updateData) => {
  const employer = await Employer.findByIdAndUpdate(
    employerId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return employer;
};

/**
 * List employers with search, industry filter, and pagination
 */
export const listEmployers = async (query = {}) => {
  const { search, industry, verified } = query;
  const filter = {};

  if (search) {
    filter.companyName = { $regex: search, $options: 'i' };
  }
  if (industry) {
    filter.industry = { $regex: industry, $options: 'i' };
  }
  if (verified !== undefined) {
    filter.verifiedStatus = verified === 'true' || verified === true;
  }

  const { page, limit, skip } = getPagination(query);

  const [employers, total] = await Promise.all([
    Employer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Employer.countDocuments(filter),
  ]);

  return formatPaginatedResponse(employers, total, page, limit);
};

/**
 * Delete employer profile
 */
export const deleteEmployer = async (employerId) => {
  const employer = await Employer.findByIdAndDelete(employerId);
  return employer;
};
