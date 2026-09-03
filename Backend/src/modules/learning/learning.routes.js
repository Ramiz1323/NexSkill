import { Router } from 'express';
import {
  handleEnrollCourse,
  handleUpdateProgress,
  handleGetStudentLearningSummary,
  handleListEnrollments,
  handleGetEnrollmentById,
} from './learning.controller.js';

const router = Router();

router.route('/enroll')
  .post(handleEnrollCourse);

router.route('/')
  .get(handleListEnrollments);

router.route('/student/:studentId/summary')
  .get(handleGetStudentLearningSummary);

router.route('/student/:studentId')
  .get(handleListEnrollments);

router.route('/:id')
  .get(handleGetEnrollmentById);

router.route('/:id/progress')
  .patch(handleUpdateProgress);

export default router;
