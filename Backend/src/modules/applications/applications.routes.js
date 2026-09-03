import { Router } from 'express';
import {
  handleSubmitApplication,
  handleGetApplicationById,
  handleGetApplicationsByJob,
  handleGetApplicationsByStudent,
  handleUpdateStatus,
  handleScheduleInterview,
} from './applications.controller.js';

const router = Router();

router.route('/')
  .post(handleSubmitApplication);

router.route('/:id')
  .get(handleGetApplicationById);

router.route('/job/:jobId')
  .get(handleGetApplicationsByJob);

router.route('/student/:studentId')
  .get(handleGetApplicationsByStudent);

router.route('/:id/status')
  .patch(handleUpdateStatus);

router.route('/:id/interview')
  .patch(handleScheduleInterview);

export default router;
