import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  programs: [],
  certifications: [],
  loading: false,
  error: null,
};

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    setTrainerData: (state, action) => {
      state.programs = action.payload.programs || [];
      state.certifications = action.payload.certifications || [];
      state.loading = false;
      state.error = null;
    },
    setTrainerLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTrainerError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTrainerData, setTrainerLoading, setTrainerError } = trainerSlice.actions;
export default trainerSlice.reducer;
