import { Router } from 'express';
import {
  handleGenerateRoadmap,
  handleGetRoadmapById,
  handleGetStudentRoadmaps,
  handleUpdateMilestone,
  handleDeleteRoadmap,
} from './roadmap.controller.js';

const router = Router();

router.route('/generate')
  .post(handleGenerateRoadmap);

router.route('/student/:studentId')
  .get(handleGetStudentRoadmaps);

router.route('/:id')
  .get(handleGetRoadmapById)
  .delete(handleDeleteRoadmap);

router.route('/:id/milestone/:weekNumber')
  .patch(handleUpdateMilestone);

export default router;
