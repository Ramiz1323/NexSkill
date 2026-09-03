import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import studentService from './student.service.js';

export const getMyProfileHandler = asyncHandler(async (req, res) => {
  const profile = await studentService.getProfileByUserId(req.user.id);
  return res.status(200).json(
    new ApiResponse(200, profile, 'Student profile fetched successfully')
  );
});

export const updateMyProfileHandler = asyncHandler(async (req, res) => {
  const profile = await studentService.upsertProfile(req.user.id, req.body);
  return res.status(200).json(
    new ApiResponse(200, profile, 'Student profile updated successfully')
  );
});

export const getStudentProfileByIdHandler = asyncHandler(async (req, res) => {
  const profile = await studentService.getProfileByUserId(req.params.userId);
  return res.status(200).json(
    new ApiResponse(200, profile, 'Student profile fetched successfully')
  );
});

export const getAllStudentProfilesHandler = asyncHandler(async (req, res) => {
  const result = await studentService.getAllStudentProfiles(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, 'Student profiles retrieved successfully')
  );
});

export default {
  getMyProfileHandler,
  updateMyProfileHandler,
  getStudentProfileByIdHandler,
  getAllStudentProfilesHandler,
};
