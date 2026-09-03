import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCareerRecommendationsApi,
  getRoadmapForRoleApi,
  askCareerAdvisorApi,
} from '../../api/careerGuidanceApi';

export const fetchCareerRecommendations = createAsyncThunk(
  'career/fetchCareerRecommendations',
  async (profileData = {}, { rejectWithValue }) => {
    try {
      const data = await getCareerRecommendationsApi(profileData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch career recommendations'
      );
    }
  }
);

export const fetchRoleRoadmap = createAsyncThunk(
  'career/fetchRoleRoadmap',
  async (roleId, { rejectWithValue }) => {
    try {
      const data = await getRoadmapForRoleApi(roleId);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch role roadmap'
      );
    }
  }
);

export const sendCareerAdvisorMessage = createAsyncThunk(
  'career/sendCareerAdvisorMessage',
  async ({ prompt, context = {} }, { dispatch, rejectWithValue }) => {
    try {
      // Optimistically record user prompt in chat
      dispatch(
        addChatMessage({
          role: 'user',
          text: prompt,
          timestamp: new Date().toISOString(),
        })
      );
      const data = await askCareerAdvisorApi(prompt, context);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to get advisor response'
      );
    }
  }
);

const initialState = {
  recommendations: [],
  activeRoadmap: null,
  chatHistory: [],
  filters: {
    targetDomain: '',
    experienceLevel: '',
  },
  loading: false,
  chatLoading: false,
  roadmapLoading: false,
  error: null,
};

const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {
    setCareerFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearActiveRoadmap: (state) => {
      state.activeRoadmap = null;
    },
    clearChatHistory: (state) => {
      state.chatHistory = [];
    },
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
    clearCareerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCareerRecommendations
      .addCase(fetchCareerRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareerRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        state.recommendations = Array.isArray(payload)
          ? payload
          : payload.recommendations || [];
      })
      .addCase(fetchCareerRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchRoleRoadmap
      .addCase(fetchRoleRoadmap.pending, (state) => {
        state.roadmapLoading = true;
        state.error = null;
      })
      .addCase(fetchRoleRoadmap.fulfilled, (state, action) => {
        state.roadmapLoading = false;
        const payload = action.payload || {};
        state.activeRoadmap = payload.roadmap || payload;
      })
      .addCase(fetchRoleRoadmap.rejected, (state, action) => {
        state.roadmapLoading = false;
        state.error = action.payload;
      })
      // sendCareerAdvisorMessage
      .addCase(sendCareerAdvisorMessage.pending, (state) => {
        state.chatLoading = true;
        state.error = null;
      })
      .addCase(sendCareerAdvisorMessage.fulfilled, (state, action) => {
        state.chatLoading = false;
        const payload = action.payload || {};
        const replyText =
          typeof payload === 'string'
            ? payload
            : payload.reply || payload.response || payload.message || 'No response returned.';
        state.chatHistory.push({
          role: 'assistant',
          text: replyText,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(sendCareerAdvisorMessage.rejected, (state, action) => {
        state.chatLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCareerFilters,
  clearActiveRoadmap,
  clearChatHistory,
  addChatMessage,
  clearCareerError,
} = careerSlice.actions;

export const selectCareer = (state) => state.career;
export const selectCareerRecommendations = (state) => state.career.recommendations;
export const selectActiveRoadmap = (state) => state.career.activeRoadmap;
export const selectChatHistory = (state) => state.career.chatHistory;
export const selectCareerFilters = (state) => state.career.filters;
export const selectCareerLoading = (state) => state.career.loading;
export const selectChatLoading = (state) => state.career.chatLoading;
export const selectRoadmapLoading = (state) => state.career.roadmapLoading;
export const selectCareerError = (state) => state.career.error;

export default careerSlice.reducer;
