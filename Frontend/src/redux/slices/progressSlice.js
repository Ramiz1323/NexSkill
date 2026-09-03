import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credentials: [],
  skillProgress: [],
  overallProgress: 0,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgressData: (state, action) => {
      state.credentials = action.payload.credentials || [];
      state.skillProgress = action.payload.skillProgress || [];
      state.overallProgress = action.payload.overallProgress || 0;
      state.loading = false;
      state.error = null;
    },
    addCredential: (state, action) => {
      state.credentials.push(action.payload);
    },
    setProgressLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProgressError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProgressData, addCredential, setProgressLoading, setProgressError } = progressSlice.actions;
export default progressSlice.reducer;
