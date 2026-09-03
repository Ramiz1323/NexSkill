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
export const formatPaginatedResponse = (arg1, total, page, limit) => {
  let items = arg1;
  let tot = total;
  let pg = page;
  let lim = limit;

  // Support object input format: { data: [...], total, page, limit }
  if (arg1 && typeof arg1 === 'object' && !Array.isArray(arg1) && 'data' in arg1) {
    items = arg1.data;
    tot = arg1.total;
    pg = arg1.page;
    lim = arg1.limit;
  }

  const pages = Math.ceil(tot / lim) || 1;

  return {
    items,
    data: items,
    pagination: {
      total: tot,
      totalItems: tot,
      page: pg,
      currentPage: pg,
      limit: lim,
      pages,
      totalPages: pages,
      hasNextPage: pg < pages,
      hasPrevPage: pg > 1,
    },
  };
};

export default {
  getPagination,
  getPaginationOptions,
  formatPaginatedResponse,
};
