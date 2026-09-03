import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTrainerProgramsApi,
  getTrainerProgramByIdApi,
  enrollTrainerInProgramApi,
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
      );
    }
  }
);

const initialState = {
  programs: [],
  selectedProgram: null,
  loading: false,
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
export default trainerSlice.reducer;

