import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi, getCurrentUserApi, logoutApi } from '../../api/authApi';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      const user = data?.user || (data?.role ? data : null);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Login failed. Please check credentials.'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerApi(userData);
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      const user = data?.user || (data?.role ? data : null);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Registration failed. Please try again.'
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCurrentUserApi();
      const user = data?.user || data;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch user session.'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
);

const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
let storedUser = null;
if (typeof window !== 'undefined') {
  try {
    const rawUser = localStorage.getItem('user');
    storedUser = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    storedUser = null;
  }
}

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload?.user || action.payload;
        state.user = user;
        state.token = action.payload?.token || state.token;
        state.isAuthenticated = true;
        state.error = null;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload?.user || action.payload;
        state.user = user;
        state.token = action.payload?.token || state.token;
        state.isAuthenticated = true;
        state.error = null;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload?.user || action.payload;
        state.user = user;
        state.isAuthenticated = true;
        state.error = null;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  },
});

export const { clearAuthError, resetAuth } = authSlice.actions;
export const clearAuth = resetAuth;
export default authSlice.reducer;
