import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTrainerProgramsApi,
  getTrainerProgramByIdApi,
  enrollTrainerInProgramApi,
  enrollTrainerProgramApi,
  getTrainerCertificationsApi,
} from '../../api/trainerDevApi';

export const fetchTrainerPrograms = createAsyncThunk(
  'trainer/fetchTrainerPrograms',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getTrainerProgramsApi(params);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch trainer upskilling programs.'
      );
    }
  }
);

export const enrollTrainer = createAsyncThunk(
  'trainer/enrollTrainer',
  async (enrollmentData, { rejectWithValue }) => {
    try {
      const data = await enrollTrainerInProgramApi(enrollmentData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to enroll in trainer program.'
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await getTrainerProgramsApi(filters);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch trainer programs'
      );
    }
  }
);

export const fetchTrainerProgramDetails = createAsyncThunk(
  'trainer/fetchTrainerProgramDetails',
  async (programId, { rejectWithValue }) => {
    try {
      const data = await getTrainerProgramByIdApi(programId);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch program details'
      );
    }
  }
);

export const enrollTrainerProgram = createAsyncThunk(
  'trainer/enrollTrainerProgram',
  async (programId, { rejectWithValue }) => {
    try {
      const data = await enrollTrainerProgramApi(programId);
      return { programId, data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to enroll in trainer program'
      );
    }
  }
);

export const fetchTrainerCertifications = createAsyncThunk(
  'trainer/fetchTrainerCertifications',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTrainerCertificationsApi();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch trainer certifications'
      );
    }
  }
);

const initialState = {
  programs: [],
  selectedProgram: null,
  certifications: [],
  enrolledPrograms: [],
  filters: {
    category: '',
    mode: '',
    search: '',
  },
  loading: false,
  actionLoading: false,
  error: null,
};

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    clearTrainerError: (state) => {
      state.error = null;
    },
    setSelectedProgram: (state, action) => {
      state.selectedProgram = action.payload;
    },
    setTrainerData: (state, action) => {
      state.programs = action.payload.programs || action.payload || [];
      state.selectedProgram = action.payload.selectedProgram || null;
      state.loading = false;
      state.error = null;
    setTrainerFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearTrainerFilters: (state) => {
      state.filters = {
        category: '',
        mode: '',
        search: '',
      };
    },
    clearSelectedProgram: (state) => {
      state.selectedProgram = null;
    },
    clearTrainerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTrainerPrograms
      .addCase(fetchTrainerPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerPrograms.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        state.programs = Array.isArray(payload) ? payload : payload.programs || [];
      })
      .addCase(fetchTrainerPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchTrainerProgramDetails
      .addCase(fetchTrainerProgramDetails.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(fetchTrainerProgramDetails.fulfilled, (state, action) => {
        state.actionLoading = false;
        const payload = action.payload || {};
        state.selectedProgram = payload.program || payload;
      })
      .addCase(fetchTrainerProgramDetails.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // enrollTrainerProgram
      .addCase(enrollTrainerProgram.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(enrollTrainerProgram.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { programId, data } = action.payload;
        const enrolledItem = data.program || { id: programId, enrolledAt: new Date().toISOString() };
        if (!state.enrolledPrograms.some((p) => (p.id === programId || p._id === programId))) {
          state.enrolledPrograms.push(enrolledItem);
        }
        state.programs = state.programs.map((p) =>
          (p._id === programId || p.id === programId) ? { ...p, isEnrolled: true } : p
        );
        if (state.selectedProgram && (state.selectedProgram._id === programId || state.selectedProgram.id === programId)) {
          state.selectedProgram.isEnrolled = true;
        }
      })
      .addCase(enrollTrainerProgram.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // fetchTrainerCertifications
      .addCase(fetchTrainerCertifications.fulfilled, (state, action) => {
        const payload = action.payload || {};
        state.certifications = Array.isArray(payload) ? payload : payload.certifications || [];
      });
  },
  extraReducers: (builder) => {
    builder
      // fetchTrainerPrograms
      .addCase(fetchTrainerPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = Array.isArray(action.payload)
          ? action.payload
          : action.payload.programs || [];
      })
      .addCase(fetchTrainerPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // enrollTrainer
      .addCase(enrollTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollTrainer.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(enrollTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTrainerError, setSelectedProgram, setTrainerData } = trainerSlice.actions;
export const {
  setTrainerFilters,
  clearTrainerFilters,
  clearSelectedProgram,
  clearTrainerError,
} = trainerSlice.actions;

export const selectTrainer = (state) => state.trainer;
export const selectTrainerPrograms = (state) => state.trainer.programs;
export const selectSelectedProgram = (state) => state.trainer.selectedProgram;
export const selectTrainerCertifications = (state) => state.trainer.certifications;
export const selectEnrolledPrograms = (state) => state.trainer.enrolledPrograms;
export const selectTrainerFilters = (state) => state.trainer.filters;
export const selectTrainerLoading = (state) => state.trainer.loading;
export const selectTrainerActionLoading = (state) => state.trainer.actionLoading;
export const selectTrainerError = (state) => state.trainer.error;

export default trainerSlice.reducer;

