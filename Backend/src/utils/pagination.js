/**
 * Pagination helper for MongoDB queries
 * @param {Object} queryParams - { page, limit }
 * @returns {Object} { page, limit, skip }
 */
export const getPagination = (queryParams = {}) => {
  const page = Math.max(1, parseInt(queryParams.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(queryParams.limit, 10) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const getPaginationOptions = getPagination;

/**
 * Format paginated result structure
 */
export const formatPaginatedResponse = (items, total, page, limit) => {
  const actualItems = Array.isArray(items) ? items : items?.data || [];
  const actualTotal = total !== undefined ? total : items?.total || actualItems.length;
  const actualPage = page || items?.page || 1;
  const actualLimit = limit || items?.limit || 10;
  const totalPages = Math.ceil(actualTotal / actualLimit) || 1;

  return {
    items: actualItems,
    data: actualItems,
    pagination: {
      total: actualTotal,
      totalItems: actualTotal,
      page: actualPage,
      currentPage: actualPage,
      limit: actualLimit,
      pages: totalPages,
      totalPages,
      hasNextPage: actualPage < totalPages,
      hasPrevPage: actualPage > 1,
    },
  };
};

export default {
  getPagination,
  getPaginationOptions,
  formatPaginatedResponse,
};
