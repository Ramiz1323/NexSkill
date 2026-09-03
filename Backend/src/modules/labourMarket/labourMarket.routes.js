import { Router } from 'express';
import {
  handleRecordMarketData,
  handleGetMarketDataById,
  handleUpdateMarketData,
  handleDeleteMarketData,
  handleListMarketData,
  handleGetSectorSalaryBenchmarks,
  handleGetTopDemandedRoles,
} from './labourMarket.controller.js';

const router = Router();

router.route('/')
  .post(handleRecordMarketData)
  .get(handleListMarketData);

router.route('/top-roles')
  .get(handleGetTopDemandedRoles);

router.route('/salary-benchmarks')
  .get(handleGetSectorSalaryBenchmarks);

router.route('/:id')
  .get(handleGetMarketDataById)
  .put(handleUpdateMarketData)
  .delete(handleDeleteMarketData);

export default router;
