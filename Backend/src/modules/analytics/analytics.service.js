import PlatformMetricSnapshot from './analytics.model.js';
import Employer from '../employers/employers.model.js';
import Job from '../jobs/jobs.model.js';
import Application from '../applications/applications.model.js';
import Course from '../courses/courses.model.js';
import LearningEnrollment from '../learning/learning.model.js';
import Placement from '../placement/placement.model.js';

/**
 * Get real-time platform overview statistics
 */
export const getPlatformOverviewStats = async () => {
  const [
    totalEmployers,
    totalJobsActive,
    totalApplications,
    totalCourses,
    totalEnrollments,
    totalPlacements,
    placementSalaryStats,
  ] = await Promise.all([
    Employer.countDocuments(),
    Job.countDocuments({ status: 'Active' }),
    Application.countDocuments(),
    Course.countDocuments(),
    LearningEnrollment.countDocuments(),
    Placement.countDocuments(),
    Placement.aggregate([
      {
        $group: {
          _id: null,
          avgCTC: { $avg: '$packageOffered' },
          maxCTC: { $max: '$packageOffered' },
        },
      },
    ]),
  ]);

  const avgCTC = Math.round(placementSalaryStats[0]?.avgCTC || 0);
  const maxCTC = placementSalaryStats[0]?.maxCTC || 0;

  return {
    totalEmployers,
    totalJobsActive,
    totalApplications,
    totalCourses,
    totalEnrollments,
    totalPlacements,
    averagePlacementCTC: avgCTC,
    highestPlacementCTC: maxCTC,
    placementRate:
      totalApplications > 0
        ? Math.round((totalPlacements / totalApplications) * 100)
        : 0,
  };
};

/**
 * Compare skill market demand against course upskilling supply
 */
export const getSkillDemandAnalytics = async () => {
  const [jobSkillDemand, courseSkillSupply] = await Promise.all([
    Job.aggregate([
      { $match: { status: 'Active' } },
      { $unwind: '$requiredSkills' },
      {
        $group: {
          _id: { $toLower: '$requiredSkills' },
          demandCount: { $sum: 1 },
        },
      },
      { $sort: { demandCount: -1 } },
      { $limit: 15 },
    ]),
    Course.aggregate([
      { $unwind: '$skillsTaught' },
      {
        $group: {
          _id: { $toLower: '$skillsTaught' },
          coursesCount: { $sum: 1 },
        },
      },
      { $sort: { coursesCount: -1 } },
      { $limit: 15 },
    ]),
  ]);

  const supplyMap = new Map(courseSkillSupply.map((s) => [s._id, s.coursesCount]));

  const comparison = jobSkillDemand.map((d) => ({
    skill: d._id,
    industryDemandFrequency: d.demandCount,
    curriculumCoursesAvailable: supplyMap.get(d._id) || 0,
    gapDetected: (supplyMap.get(d._id) || 0) < d.demandCount,
  }));

  return comparison;
};

/**
 * Get placement performance analytics summary
 */
export const getPlacementAnalyticsSummary = async () => {
  const [departmentBreakdown, yearlyTrend] = await Promise.all([
    Placement.aggregate([
      {
        $group: {
          _id: '$department',
          hires: { $sum: 1 },
          avgCTC: { $avg: '$packageOffered' },
          maxCTC: { $max: '$packageOffered' },
        },
      },
      { $sort: { hires: -1 } },
    ]),
    Placement.aggregate([
      {
        $group: {
          _id: '$academicYear',
          hires: { $sum: 1 },
          avgCTC: { $avg: '$packageOffered' },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return {
    departments: departmentBreakdown.map((d) => ({
      department: d._id,
      hires: d.hires,
      avgCTC: Math.round(d.avgCTC || 0),
      maxCTC: d.maxCTC || 0,
    })),
    academicYearTrends: yearlyTrend.map((y) => ({
      year: y._id,
      hires: y.hires,
      avgCTC: Math.round(y.avgCTC || 0),
    })),
  };
};

/**
 * Get employer hiring pipeline funnel
 */
export const getEmployerHiringTrends = async (employerId) => {
  const employerJobs = await Job.find({ employer: employerId }).select('_id title status');
  const jobIds = employerJobs.map((j) => j._id);

  const pipelineStages = await Application.aggregate([
    { $match: { job: { $in: jobIds } } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const stageCounts = {
    Applied: 0,
    Shortlisted: 0,
    Interview: 0,
    Selected: 0,
    Rejected: 0,
  };

  pipelineStages.forEach((s) => {
    if (stageCounts[s._id] !== undefined) {
      stageCounts[s._id] = s.count;
    }
  });

  return {
    employerId,
    totalJobsPosted: employerJobs.length,
    activeJobs: employerJobs.filter((j) => j.status === 'Active').length,
    pipelineFunnel: stageCounts,
  };
};
