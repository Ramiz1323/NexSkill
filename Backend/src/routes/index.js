import { Router } from 'express';
import { employerRoutes } from '../modules/employers/index.js';
import { jobRoutes } from '../modules/jobs/index.js';
import { applicationRoutes } from '../modules/applications/index.js';
import { placementRoutes } from '../modules/placement/index.js';
import { courseRoutes } from '../modules/courses/index.js';
import { curriculumRoutes } from '../modules/curriculum/index.js';
import { roadmapRoutes } from '../modules/roadmap/index.js';
import { learningRoutes } from '../modules/learning/index.js';
import healthRoutes from './health.routes.js';

const router = Router();

// Health check
router.use('/', healthRoutes);

// Phase 5 & 11: Employers, Jobs, Applications, Placement
router.use('/employers', employerRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/placement', placementRoutes);

// Phase 7: Courses, Curriculum, Roadmap, Learning
router.use('/courses', courseRoutes);
router.use('/curriculum', curriculumRoutes);
router.use('/roadmap', roadmapRoutes);
router.use('/learning', learningRoutes);

export {
  router as masterRouter,
  employerRoutes,
  jobRoutes,
  applicationRoutes,
  placementRoutes,
  courseRoutes,
  curriculumRoutes,
  roadmapRoutes,
  learningRoutes,
};

export default router;
