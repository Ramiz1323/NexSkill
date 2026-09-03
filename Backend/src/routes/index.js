import { Router } from 'express';
import ApiResponse from '../utils/ApiResponse.js';

import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/users/user.routes.js';
import studentRoutes from '../modules/students/student.routes.js';
import skillRoutes from '../modules/skills/skill.routes.js';
import skillProfileRoutes from '../modules/skillProfiles/skillProfile.routes.js';
import assessmentRoutes from '../modules/assessments/assessment.routes.js';
import skillGapRoutes from '../modules/skillGaps/skillGap.routes.js';
import readinessRoutes from '../modules/readiness/readiness.routes.js';
import resumeRoutes from '../modules/resume/resume.routes.js';
import curriculumRoutes from './curriculumRoutes.js';
import { employerRoutes } from '../modules/employers/index.js';
import { jobRoutes } from '../modules/jobs/index.js';
import { applicationRoutes } from '../modules/applications/index.js';
import { placementRoutes } from '../modules/placement/index.js';
import { courseRoutes } from '../modules/courses/index.js';
import { roadmapRoutes } from '../modules/roadmap/index.js';
import { learningRoutes } from '../modules/learning/index.js';
import { labourMarketRoutes } from '../modules/labourMarket/index.js';
import { emergingSkillsRoutes } from '../modules/emergingSkills/index.js';
import { aiRoutes } from '../modules/ai/index.js';
import { analyticsRoutes } from '../modules/analytics/index.js';

// Dedicated Frontend-to-Backend Domain Bridge Routers
import marketIntelligenceRoutes from './marketIntelligenceRoutes.js';
import demandForecastRoutes from './demandForecastRoutes.js';
import careerGuidanceRoutes from './careerGuidanceRoutes.js';
import trainerRoutes from './trainerRoutes.js';
import employerCustomRoutes from './employerRoutes.js';
import progressRoutes from './progressRoutes.js';

const router = Router();

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
        modulesCount: 21,
      },
      'API Service is healthy'
    )
  );
});

// Auth & Users
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Students, Diagnostics & Progress
router.use('/students', studentRoutes);
router.use('/skills', skillRoutes);
router.use('/skill-profiles', skillProfileRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/progress', progressRoutes);

// Intelligence Loops & Resume ATS
router.use('/skill-gaps', skillGapRoutes);
router.use('/readiness', readinessRoutes);
router.use('/resume', resumeRoutes);
router.use('/curriculum', curriculumRoutes);


// Employers, Jobs, Applications & Placement
router.use('/employer', employerCustomRoutes);
router.use('/employers', employerRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/placement', placementRoutes);

// Courses, Roadmap & Learning
router.use('/courses', courseRoutes);
router.use('/roadmap', roadmapRoutes);
router.use('/learning', learningRoutes);

// Labour Market Intelligence & Emerging Skills
router.use('/market-intelligence', marketIntelligenceRoutes);
router.use('/demand-forecast', demandForecastRoutes);
router.use('/labour-market', labourMarketRoutes);
router.use('/emerging-skills', emergingSkillsRoutes);

// AI Career Recommendations & Analytics
router.use('/career-guidance', careerGuidanceRoutes);
router.use('/career', careerGuidanceRoutes);
router.use('/trainer', trainerRoutes);
router.use('/ai', aiRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
