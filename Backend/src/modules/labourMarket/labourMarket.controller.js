import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as labourMarketService from './labourMarket.service.js';

export const handleRecordMarketData = asyncHandler(async (req, res) => {
  const { sector, jobRole, hiringVolume, growthRatePercentage } = req.body;
  if (!sector || !jobRole || hiringVolume === undefined || growthRatePercentage === undefined) {
    throw new ApiError(
      400,
      'Sector, jobRole, hiringVolume, and growthRatePercentage are required'
    );
  }

  const marketData = await labourMarketService.recordMarketData(req.body);
  res.status(201).json(new ApiResponse(201, marketData, 'Labour market data recorded successfully'));
});

export const handleGetMarketDataById = asyncHandler(async (req, res) => {
  const marketData = await labourMarketService.getMarketDataById(req.params.id);
  if (!marketData) {
    throw new ApiError(404, 'Labour market record not found');
  }
  res.status(200).json(new ApiResponse(200, marketData, 'Market data retrieved successfully'));
});

export const handleUpdateMarketData = asyncHandler(async (req, res) => {
  const marketData = await labourMarketService.updateMarketData(req.params.id, req.body);
  if (!marketData) {
    throw new ApiError(404, 'Labour market record not found');
  }
  res.status(200).json(new ApiResponse(200, marketData, 'Market data updated successfully'));
});

export const handleDeleteMarketData = asyncHandler(async (req, res) => {
  const marketData = await labourMarketService.deleteMarketData(req.params.id);
  if (!marketData) {
    throw new ApiError(404, 'Labour market record not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Market data deleted successfully'));
});

export const handleListMarketData = asyncHandler(async (req, res) => {
  const result = await labourMarketService.listMarketData(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Market data retrieved successfully'));
});

export const handleGetSectorSalaryBenchmarks = asyncHandler(async (req, res) => {
  const benchmarks = await labourMarketService.getSectorSalaryBenchmarks(req.query.sector);
  res.status(200).json(new ApiResponse(200, benchmarks, 'Salary benchmarks retrieved successfully'));
});

export const handleGetTopDemandedRoles = asyncHandler(async (req, res) => {
  const roles = await labourMarketService.getTopDemandedRoles(req.query.limit);
  res.status(200).json(new ApiResponse(200, roles, 'Top demanded roles retrieved successfully'));
});
