<<<<<<< HEAD
=======
/**
 * Asynchronous route handler wrapper to forward errors to Express next()
 * @param {Function} requestHandler
 */
>>>>>>> b7782a51ab4547fa45f528ac0894c3b7bd6d4e53
export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
