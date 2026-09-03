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
      );
    }
  }
);

const initialState = {
  tracks: [],
  selectedTrack: null,
  loading: false,
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
export default careerSlice.reducer;

