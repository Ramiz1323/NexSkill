/**
 * Asynchronous route handler wrapper to forward errors to Express next()
 * @param {Function} requestHandler
 */
export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
