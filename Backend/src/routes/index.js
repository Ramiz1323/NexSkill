import { Router } from 'express';
import ApiResponse from '../utils/ApiResponse.js';

const router = Router();

import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/users/user.routes.js';

// Health Check Route
router.get('/health', (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        service: 'NexSkill Backend API',
        status: 'Operational',
      },
      'API Service is healthy'
    )
  );
});

// Phase 1 Domain Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Phase 2 & 3 Domain Routes
import studentRoutes from '../modules/students/student.routes.js';
import skillRoutes from '../modules/skills/skill.routes.js';
import skillProfileRoutes from '../modules/skillProfiles/skillProfile.routes.js';
import assessmentRoutes from '../modules/assessments/assessment.routes.js';

router.use('/students', studentRoutes);
router.use('/skills', skillRoutes);
router.use('/skill-profiles', skillProfileRoutes);
router.use('/assessments', assessmentRoutes);

// Phase 4 Intelligence Loops & Resume ATS
import skillGapRoutes from '../modules/skillGaps/skillGap.routes.js';
import readinessRoutes from '../modules/readiness/readiness.routes.js';
import resumeRoutes from '../modules/resume/resume.routes.js';
import curriculumRoutes from './curriculumRoutes.js';

router.use('/skill-gaps', skillGapRoutes);
router.use('/readiness', readinessRoutes);
router.use('/resume', resumeRoutes);
router.use('/curriculum', curriculumRoutes);
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
import { aiRoutes } from '../modules/ai/index.js';
import { analyticsRoutes } from '../modules/analytics/index.js';
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

// Phase 10: AI Career Recommendation & Platform Analytics
router.use('/ai', aiRoutes);
router.use('/analytics', analyticsRoutes);

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
  aiRoutes,
  analyticsRoutes,
};

export default router;
