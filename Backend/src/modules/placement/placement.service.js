import Placement from './placement.model.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Record a student placement offer
 */
export const recordPlacement = async (placementData) => {
  const placement = await Placement.create(placementData);
  return placement.populate(['job', 'employer']);
};

/**
 * Retrieve placement by ID
 */
export const getPlacementById = async (placementId) => {
  const placement = await Placement.findById(placementId).populate(['job', 'employer']);
  return placement;
};

/**
 * List placements with filters
 */
export const listPlacements = async (query = {}) => {
  const { employerId, department, academicYear, status } = query;
  const filter = {};

  if (employerId) filter.employer = employerId;
  if (department) filter.department = department;
  if (academicYear) filter.academicYear = academicYear;
  if (status) filter.status = status;

  const { page, limit, skip } = getPagination(query);

  const [placements, total] = await Promise.all([
    Placement.find(filter)
      .populate(['job', 'employer'])
      .sort({ placementDate: -1 })
      .skip(skip)
      .limit(limit),
    Placement.countDocuments(filter),
  ]);

  return formatPaginatedResponse(placements, total, page, limit);
};

/**
 * Calculate placement analytics and metrics
 */
export const getPlacementStats = async (query = {}) => {
  const { academicYear } = query;
  const matchStage = {};
  if (academicYear) {
    matchStage.academicYear = academicYear;
  }

  const [overallStats, deptStats, topEmployers] = await Promise.all([
    Placement.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalPlacements: { $sum: 1 },
          averageCTC: { $avg: '$packageOffered' },
          highestCTC: { $max: '$packageOffered' },
          lowestCTC: { $min: '$packageOffered' },
        },
      },
    ]),
    Placement.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
          avgCTC: { $avg: '$packageOffered' },
          highestCTC: { $max: '$packageOffered' },
        },
      },
      { $sort: { count: -1 } },
    ]),
    Placement.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$employer',
          hires: { $sum: 1 },
        },
      },
      { $sort: { hires: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'employers',
          localField: '_id',
          foreignField: '_id',
          as: 'employerDetails',
        },
      },
      {
        $unwind: {
          path: '$employerDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          employerId: '$_id',
          employerName: '$employerDetails.companyName',
          hires: 1,
        },
      },
    ]),
  ]);

  const summary = overallStats[0] || {
    totalPlacements: 0,
    averageCTC: 0,
    highestCTC: 0,
    lowestCTC: 0,
  };

  return {
    summary: {
      totalPlacements: summary.totalPlacements,
      averageCTC: Math.round(summary.averageCTC || 0),
      highestCTC: summary.highestCTC || 0,
      lowestCTC: summary.lowestCTC || 0,
    },
    departmentBreakdown: deptStats.map((d) => ({
      department: d._id,
      count: d.count,
      avgCTC: Math.round(d.avgCTC || 0),
      highestCTC: d.highestCTC || 0,
    })),
    topEmployers,
  };
};
