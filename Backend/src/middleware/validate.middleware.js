import ApiError from '../utils/ApiError.js';

export const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    if (!schema) return next();

    const dataToValidate = req[source];

    // If using Joi or Zod or custom validator function
    if (typeof schema.validate === 'function') {
      const { error, value } = schema.validate(dataToValidate, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return next(new ApiError(400, 'Validation Error', errorMessages));
      }

      req[source] = value;
      return next();
    }

    // If schema is a manual validator function: (data) => { isValid, errors }
    if (typeof schema === 'function') {
      const result = schema(dataToValidate);
      if (result && !result.isValid) {
        return next(
          new ApiError(400, 'Validation Error', result.errors || ['Invalid request data'])
        );
      }
      return next();
    }

    next();
  };
};

export const validationMiddleware = validateRequest;

export default validateRequest;
