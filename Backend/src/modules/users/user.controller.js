import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import userService from './user.service.js';

export const getUsersHandler = asyncHandler(async (req, res) => {
  const result = await userService.getAllUsers(req.query);
  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Users retrieved successfully'));
});

export const getUserByIdHandler = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, user, 'User retrieved successfully'));
});

export const updateUserHandler = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, user, 'User profile updated successfully'));
});

export const updateRoleHandler = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await userService.updateUserRole(req.params.id, role);
  return res
    .status(200)
    .json(new ApiResponse(200, user, `User role changed to ${role}`));
});

export const deactivateUserHandler = asyncHandler(async (req, res) => {
  const user = await userService.deactivateUser(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, user, 'User deactivated successfully'));
});

export const deleteUserHandler = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, null, 'User deleted successfully'));
});

export default {
  getUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  updateRoleHandler,
  deactivateUserHandler,
  deleteUserHandler,
};
