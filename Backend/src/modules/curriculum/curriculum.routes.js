import { Router } from 'express';
import {
  handleCreateCurriculum,
  handleGetCurriculumById,
  handleUpdateCurriculum,
  handleDeleteCurriculum,
  handleListCurricula,
} from './curriculum.controller.js';

const router = Router();

router.route('/')
  .post(handleCreateCurriculum)
  .get(handleListCurricula);

router.route('/:id')
  .get(handleGetCurriculumById)
  .put(handleUpdateCurriculum)
  .delete(handleDeleteCurriculum);

export default router;
