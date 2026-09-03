import { Router } from 'express';
import {
  handleCreateEmployer,
  handleGetEmployerById,
  handleUpdateEmployer,
  handleListEmployers,
  handleDeleteEmployer,
} from './employers.controller.js';

const router = Router();

router.route('/')
  .post(handleCreateEmployer)
  .get(handleListEmployers);

router.route('/:id')
  .get(handleGetEmployerById)
  .put(handleUpdateEmployer)
  .delete(handleDeleteEmployer);

export default router;
