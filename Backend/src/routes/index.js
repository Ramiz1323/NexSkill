import { Router } from 'express';
import { employerRoutes } from '../modules/employers/index.js';
import { jobRoutes } from '../modules/jobs/index.js';
import { applicationRoutes } from '../modules/applications/index.js';
import { placementRoutes } from '../modules/placement/index.js';
import healthRoutes from './health.routes.js';

const router = Router();

// Register Health & Phase 5/11 Routes
router.use('/', healthRoutes);
router.use('/employers', employerRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/placement', placementRoutes);

export {
  router as masterRouter,
  employerRoutes,
  jobRoutes,
  applicationRoutes,
  placementRoutes,
};

export default router;
