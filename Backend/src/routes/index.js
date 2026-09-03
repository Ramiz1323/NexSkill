import { Router } from 'express';
import { employerRoutes } from '../modules/employers/index.js';
import { jobRoutes } from '../modules/jobs/index.js';
import { applicationRoutes } from '../modules/applications/index.js';
import { placementRoutes } from '../modules/placement/index.js';
import { courseRoutes } from '../modules/courses/index.js';
import { curriculumRoutes } from '../modules/curriculum/index.js';
import { roadmapRoutes } from '../modules/roadmap/index.js';
import { learningRoutes } from '../modules/learning/index.js';
import { labourMarketRoutes } from '../modules/labourMarket/index.js';
import { emergingSkillsRoutes } from '../modules/emergingSkills/index.js';
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

// Phase 9: Labour Market Intelligence & Emerging Skills
router.use('/labour-market', labourMarketRoutes);
router.use('/emerging-skills', emergingSkillsRoutes);

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
  labourMarketRoutes,
  emergingSkillsRoutes,
};

export default router;
