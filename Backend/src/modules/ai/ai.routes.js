import { Router } from 'express';
import {
  handleCalculateMatch,
  handleRecommendJobs,
  handleRecommendCareerPaths,
  handleGetRecommendationHistory,
} from './ai.controller.js';

const router = Router();

router.route('/match')
  .post(handleCalculateMatch);

router.route('/recommend-jobs')
  .post(handleRecommendJobs);

router.route('/career-paths')
  .post(handleRecommendCareerPaths);

router.route('/history/:candidateId')
  .get(handleGetRecommendationHistory);

export default router;
