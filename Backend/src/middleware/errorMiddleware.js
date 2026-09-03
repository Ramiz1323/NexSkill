export { errorMiddleware, default } from './error.middleware.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Centralized error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Normalize generic errors to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    statusCode: error.statusCode,
    message: error.message,
    success: false,
    errors: error.errors,
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export default errorHandler;
