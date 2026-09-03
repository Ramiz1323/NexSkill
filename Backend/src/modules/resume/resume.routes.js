import { Router } from 'express';
import resumeController from './resume.controller.js';
import upload from '../../middleware/upload.middleware.js';

const router = Router();

// Upload and analyze resume with Multer
router.post('/analyze', upload.single('resume'), resumeController.uploadAndAnalyzeResumeHandler);

export default router;
