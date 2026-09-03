import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Universal data-fetching hook
 * @param {Function} fetcher - Async function returning data
 * @param {Array} dependencies - Dependency array to trigger refetch
 * @param {Object} options - { immediate: boolean, initialData: any }
 */
export const useFetch = (fetcher, dependencies = [], options = {}) => {
  const { immediate = true, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const isMountedRef = useRef(true);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcherRef.current(...args);
        if (isMountedRef.current) {
          setData(result);
          setLoading(false);
        }
        return result;
      } catch (err) {
        if (isMountedRef.current) {
          const message = err.response?.data?.message || err.message || 'An error occurred';
          setError(message);
          setLoading(false);
        }
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    isMountedRef.current = true;
    if (immediate && typeof fetcherRef.current === 'function') {
      execute();
    }
    return () => {
      isMountedRef.current = false;
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    error,
    refetch: execute,
    setData,
  };
};

export default useFetch;
