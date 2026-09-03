import { Router } from 'express';
import skillController from './skill.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';
import requireRoles from '../../middleware/role.middleware.js';

const router = Router();

// Publicly viewable skills catalog
router.get('/', skillController.getSkillsHandler);
router.get('/:id', skillController.getSkillByIdHandler);

// Admin & Trainer skill creation and updates
router.post('/', authMiddleware, requireRoles(['ADMIN', 'TRAINER']), skillController.createSkillHandler);
router.put('/:id', authMiddleware, requireRoles(['ADMIN', 'TRAINER']), skillController.updateSkillHandler);
router.delete('/:id', authMiddleware, requireRoles(['ADMIN']), skillController.deleteSkillHandler);

export default router;
