import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCandidatesApi, getJobListingsApi } from '../../api/employerApi';

export const fetchCandidates = createAsyncThunk(
  'employer/fetchCandidates',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getCandidatesApi(params);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch candidate pool.'
      );
    }
  }
);

export const fetchJobListings = createAsyncThunk(
  'employer/fetchJobListings',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getJobListingsApi(params);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch employer job listings.'
      );
    }
  }
);

const initialState = {
  candidates: [],
  jobListings: [],
  loading: false,
  error: null,
};

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    clearEmployerError: (state) => {
      state.error = null;
    },
    setEmployerData: (state, action) => {
      state.candidates = action.payload.candidates || [];
      state.jobListings = action.payload.jobListings || [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCandidates
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = Array.isArray(action.payload)
          ? action.payload
          : action.payload.candidates || [];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchJobListings
      .addCase(fetchJobListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobListings.fulfilled, (state, action) => {
        state.loading = false;
        state.jobListings = Array.isArray(action.payload)
          ? action.payload
          : action.payload.jobs || [];
      })
      .addCase(fetchJobListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployerError, setEmployerData } = employerSlice.actions;
export default employerSlice.reducer;

