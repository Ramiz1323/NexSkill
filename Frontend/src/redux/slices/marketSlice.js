import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  marketData: [],
  trends: [],
  loading: false,
  error: null,
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketData: (state, action) => {
      state.marketData = action.payload.marketData || [];
      state.trends = action.payload.trends || [];
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
});

export const { setMarketData, setMarketLoading, setMarketError } = marketSlice.actions;
export default marketSlice.reducer;
