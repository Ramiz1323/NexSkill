import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTrainerProgramsApi,
  getTrainerProgramByIdApi,
  enrollTrainerProgramApi,
  unenrollTrainerProgramApi,
  getEnrolledProgramsApi,
  getTrainerCertificationsApi,
} from '../../api/trainerDevApi';

export const fetchTrainerPrograms = createAsyncThunk(
  'trainer/fetchTrainerPrograms',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await getTrainerProgramsApi(filters);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch trainer upskilling programs.'
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

export const enrollTrainer = createAsyncThunk(
  'trainer/enrollTrainer',
  async (enrollmentData, { rejectWithValue }) => {
    try {
      const data = await enrollTrainerProgramApi(enrollmentData);
      const programId = typeof enrollmentData === 'string' ? enrollmentData : enrollmentData.programId;
      return { programId, data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to enroll in trainer program.'
      );
    }
  }
);

export const enrollTrainerProgram = enrollTrainer;

export const unenrollTrainer = createAsyncThunk(
  'trainer/unenrollTrainer',
  async (enrollmentData, { rejectWithValue }) => {
    try {
      const data = await unenrollTrainerProgramApi(enrollmentData);
      const programId = typeof enrollmentData === 'string' ? enrollmentData : enrollmentData.programId;
      return { programId, data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to unenroll from trainer program.'
      );
    }
  }
);

export const unenrollTrainerProgram = unenrollTrainer;

export const fetchEnrolledPrograms = createAsyncThunk(
  'trainer/fetchEnrolledPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEnrolledProgramsApi();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch enrolled programs'
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
    setTrainerData: (state, action) => {
      state.programs = action.payload.programs || action.payload || [];
      state.selectedProgram = action.payload.selectedProgram || null;
      state.loading = false;
      state.error = null;
    },
    setSelectedProgram: (state, action) => {
      state.selectedProgram = action.payload;
    },
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
        const programsList = Array.isArray(payload) ? payload : payload.programs || [];
        state.programs = programsList;

        // Automatically sync enrolled programs from MongoDB
        const enrolled = programsList.filter((p) => p.isEnrolled);
        const map = new Map();
        (state.enrolledPrograms || []).forEach((p) => {
          const id = String(p._id || p.id);
          if (id) map.set(id, p);
        });
        enrolled.forEach((p) => {
          const id = String(p._id || p.id);
          if (id) map.set(id, { ...(map.get(id) || {}), ...p, isEnrolled: true });
        });
        state.enrolledPrograms = Array.from(map.values());
      })
      .addCase(fetchTrainerPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchEnrolledPrograms
      .addCase(fetchEnrolledPrograms.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const list = Array.isArray(payload) ? payload : payload.programs || [];
        const map = new Map();
        list.forEach((p) => {
          const id = String(p._id || p.id);
          if (id) map.set(id, { ...p, isEnrolled: true });
        });
        (state.enrolledPrograms || []).forEach((p) => {
          const id = String(p._id || p.id);
          if (id && !map.has(id)) map.set(id, p);
        });
        state.enrolledPrograms = Array.from(map.values());
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
      // enrollTrainer
      .addCase(enrollTrainer.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(enrollTrainer.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { programId, data } = action.payload || {};
        if (programId) {
          const idStr = String(programId);
          const progFromState = state.programs.find((p) => String(p._id || p.id) === idStr);
          const enrolledItem = {
            ...(progFromState || {}),
            ...(data?.program || {}),
            isEnrolled: true,
            enrolledAt: data?.program?.enrolledAt || new Date().toISOString(),
          };

          const map = new Map();
          map.set(idStr, enrolledItem);
          state.enrolledPrograms.forEach((p) => {
            const id = String(p._id || p.id);
            if (id && !map.has(id)) map.set(id, p);
          });
          state.enrolledPrograms = Array.from(map.values());

          state.programs = state.programs.map((p) =>
            String(p._id || p.id) === idStr ? { ...p, isEnrolled: true } : p
          );

          if (
            state.selectedProgram &&
            String(state.selectedProgram._id || state.selectedProgram.id) === idStr
          ) {
            state.selectedProgram = { ...state.selectedProgram, isEnrolled: true };
          }
        }
      })
      .addCase(enrollTrainer.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // unenrollTrainer
      .addCase(unenrollTrainer.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(unenrollTrainer.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { programId } = action.payload || {};
        if (programId) {
          const idStr = String(programId);
          state.enrolledPrograms = state.enrolledPrograms.filter(
            (p) => String(p._id || p.id) !== idStr
          );
          state.programs = state.programs.map((p) =>
            String(p._id || p.id) === idStr ? { ...p, isEnrolled: false } : p
          );
          if (
            state.selectedProgram &&
            String(state.selectedProgram._id || state.selectedProgram.id) === idStr
          ) {
            state.selectedProgram = { ...state.selectedProgram, isEnrolled: false };
          }
        }
      })
      .addCase(unenrollTrainer.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // fetchTrainerCertifications
      .addCase(fetchTrainerCertifications.fulfilled, (state, action) => {
        const payload = action.payload || {};
        state.certifications = Array.isArray(payload) ? payload : payload.certifications || [];
      });
  },
});

export const {
  setTrainerData,
  setSelectedProgram,
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
