import { Router } from 'express';
import {
  handleCreateEmergingSkill,
  handleGetEmergingSkillById,
  handleUpdateEmergingSkill,
  handleDeleteEmergingSkill,
  handleListEmergingSkills,
  handleGetTopForecastedSkills,
  handleGetDisplacementAnalysis,
} from './emergingSkills.controller.js';

const router = Router();

router.route('/')
  .post(handleCreateEmergingSkill)
  .get(handleListEmergingSkills);

router.route('/top-forecast')
  .get(handleGetTopForecastedSkills);

router.route('/displacement-analysis')
  .get(handleGetDisplacementAnalysis);

router.route('/:id')
  .get(handleGetEmergingSkillById)
  .put(handleUpdateEmergingSkill)
  .delete(handleDeleteEmergingSkill);

export default router;
