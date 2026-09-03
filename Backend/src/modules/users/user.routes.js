import { Router } from 'express';
import userController from './user.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';
import requireRoles from '../../middleware/role.middleware.js';

const router = Router();

// Authenticated routes
router.use(authMiddleware);

// Admin only: Get all users
router.get('/', requireRoles(['ADMIN']), userController.getUsersHandler);

// View user by ID
router.get('/:id', userController.getUserByIdHandler);

// Update user details
router.patch('/:id', userController.updateUserHandler);

// Admin only: Role update
router.patch('/:id/role', requireRoles(['ADMIN']), userController.updateRoleHandler);

// Admin only: Deactivate account
router.patch('/:id/deactivate', requireRoles(['ADMIN']), userController.deactivateUserHandler);

// Admin only: Delete user
router.delete('/:id', requireRoles(['ADMIN']), userController.deleteUserHandler);

export default router;
