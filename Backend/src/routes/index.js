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

// Phase 2 - 4 Future Mount Points
// router.use('/students', studentRoutes);
// router.use('/skills', skillRoutes);
// router.use('/assessments', assessmentRoutes);
// router.use('/roadmap', roadmapRoutes);
// router.use('/courses', courseRoutes);
// router.use('/progress', progressRoutes);
// router.use('/jobs', jobRoutes);
// router.use('/employers', employerRoutes);
// router.use('/applications', applicationRoutes);
// router.use('/matching', matchingRoutes);
// router.use('/feedback', feedbackRoutes);
// router.use('/intelligence', intelligenceRoutes);

export default router;
