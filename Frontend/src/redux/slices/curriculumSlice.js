import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getIndustryCurriculums,
  getCurriculumById,
  getStudentSkillGap,
  getDynamicLearningPath,
  submitCurriculumFeedback,
} from '../../api/curriculumApi';

export const fetchIndustryCurriculums = createAsyncThunk(
  'curriculum/fetchIndustryCurriculums',
  async (query, { rejectWithValue }) => {
    try {
      const data = await getIndustryCurriculums(query);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurriculumById = createAsyncThunk(
  'curriculum/fetchCurriculumById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getCurriculumById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSkillGapAnalysis = createAsyncThunk(
  'curriculum/fetchSkillGapAnalysis',
  async ({ studentId, targetRole }, { rejectWithValue }) => {
    try {
      const data = await getStudentSkillGap(studentId, targetRole);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAdaptiveLearningPath = createAsyncThunk(
  'curriculum/fetchAdaptiveLearningPath',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getDynamicLearningPath(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postCurriculumFeedback = createAsyncThunk(
  'curriculum/postCurriculumFeedback',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await submitCurriculumFeedback(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  curriculums: [],
  selectedCurriculum: null,
  skillGapData: {
    requiredSkills: [],
    currentSkills: [],
    gapPercentage: 0,
  },
  adaptiveRoadmap: [],
  feedbackStatus: {
    submitting: false,
    success: false,
    error: null,
  },
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modules: [],
  activeCurriculum: null,
  loading: false,
  error: null,
};

const curriculumSlice = createSlice({
  name: 'curriculum',
  initialState,
  reducers: {
    setSelectedCurriculum: (state, action) => {
      state.selectedCurriculum = action.payload;
    },
    resetFeedbackStatus: (state) => {
      state.feedbackStatus = {
        submitting: false,
        success: false,
        error: null,
      };
    },
    clearCurriculumErrors: (state) => {
      state.error = null;
      state.feedbackStatus.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Industry Curriculums
      .addCase(fetchIndustryCurriculums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustryCurriculums.fulfilled, (state, action) => {
        state.loading = false;
        state.curriculums = action.payload;
      })
      .addCase(fetchIndustryCurriculums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Curriculum By Id
      .addCase(fetchCurriculumById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurriculumById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCurriculum = action.payload;
      })
      .addCase(fetchCurriculumById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Skill Gap Analysis
      .addCase(fetchSkillGapAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillGapAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.skillGapData = action.payload;
      })
      .addCase(fetchSkillGapAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Adaptive Learning Path
      .addCase(fetchAdaptiveLearningPath.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdaptiveLearningPath.fulfilled, (state, action) => {
        state.loading = false;
        state.adaptiveRoadmap = action.payload;
      })
      .addCase(fetchAdaptiveLearningPath.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Post Curriculum Feedback
      .addCase(postCurriculumFeedback.pending, (state) => {
        state.feedbackStatus.submitting = true;
        state.feedbackStatus.success = false;
        state.feedbackStatus.error = null;
      })
      .addCase(postCurriculumFeedback.fulfilled, (state) => {
        state.feedbackStatus.submitting = false;
        state.feedbackStatus.success = true;
      })
      .addCase(postCurriculumFeedback.rejected, (state, action) => {
        state.feedbackStatus.submitting = false;
        state.feedbackStatus.error = action.payload;
      });
  },
});

export const {
  setSelectedCurriculum,
  resetFeedbackStatus,
  clearCurriculumErrors,
} = curriculumSlice.actions;

    setCurriculumData: (state, action) => {
      state.modules = action.payload.modules || [];
      state.activeCurriculum = action.payload.activeCurriculum || null;
      state.loading = false;
      state.error = null;
    },
    setCurriculumLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurriculumError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCurriculumData, setCurriculumLoading, setCurriculumError } = curriculumSlice.actions;
export default curriculumSlice.reducer;
