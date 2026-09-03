import { Router } from 'express';
import skillProfileController from './skillProfile.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Logged-in student's skill profile
router.get('/me', skillProfileController.getMySkillsHandler);
router.post('/me', skillProfileController.upsertMySkillHandler);
router.delete('/me/:skillId', skillProfileController.deleteMySkillHandler);

// Public / Employer query by student user ID
router.get('/student/:studentId', skillProfileController.getSkillsByStudentIdHandler);

export default router;
