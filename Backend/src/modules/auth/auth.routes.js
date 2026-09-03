import { Router } from 'express';
import authController from './auth.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = Router();

// Public Authentication Endpoints
router.post('/register', authController.registerHandler);
router.post('/login', authController.loginHandler);

// Protected Authentication Endpoints
router.post('/logout', authMiddleware, authController.logoutHandler);
router.get('/me', authMiddleware, authController.getCurrentUserHandler);

export default router;
