import { configureStore } from '@reduxjs/toolkit';
import marketReducer from './slices/marketSlice';
import curriculumReducer from './slices/curriculumSlice';

export const store = configureStore({
  reducer: {
    market: marketReducer,
    curriculum: curriculumReducer,
  },
});

export default store;
