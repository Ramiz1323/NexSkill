import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSkillDemandForecast,
  getEmergingTechRoles,
  getAutomationImpactAnalysis,
} from '../../api/demandForecastApi';

export const fetchSkillForecast = createAsyncThunk(
  'demand/fetchSkillForecast',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getSkillDemandForecast(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmergingRoles = createAsyncThunk(
  'demand/fetchEmergingRoles',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getEmergingTechRoles(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAutomationAnalysis = createAsyncThunk(
  'demand/fetchAutomationAnalysis',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getAutomationImpactAnalysis(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  projections: [],
  emergingRoles: [],
  automationIndex: [],
  forecastHorizon: '5Y',
  forecasts: [],
  emergingSkills: [],
  loading: false,
  error: null,
};

const demandSlice = createSlice({
  name: 'demand',
  initialState,
  reducers: {
    setForecastHorizon: (state, action) => {
      state.forecastHorizon = action.payload;
    },
    clearDemandErrors: (state) => {
      state.error = null;
    },
    setDemandData: (state, action) => {
      state.forecasts = action.payload.forecasts || [];
      state.emergingSkills = action.payload.emergingSkills || [];
      state.projections = action.payload.projections || [];
      state.emergingRoles = action.payload.emergingRoles || [];
      state.automationIndex = action.payload.automationIndex || [];
      state.loading = false;
      state.error = null;
    },
    setDemandLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDemandError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Skill Forecast Projections
      .addCase(fetchSkillForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.projections = action.payload;
      })
      .addCase(fetchSkillForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Emerging Roles
      .addCase(fetchEmergingRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmergingRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.emergingRoles = action.payload;
      })
      .addCase(fetchEmergingRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Automation Impact Analysis
      .addCase(fetchAutomationAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAutomationAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.automationIndex = action.payload;
      })
      .addCase(fetchAutomationAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setForecastHorizon,
  clearDemandErrors,
  setDemandData,
  setDemandLoading,
  setDemandError,
} = demandSlice.actions;
export const { setForecastHorizon, clearDemandErrors } = demandSlice.actions;

export default demandSlice.reducer;

