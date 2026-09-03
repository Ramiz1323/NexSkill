<<<<<<<<< Temporary merge branch 1
export const getPaginationOptions = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
=========
/**
 * Pagination helper for MongoDB queries
 * @param {Object} queryParams - { page, limit }
 * @returns {Object} { page, limit, skip }
 */
export const getPagination = (queryParams = {}) => {
  const page = Math.max(1, parseInt(queryParams.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(queryParams.limit, 10) || 10));
>>>>>>>>> Temporary merge branch 2
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

<<<<<<<<< Temporary merge branch 1
export const formatPaginatedResponse = ({ data, total, page, limit }) => {
  const totalPages = Math.ceil(total / limit);

  return {
    items: data,
    pagination: {
      totalItems: total,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
=========
/**
 * Format paginated result structure
 */
export const formatPaginatedResponse = (items, total, page, limit) => {
  return {
    items,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
>>>>>>>>> Temporary merge branch 2
    },
  };
};

<<<<<<<<< Temporary merge branch 1
export default {
  getPaginationOptions,
  formatPaginatedResponse,
};
=========
export default { getPagination, formatPaginatedResponse };
>>>>>>>>> Temporary merge branch 2
