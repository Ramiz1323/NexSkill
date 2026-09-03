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
import {
  searchCandidatesApi,
  getCandidateByIdApi,
  updateCandidateStatusApi,
  shortlistCandidateApi,
} from '../../api/employerApi';

export const fetchCandidates = createAsyncThunk(
  'employer/fetchCandidates',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await searchCandidatesApi(params);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch candidates'
      );
    }
  }
);

export const fetchCandidateDetails = createAsyncThunk(
  'employer/fetchCandidateDetails',
  async (candidateId, { rejectWithValue }) => {
    try {
      const data = await getCandidateByIdApi(candidateId);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch candidate details'
      );
    }
  }
);

export const updateCandidateStatus = createAsyncThunk(
  'employer/updateCandidateStatus',
  async ({ candidateId, status }, { rejectWithValue }) => {
    try {
      const data = await updateCandidateStatusApi(candidateId, status);
      return { candidateId, status, data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to update candidate status'
      );
    }
  }
);

export const toggleShortlist = createAsyncThunk(
  'employer/toggleShortlist',
  async (candidateId, { rejectWithValue }) => {
    try {
      const data = await shortlistCandidateApi(candidateId);
      return { candidateId, data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to update shortlist status'
      );
    }
  }
);

const initialState = {
  candidates: [],
  jobListings: [],
  selectedCandidate: null,
  filters: {
    search: '',
    skills: [],
    minScore: 0,
    experienceLevel: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  loading: false,
  actionLoading: false,
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
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        skills: [],
        minScore: 0,
        experienceLevel: '',
      };
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearSelectedCandidate: (state) => {
      state.selectedCandidate = null;
    },
    clearEmployerError: (state) => {
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
        const payload = action.payload || {};
        if (Array.isArray(payload)) {
          state.candidates = payload;
          state.pagination.total = payload.length;
        } else {
          state.candidates = payload.candidates || [];
          if (payload.pagination) {
            state.pagination = { ...state.pagination, ...payload.pagination };
          } else if (payload.total !== undefined) {
            state.pagination.total = payload.total;
          }
        }
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchCandidateDetails
      .addCase(fetchCandidateDetails.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(fetchCandidateDetails.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.selectedCandidate = action.payload.candidate || action.payload;
      })
      .addCase(fetchCandidateDetails.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // updateCandidateStatus
      .addCase(updateCandidateStatus.fulfilled, (state, action) => {
        const { candidateId, status } = action.payload;
        state.candidates = state.candidates.map((c) =>
          (c._id === candidateId || c.id === candidateId) ? { ...c, status } : c
        );
        if (
          state.selectedCandidate &&
          (state.selectedCandidate._id === candidateId || state.selectedCandidate.id === candidateId)
        ) {
          state.selectedCandidate.status = status;
        }
      })
      // toggleShortlist
      .addCase(toggleShortlist.fulfilled, (state, action) => {
        const { candidateId } = action.payload;
        state.candidates = state.candidates.map((c) =>
          (c._id === candidateId || c.id === candidateId)
            ? { ...c, isShortlisted: !c.isShortlisted }
            : c
        );
        if (
          state.selectedCandidate &&
          (state.selectedCandidate._id === candidateId || state.selectedCandidate.id === candidateId)
        ) {
          state.selectedCandidate.isShortlisted = !state.selectedCandidate.isShortlisted;
        }
      });
  },
});

export const { clearEmployerError, setEmployerData } = employerSlice.actions;
export const {
  setFilters,
  clearFilters,
  setPage,
  clearSelectedCandidate,
  clearEmployerError,
} = employerSlice.actions;

export const selectEmployer = (state) => state.employer;
export const selectCandidates = (state) => state.employer.candidates;
export const selectSelectedCandidate = (state) => state.employer.selectedCandidate;
export const selectEmployerFilters = (state) => state.employer.filters;
export const selectEmployerPagination = (state) => state.employer.pagination;
export const selectEmployerLoading = (state) => state.employer.loading;
export const selectEmployerActionLoading = (state) => state.employer.actionLoading;
export const selectEmployerError = (state) => state.employer.error;

export default employerSlice.reducer;

