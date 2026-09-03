import { Router } from 'express';
import {
  handleCreateCourse,
  handleGetCourseById,
  handleUpdateCourse,
  handleDeleteCourse,
  handleListCourses,
  handleGetCoursesBySkills,
} from './courses.controller.js';

const router = Router();

router.route('/')
  .post(handleCreateCourse)
  .get(handleListCourses);

router.route('/match-skills')
  .get(handleGetCoursesBySkills);

router.route('/:id')
  .get(handleGetCourseById)
  .put(handleUpdateCourse)
  .delete(handleDeleteCourse);

export default router;
