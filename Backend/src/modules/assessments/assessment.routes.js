import { Router } from 'express';
import assessmentController from './assessment.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';
import requireRoles from '../../middleware/role.middleware.js';

const router = Router();

router.use(authMiddleware);

// Browse test catalog
router.get('/', assessmentController.getAssessmentsHandler);

// Student's personal test result history
router.get('/history', assessmentController.getMyHistoryHandler);

// View single assessment questions (without answer keys)
router.get('/:id', assessmentController.getAssessmentByIdHandler);

// Submit answers and receive evaluated score + skill upgrade
router.post('/:id/submit', assessmentController.submitAssessmentHandler);

// Admin / Trainer creates an assessment
router.post('/', requireRoles(['ADMIN', 'TRAINER']), assessmentController.createAssessmentHandler);

export default router;
