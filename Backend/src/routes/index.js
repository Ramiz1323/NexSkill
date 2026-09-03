import { Router } from 'express';
import ApiResponse from '../utils/ApiResponse.js';

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
      },
      'API Service is healthy'
    )
  );
});

// Domain Routes Mount Points (Ready for Phase 1 - 4)
// router.use('/auth', authRoutes);
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
