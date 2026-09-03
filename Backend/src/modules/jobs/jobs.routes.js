import { Router } from 'express';
import {
  handleCreateJob,
  handleGetJobById,
  handleUpdateJob,
  handleListJobs,
  handleDeleteJob,
} from './jobs.controller.js';

const router = Router();

router.route('/')
  .post(handleCreateJob)
  .get(handleListJobs);

router.route('/:id')
  .get(handleGetJobById)
  .put(handleUpdateJob)
  .delete(handleDeleteJob);

export default router;
