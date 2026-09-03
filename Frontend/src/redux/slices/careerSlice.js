import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCareerTracksApi,
  getCareerPathwayByIdApi,
  generateCustomCareerPathApi,
} from '../../api/careerGuidanceApi';

export const fetchCareerTracks = createAsyncThunk(
  'career/fetchCareerTracks',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getCareerTracksApi(params);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch career pathways.'
      );
    }
  }
);

export const generateCustomCareerPath = createAsyncThunk(
  'career/generateCustomCareerPath',
  async (preferences, { rejectWithValue }) => {
    try {
      const data = await generateCustomCareerPathApi(preferences);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to generate career pathway.'
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
  tracks: [],
  selectedTrack: null,
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
    clearCareerError: (state) => {
      state.error = null;
    },
    setSelectedTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },
    setCareerData: (state, action) => {
      state.tracks = action.payload.tracks || action.payload || [];
      state.selectedTrack = action.payload.selectedTrack || null;
      state.loading = false;
      state.error = null;
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
  extraReducers: (builder) => {
    builder
      // fetchCareerTracks
      .addCase(fetchCareerTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareerTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = Array.isArray(action.payload)
          ? action.payload
          : action.payload.tracks || [];
        if (state.tracks.length > 0 && !state.selectedTrack) {
          state.selectedTrack = state.tracks[0];
        }
      })
      .addCase(fetchCareerTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // generateCustomCareerPath
      .addCase(generateCustomCareerPath.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateCustomCareerPath.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTrack = action.payload;
      })
      .addCase(generateCustomCareerPath.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCareerError, setSelectedTrack, setCareerData } = careerSlice.actions;
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

