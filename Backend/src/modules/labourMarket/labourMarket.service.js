import LabourMarket from './labourMarket.model.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Record a new labor market data point
 */
export const recordMarketData = async (data) => {
  const marketData = await LabourMarket.create(data);
  return marketData;
};

/**
 * Retrieve market data by ID
 */
export const getMarketDataById = async (id) => {
  const marketData = await LabourMarket.findById(id);
  return marketData;
};

/**
 * Update market data
 */
export const updateMarketData = async (id, updateData) => {
  const marketData = await LabourMarket.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return marketData;
};

/**
 * Delete market data
 */
export const deleteMarketData = async (id) => {
  const marketData = await LabourMarket.findByIdAndDelete(id);
  return marketData;
};

/**
 * List market data points with multi-parameter filtering
 */
export const listMarketData = async (query = {}) => {
  const { sector, jobRole, demandLevel, region, quarter, search } = query;
  const filter = {};

  if (sector) filter.sector = { $regex: sector, $options: 'i' };
  if (jobRole) filter.jobRole = { $regex: jobRole, $options: 'i' };
  if (demandLevel) filter.demandLevel = demandLevel;
  if (region) filter.region = { $regex: region, $options: 'i' };
  if (quarter) filter.reportedQuarter = quarter;

  if (search) {
    filter.$or = [
      { sector: { $regex: search, $options: 'i' } },
      { jobRole: { $regex: search, $options: 'i' } },
      { topRequiredSkills: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const { page, limit, skip } = getPagination(query);

  const [items, total] = await Promise.all([
    LabourMarket.find(filter)
      .sort({ hiringVolume: -1, growthRatePercentage: -1 })
      .skip(skip)
      .limit(limit),
    LabourMarket.countDocuments(filter),
  ]);

  return formatPaginatedResponse(items, total, page, limit);
};

/**
 * Calculate sector-wide salary benchmarks
 */
export const getSectorSalaryBenchmarks = async (sector) => {
  const matchStage = {};
  if (sector) {
    matchStage.sector = { $regex: sector, $options: 'i' };
  }

  const benchmarks = await LabourMarket.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$sector',
        avgEntrySalary: { $avg: '$salaryInsights.entryLevel' },
        avgMidSalary: { $avg: '$salaryInsights.midLevel' },
        avgSeniorSalary: { $avg: '$salaryInsights.seniorLevel' },
        overallAvgSalary: { $avg: '$salaryInsights.average' },
        totalHiringVolume: { $sum: '$hiringVolume' },
        rolesTracked: { $sum: 1 },
      },
    },
    { $sort: { totalHiringVolume: -1 } },
  ]);

  return benchmarks.map((b) => ({
    sector: b._id,
    avgEntrySalary: Math.round(b.avgEntrySalary || 0),
    avgMidSalary: Math.round(b.avgMidSalary || 0),
    avgSeniorSalary: Math.round(b.avgSeniorSalary || 0),
    overallAvgSalary: Math.round(b.overallAvgSalary || 0),
    totalHiringVolume: b.totalHiringVolume,
    rolesTracked: b.rolesTracked,
  }));
};

/**
 * Retrieve top in-demand job roles ranked by volume and growth
 */
export const getTopDemandedRoles = async (limit = 10) => {
  const roles = await LabourMarket.find()
    .sort({ hiringVolume: -1, growthRatePercentage: -1 })
    .limit(Number(limit))
    .select(
      'jobRole sector hiringVolume growthRatePercentage demandLevel salaryInsights topRequiredSkills'
    );

  return roles;
};
