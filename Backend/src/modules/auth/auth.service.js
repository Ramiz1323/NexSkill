import User from '../users/user.model.js';
import ApiError from '../../utils/ApiError.js';
import env from '../../config/env.js';

export const getCookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

export const registerUser = async ({ name, email, password, role = 'STUDENT', phone }) => {
  if (!email || !password || !name) {
    throw new ApiError(400, 'Name, email, and password are required fields');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'An account with this email address already exists');
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: role.toUpperCase(),
    phone,
  });

  const token = user.generateAuthToken();

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Account is deactivated. Please contact support.');
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = user.generateAuthToken();

  return { user, token };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'Authenticated user not found');
  }
  return user;
};

export default {
  getCookieOptions,
  registerUser,
  loginUser,
  getCurrentUser,
};
