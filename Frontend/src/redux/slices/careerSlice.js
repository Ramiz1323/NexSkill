import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCareerRecommendationsApi,
  getCareerTracksApi,
  getCareerPathwayByIdApi,
  generateCustomCareerPathApi,
  getRoadmapForRoleApi,
  askCareerAdvisorApi,
} from '../../api/careerGuidanceApi';

export const fetchCareerTracks = createAsyncThunk(
  'career/fetchCareerTracks',
  async (params = {}, { rejectWithValue }) => {
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
      );
    }
  }
);

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

export const sendAdvisorMessage = createAsyncThunk(
  'career/sendAdvisorMessage',
  async ({ prompt, context }, { rejectWithValue }) => {
    try {
      const data = await askCareerAdvisorApi(prompt, context);
      return { prompt, response: data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to get response from AI advisor'
      );
    }
  }
);

const initialState = {
  tracks: [],
  recommendations: [],
  selectedRole: null,
  selectedTrack: null,
  roadmap: null,
  chatHistory: [],
  targetDomain: '',
  loading: false,
  roadmapLoading: false,
  chatLoading: false,
  error: null,
};

const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {
    setCareerData: (state, action) => {
      state.tracks = action.payload.tracks || [];
      state.selectedTrack = action.payload.selectedTrack || state.tracks[0] || null;
      state.loading = false;
      state.error = null;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setSelectedTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },
    setTargetDomain: (state, action) => {
      state.targetDomain = action.payload;
    },
    clearRoadmap: (state) => {
      state.roadmap = null;
      state.selectedRole = null;
    },
    clearChatHistory: (state) => {
      state.chatHistory = [];
    },
    clearCareerError: (state) => {
      state.error = null;
    },
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
        const payload = action.payload || {};
        state.tracks = Array.isArray(payload) ? payload : payload.tracks || [];
        if (!state.selectedTrack && state.tracks.length > 0) {
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
      })
      // fetchCareerRecommendations
      .addCase(fetchCareerRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareerRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        state.recommendations = Array.isArray(payload) ? payload : payload.recommendations || [];
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
        state.roadmap = payload.roadmap || payload;
      })
      .addCase(fetchRoleRoadmap.rejected, (state, action) => {
        state.roadmapLoading = false;
        state.error = action.payload;
      })
      // sendAdvisorMessage
      .addCase(sendAdvisorMessage.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(sendAdvisorMessage.fulfilled, (state, action) => {
        state.chatLoading = false;
        const { prompt, response } = action.payload;
        state.chatHistory.push(
          { sender: 'user', text: prompt, timestamp: new Date().toISOString() },
          {
            sender: 'advisor',
            text: response.reply || response.message || response,
            timestamp: new Date().toISOString(),
          }
        );
      })
      .addCase(sendAdvisorMessage.rejected, (state, action) => {
        state.chatLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCareerData,
  setSelectedRole,
  setSelectedTrack,
  setTargetDomain,
  clearRoadmap,
  clearChatHistory,
  clearCareerError,
} = careerSlice.actions;

export const selectCareer = (state) => state.career;
export const selectCareerRecommendations = (state) => state.career.recommendations;
export const selectSelectedRole = (state) => state.career.selectedRole;
export const selectCareerRoadmap = (state) => state.career.roadmap;
export const selectCareerChatHistory = (state) => state.career.chatHistory;
export const selectTargetDomain = (state) => state.career.targetDomain;
export const selectCareerLoading = (state) => state.career.loading;
export const selectRoadmapLoading = (state) => state.career.roadmapLoading;
export const selectChatLoading = (state) => state.career.chatLoading;
export const selectCareerError = (state) => state.career.error;

export default careerSlice.reducer;
