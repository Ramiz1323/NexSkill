import { createSlice } from '@reduxjs/toolkit';

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
    setResumeLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResumeError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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
});

export const { setResumeAnalysis, setResumeLoading, setResumeError, resetResumeState } = resumeSlice.actions;
export default resumeSlice.reducer;
