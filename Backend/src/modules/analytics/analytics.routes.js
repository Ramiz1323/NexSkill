import { Router } from 'express';
import {
  handleGetPlatformOverview,
  handleGetSkillDemandAnalytics,
  handleGetPlacementAnalytics,
  handleGetEmployerHiringTrends,
} from './analytics.controller.js';

const router = Router();

router.route('/overview')
  .get(handleGetPlatformOverview);

router.route('/skill-demand')
  .get(handleGetSkillDemandAnalytics);

router.route('/placements')
  .get(handleGetPlacementAnalytics);

router.route('/employer/:employerId')
  .get(handleGetEmployerHiringTrends);

export default router;
