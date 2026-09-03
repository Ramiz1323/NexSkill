import { Router } from 'express';
import studentController from './student.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';
import requireRoles from '../../middleware/role.middleware.js';

const router = Router();

router.use(authMiddleware);

// Student personal profile
router.get('/me', studentController.getMyProfileHandler);
router.put('/me', studentController.updateMyProfileHandler);

// View all profiles (For Employers, Admins, Trainers)
router.get('/', requireRoles(['ADMIN', 'EMPLOYER', 'TRAINER']), studentController.getAllStudentProfilesHandler);

// View student profile by userId
router.get('/:userId', studentController.getStudentProfileByIdHandler);

export default router;
