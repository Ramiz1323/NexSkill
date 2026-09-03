import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modules: [],
  activeCurriculum: null,
  loading: false,
  error: null,
};

const curriculumSlice = createSlice({
  name: 'curriculum',
  initialState,
  reducers: {
    setCurriculumData: (state, action) => {
      state.modules = action.payload.modules || [];
      state.activeCurriculum = action.payload.activeCurriculum || null;
      state.loading = false;
      state.error = null;
    },
    setCurriculumLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurriculumError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCurriculumData, setCurriculumLoading, setCurriculumError } = curriculumSlice.actions;
export default curriculumSlice.reducer;
