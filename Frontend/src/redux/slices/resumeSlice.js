import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyzeResumeApi } from '../../api/resumeAnalyzerApi';

export const analyzeResume = createAsyncThunk(
  'resume/analyzeResume',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await analyzeResumeApi(formData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Resume analysis failed. Please try again.'
      );
    }
  }
);

const initialState = {
  resumeData: null,
  atsScore: null,
  skillGaps: [],
  matchedKeywords: [],
  suggestions: [],
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeAnalysis: (state, action) => {
      state.resumeData = action.payload.resumeData || null;
      state.atsScore = action.payload.atsScore || null;
      state.skillGaps = action.payload.skillGaps || [];
      state.matchedKeywords = action.payload.matchedKeywords || [];
      state.suggestions = action.payload.suggestions || [];
      state.loading = false;
      state.error = null;
    },
    clearResumeError: (state) => {
      state.error = null;
    },
    resetResumeState: (state) => {
      state.resumeData = null;
      state.atsScore = null;
      state.skillGaps = [];
      state.matchedKeywords = [];
      state.suggestions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumeData = action.payload.resumeData || action.payload;
        state.atsScore = action.payload.atsScore !== undefined ? action.payload.atsScore : null;
        state.skillGaps = action.payload.skillGaps || [];
        state.matchedKeywords = action.payload.matchedKeywords || [];
        state.suggestions = action.payload.suggestions || [];
        state.error = null;
      })
      .addCase(analyzeResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setResumeAnalysis, clearResumeError, resetResumeState } = resumeSlice.actions;
export default resumeSlice.reducer;
