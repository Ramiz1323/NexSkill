import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forecasts: [],
  emergingSkills: [],
  loading: false,
  error: null,
};

const demandSlice = createSlice({
  name: 'demand',
  initialState,
  reducers: {
    setDemandData: (state, action) => {
      state.forecasts = action.payload.forecasts || [];
      state.emergingSkills = action.payload.emergingSkills || [];
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
});

export const { setDemandData, setDemandLoading, setDemandError } = demandSlice.actions;
export default demandSlice.reducer;
