import { Router } from 'express';
import readinessController from './readiness.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Logged-in student's readiness calculation
router.get('/me', readinessController.getMyReadinessHandler);

// Admin / Employer check by student user ID
router.get('/:studentId', readinessController.getStudentReadinessHandler);

export default router;
