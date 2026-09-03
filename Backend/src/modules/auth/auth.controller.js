import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import authService from './auth.service.js';

export const registerHandler = asyncHandler(async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);

  const cookieOptions = authService.getCookieOptions();
  res.cookie('token', token, cookieOptions);

  return res.status(201).json(
    new ApiResponse(
      201,
      { user, token },
      'User account registered successfully'
    )
  );
});

export const loginHandler = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginUser(req.body);

  const cookieOptions = authService.getCookieOptions();
  res.cookie('token', token, cookieOptions);

  return res.status(200).json(
    new ApiResponse(
      200,
      { user, token },
      'Logged in successfully'
    )
  );
});

export const logoutHandler = asyncHandler(async (req, res) => {
  const cookieOptions = authService.getCookieOptions();
  res.clearCookie('token', cookieOptions);

  return res.status(200).json(
    new ApiResponse(200, null, 'Logged out successfully')
  );
});

export const getCurrentUserHandler = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  return res.status(200).json(
    new ApiResponse(200, user, 'Current user profile fetched successfully')
  );
});

export default {
  registerHandler,
  loginHandler,
  logoutHandler,
  getCurrentUserHandler,
};
