import { Router } from 'express';
import skillGapController from './skillGap.controller.js';

const router = Router();

// Calculate skill gap vs target industry role
router.get('/analysis', skillGapController.getSkillGapHandler);

// Generate personalized adaptive path to close gap
router.get('/adaptive-path', skillGapController.getAdaptivePathHandler);

export default router;
