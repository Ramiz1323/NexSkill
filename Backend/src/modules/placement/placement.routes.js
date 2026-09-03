import { Router } from 'express';
import {
  handleRecordPlacement,
  handleGetPlacementById,
  handleListPlacements,
  handleGetPlacementStats,
} from './placement.controller.js';

const router = Router();

router.route('/')
  .post(handleRecordPlacement)
  .get(handleListPlacements);

router.route('/stats')
  .get(handleGetPlacementStats);

router.route('/:id')
  .get(handleGetPlacementById);

export default router;
