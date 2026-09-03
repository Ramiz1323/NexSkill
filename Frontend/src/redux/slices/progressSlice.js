import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProgressApi, addCredentialApi } from '../../api/progressTrackerApi';

export const fetchProgress = createAsyncThunk(
  'progress/fetchProgress',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProgressApi();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to load progress data.'
      );
    }
  }
);

export const addCredentialThunk = createAsyncThunk(
  'progress/addCredentialThunk',
  async (credentialData, { rejectWithValue }) => {
    try {
      const data = await addCredentialApi(credentialData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to add credential.'
      );
    }
  }
);

const initialState = {
  credentials: [],
  skillProgress: [],
  overallProgress: 0,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgressData: (state, action) => {
      state.credentials = action.payload.credentials || [];
      state.skillProgress = action.payload.skillProgress || [];
      state.overallProgress = action.payload.overallProgress || 0;
      state.loading = false;
      state.error = null;
    },
    clearProgressError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProgress
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.credentials = action.payload.credentials || [];
        state.skillProgress = action.payload.skillProgress || [];
        state.overallProgress = action.payload.overallProgress || 0;
        state.error = null;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addCredentialThunk
      .addCase(addCredentialThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCredentialThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newCred = action.payload.credential || action.payload;
        state.credentials.push(newCred);
        state.error = null;
      })
      .addCase(addCredentialThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProgressData, clearProgressError } = progressSlice.actions;
export default progressSlice.reducer;
