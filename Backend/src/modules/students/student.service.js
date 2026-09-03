import StudentProfile from './student.model.js';
import ApiError from '../../utils/ApiError.js';
import { getPaginationOptions, formatPaginatedResponse } from '../../utils/pagination.js';

export const getProfileByUserId = async (userId) => {
  const profile = await StudentProfile.findOne({ user: userId }).populate('user', 'name email role phone avatar');
  if (!profile) {
    throw new ApiError(404, 'Student profile not found for this user');
  }
  return profile;
};

export const upsertProfile = async (userId, profileData) => {
  const profile = await StudentProfile.findOneAndUpdate(
    { user: userId },
    { $set: { ...profileData, user: userId } },
    { new: true, upsert: true, runValidators: true }
  ).populate('user', 'name email role phone avatar');

  return profile;
};

export const getAllStudentProfiles = async (query = {}) => {
  const { page, limit, skip } = getPaginationOptions(query);

  const filter = {};
  if (query.branch) filter.branch = { $regex: query.branch, $options: 'i' };
  if (query.college) filter.college = { $regex: query.college, $options: 'i' };
  if (query.graduationYear) filter.graduationYear = Number(query.graduationYear);
  if (query.minReadiness) filter.readinessScore = { $gte: Number(query.minReadiness) };

  const [profiles, total] = await Promise.all([
    StudentProfile.find(filter)
      .populate('user', 'name email role avatar')
      .sort({ readinessScore: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    StudentProfile.countDocuments(filter),
  ]);

  return formatPaginatedResponse({ data: profiles, total, page, limit });
};

export const updateReadinessScore = async (userId, score) => {
  const profile = await StudentProfile.findOneAndUpdate(
    { user: userId },
    { $set: { readinessScore: Math.min(100, Math.max(0, score)) } },
    { new: true }
  );
  return profile;
};

export default {
  getProfileByUserId,
  upsertProfile,
  getAllStudentProfiles,
  updateReadinessScore,
};
