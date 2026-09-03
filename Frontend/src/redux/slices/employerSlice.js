import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employers: [],
  jobListings: [],
  loading: false,
  error: null,
};

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    setEmployerData: (state, action) => {
      state.employers = action.payload.employers || [];
      state.jobListings = action.payload.jobListings || [];
      state.loading = false;
      state.error = null;
    },
    setEmployerLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEmployerError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setEmployerData, setEmployerLoading, setEmployerError } = employerSlice.actions;
export default employerSlice.reducer;
