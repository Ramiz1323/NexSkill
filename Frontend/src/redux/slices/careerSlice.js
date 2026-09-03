import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recommendations: [],
  careerPath: null,
  loading: false,
  error: null,
};

const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {
    setCareerData: (state, action) => {
      state.recommendations = action.payload.recommendations || [];
      state.careerPath = action.payload.careerPath || null;
      state.loading = false;
      state.error = null;
    },
    setCareerLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCareerError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCareerData, setCareerLoading, setCareerError } = careerSlice.actions;
export default careerSlice.reducer;
