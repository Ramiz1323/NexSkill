import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMarketDemandTrends,
  getIndustrySkillDistribution,
  getLabourMarketSummary,
} from '../../api/marketIntelligenceApi';

export const fetchMarketDemandTrends = createAsyncThunk(
  'market/fetchMarketDemandTrends',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getMarketDemandTrends(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSkillDistribution = createAsyncThunk(
  'market/fetchSkillDistribution',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getIndustrySkillDistribution(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMarketSummary = createAsyncThunk(
  'market/fetchMarketSummary',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getLabourMarketSummary(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  demandTrends: [],
  skillDistribution: [],
  summary: {},
  filters: {
    industry: 'All',
    region: 'All',
    timeframe: '1Y',
  },
  loading: false,
  error: null,
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setIndustryFilter: (state, action) => {
      state.filters.industry = action.payload;
    },
    setRegionFilter: (state, action) => {
      state.filters.region = action.payload;
    },
    setTimeframeFilter: (state, action) => {
      state.filters.timeframe = action.payload;
    },
    clearMarketErrors: (state) => {
      state.error = null;
    },
    setMarketData: (state, action) => {
      state.demandTrends = action.payload.demandTrends || action.payload.marketData || [];
      state.skillDistribution = action.payload.skillDistribution || action.payload.trends || [];
      state.summary = action.payload.summary || {};
      state.loading = false;
      state.error = null;
    },
    setMarketLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMarketError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Demand Trends
      .addCase(fetchMarketDemandTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketDemandTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.demandTrends = action.payload;
      })
      .addCase(fetchMarketDemandTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Skill Distribution
      .addCase(fetchSkillDistribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.skillDistribution = action.payload;
      })
      .addCase(fetchSkillDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Market Summary
      .addCase(fetchMarketSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchMarketSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setIndustryFilter,
  setRegionFilter,
  setTimeframeFilter,
  clearMarketErrors,
  setMarketData,
  setMarketLoading,
  setMarketError,
} = marketSlice.actions;

export default marketSlice.reducer;

