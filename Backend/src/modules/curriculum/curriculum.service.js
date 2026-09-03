import Curriculum from './curriculum.model.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Create a new curriculum specification
 */
export const createCurriculum = async (curriculumData) => {
  const curriculum = await Curriculum.create(curriculumData);
  return curriculum;
};

/**
 * Retrieve curriculum by ID
 */
export const getCurriculumById = async (curriculumId) => {
  const curriculum = await Curriculum.findById(curriculumId);
  return curriculum;
};

/**
 * Update curriculum
 */
export const updateCurriculum = async (curriculumId, updateData) => {
  const curriculum = await Curriculum.findByIdAndUpdate(
    curriculumId,
    { $set: { ...updateData, lastReviewedAt: new Date() } },
    { new: true, runValidators: true }
  );
  return curriculum;
};

/**
 * Delete curriculum
 */
export const deleteCurriculum = async (curriculumId) => {
  const curriculum = await Curriculum.findByIdAndDelete(curriculumId);
  return curriculum;
};

/**
 * List curricula with filtering and pagination
 */
export const listCurricula = async (query = {}) => {
  const { search, domain, targetRole, partner, status = 'Active' } = query;
  const filter = {};

  if (status && status !== 'All') {
    filter.status = status;
  }
  if (domain) {
    filter.domain = { $regex: domain, $options: 'i' };
  }
  if (targetRole) {
    filter.targetRole = { $regex: targetRole, $options: 'i' };
  }
  if (partner) {
    filter.industryPartners = { $regex: partner, $options: 'i' };
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { domain: { $regex: search, $options: 'i' } },
      { targetRole: { $regex: search, $options: 'i' } },
    ];
  }

  const { page, limit, skip } = getPagination(query);

  const [curricula, total] = await Promise.all([
    Curriculum.find(filter).sort({ alignmentScore: -1, createdAt: -1 }).skip(skip).limit(limit),
    Curriculum.countDocuments(filter),
  ]);

  return formatPaginatedResponse(curricula, total, page, limit);
};
