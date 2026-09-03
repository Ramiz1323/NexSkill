import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  loginUser,
  registerUser,
  fetchCurrentUser,
  logoutUser,
  clearAuthError,
  resetAuth,
} from '../redux/slices/authSlice';

/**
 * Custom hook to interact with Redux auth slice
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = useCallback(
    (credentials) => dispatch(loginUser(credentials)),
    [dispatch]
  );

  const register = useCallback(
    (userData) => dispatch(registerUser(userData)),
    [dispatch]
  );

  const fetchSession = useCallback(
    () => dispatch(fetchCurrentUser()),
    [dispatch]
  );

  const logout = useCallback(
    () => dispatch(logoutUser()),
    [dispatch]
  );

  const clearError = useCallback(
    () => dispatch(clearAuthError()),
    [dispatch]
  );

  const reset = useCallback(
    () => dispatch(resetAuth()),
    [dispatch]
  );

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    fetchSession,
    logout,
    clearError,
    reset,
  };
};

export default useAuth;
