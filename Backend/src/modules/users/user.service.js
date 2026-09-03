import User from './user.model.js';
import ApiError from '../../utils/ApiError.js';
import { getPaginationOptions, formatPaginatedResponse } from '../../utils/pagination.js';

export const getAllUsers = async (query = {}) => {
  const { page, limit, skip } = getPaginationOptions(query);

  const filter = {};
  if (query.role) filter.role = query.role;
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }
  if (query.isActive !== undefined) {
    filter.isActive = query.isActive === 'true';
  }

  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return formatPaginatedResponse({ data: users, total, page, limit });
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, `User not found with id: ${id}`);
  }
  return user;
};

export const updateUser = async (id, updateData) => {
  // Prevent direct password or role update through this generic endpoint
  delete updateData.password;
  delete updateData.role;

  const user = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError(404, `User not found with id: ${id}`);
  }

  return user;
};

export const updateUserRole = async (id, newRole) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { role: newRole } },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError(404, `User not found with id: ${id}`);
  }

  return user;
};

export const deactivateUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { isActive: false } },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, `User not found with id: ${id}`);
  }

  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(404, `User not found with id: ${id}`);
  }
  return user;
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserRole,
  deactivateUser,
  deleteUser,
};
