import { configureStore } from '@reduxjs/toolkit';
import marketReducer from './slices/marketSlice';
import curriculumReducer from './slices/curriculumSlice';
import demandReducer from './slices/demandSlice';

export const store = configureStore({
  reducer: {
    market: marketReducer,
    curriculum: curriculumReducer,
    demand: demandReducer,
  },
});

export default store;
