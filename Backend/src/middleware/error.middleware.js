import ApiError from '../utils/ApiError.js';
import env from '../config/env.js';

export const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';

    // Handle Mongoose Bad ObjectId (CastError)
    if (error.name === 'CastError') {
      message = `Resource not found with id: ${error.value}`;
      error = new ApiError(404, message);
    }
    // Handle Mongoose Duplicate Key Error (11000)
    else if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {}).join(', ');
      message = `Duplicate field value entered for: ${field}. Please use another value.`;
      error = new ApiError(409, message);
    }
    // Handle Mongoose Validation Error
    else if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors || {}).map((val) => val.message);
      message = `Validation Error: ${errors.join('; ')}`;
      error = new ApiError(400, message, errors);
    }
    // Handle JWT Errors
    else if (error.name === 'JsonWebTokenError') {
      error = new ApiError(401, 'Invalid authentication token');
    } else if (error.name === 'TokenExpiredError') {
      error = new ApiError(401, 'Authentication token expired');
    } else {
      error = new ApiError(statusCode, message, [], err.stack);
    }
  }

  const response = {
    statusCode: error.statusCode,
    success: false,
    message: error.message,
    errors: error.errors || [],
    ...(env.NODE_ENV !== 'production' && { stack: error.stack }),
  };

  return res.status(error.statusCode).json(response);
};

export default errorMiddleware;
