<<<<<<<<< Temporary merge branch 1
=========
/**
 * Asynchronous route handler wrapper to forward errors to Express next()
 * @param {Function} requestHandler
 */
>>>>>>>>> Temporary merge branch 2
export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
