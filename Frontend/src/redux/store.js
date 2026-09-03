import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import resumeReducer from './slices/resumeSlice';
import progressReducer from './slices/progressSlice';
import marketReducer from './slices/marketSlice';
import curriculumReducer from './slices/curriculumSlice';
import demandReducer from './slices/demandSlice';
import employerReducer from './slices/employerSlice';
import careerReducer from './slices/careerSlice';
import trainerReducer from './slices/trainerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    progress: progressReducer,
    market: marketReducer,
    curriculum: curriculumReducer,
    demand: demandReducer,
    employer: employerReducer,
    career: careerReducer,
    trainer: trainerReducer,
  },
});

export default store;
