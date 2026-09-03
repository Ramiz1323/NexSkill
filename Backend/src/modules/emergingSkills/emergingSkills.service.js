import EmergingSkill from './emergingSkills.model.js';
import { getPagination, formatPaginatedResponse } from '../../utils/pagination.js';

/**
 * Create a new emerging skill record
 */
export const createEmergingSkill = async (skillData) => {
  const skill = await EmergingSkill.create(skillData);
  return skill;
};

/**
 * Retrieve emerging skill by ID
 */
export const getEmergingSkillById = async (id) => {
  const skill = await EmergingSkill.findById(id);
  return skill;
};

/**
 * Update emerging skill
 */
export const updateEmergingSkill = async (id, updateData) => {
  const skill = await EmergingSkill.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return skill;
};

/**
 * Delete emerging skill
 */
export const deleteEmergingSkill = async (id) => {
  const skill = await EmergingSkill.findByIdAndDelete(id);
  return skill;
};

/**
 * List emerging skills with filters and pagination
 */
export const listEmergingSkills = async (query = {}) => {
  const { category, search, minForecastScore, sortBy = 'demandForecastScore' } = query;
  const filter = {};

  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }
  if (minForecastScore) {
    filter.demandForecastScore = { $gte: Number(minForecastScore) };
  }
  if (search) {
    filter.$or = [
      { skillName: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { associatedRoles: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const sortCriteria = {};
  if (sortBy === 'projectedGrowthRate') {
    sortCriteria.projectedGrowthRate = -1;
  } else {
    sortCriteria.demandForecastScore = -1;
  }

  const { page, limit, skip } = getPagination(query);

  const [skills, total] = await Promise.all([
    EmergingSkill.find(filter).sort(sortCriteria).skip(skip).limit(limit),
    EmergingSkill.countDocuments(filter),
  ]);

  return formatPaginatedResponse(skills, total, page, limit);
};

/**
 * Retrieve top forecasted skills ranked by demand forecast and growth
 */
export const getTopForecastedSkills = async (limit = 10) => {
  const skills = await EmergingSkill.find()
    .sort({ demandForecastScore: -1, projectedGrowthRate: -1 })
    .limit(Number(limit));

  return skills;
};

/**
 * Perform skills displacement and transition risk analysis
 */
export const getSkillsDisplacementAnalysis = async () => {
  const [highRiskSkills, categoryBreakdown] = await Promise.all([
    EmergingSkill.find({ displacementRiskScore: { $gte: 25 } })
      .sort({ displacementRiskScore: -1 })
      .limit(10)
      .select(
        'skillName category displacementRiskScore adjacentTraditionalSkills readinessRecommendation'
      ),
    EmergingSkill.aggregate([
      {
        $group: {
          _id: '$category',
          avgDemandForecast: { $avg: '$demandForecastScore' },
          avgProjectedGrowth: { $avg: '$projectedGrowthRate' },
          avgDisplacementRisk: { $avg: '$displacementRiskScore' },
          totalSkills: { $sum: 1 },
        },
      },
      { $sort: { avgDemandForecast: -1 } },
    ]),
  ]);

  return {
    highRiskSkills,
    categoryBreakdown: categoryBreakdown.map((c) => ({
      category: c._id,
      avgDemandForecast: Math.round(c.avgDemandForecast || 0),
      avgProjectedGrowth: Math.round(c.avgProjectedGrowth || 0),
      avgDisplacementRisk: Math.round(c.avgDisplacementRisk || 0),
      totalSkills: c.totalSkills,
    })),
  };
};
