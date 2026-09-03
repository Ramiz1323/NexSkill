import mongoose from 'mongoose';

const emergingSkillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: [true, 'Skill name is required'],
      unique: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    adoptionRate: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    projectedGrowthRate: {
      type: Number,
      required: [true, 'Projected growth rate is required'],
    },
    demandForecastScore: {
      type: Number,
      default: 85,
      min: 0,
      max: 100,
      index: true,
    },
    displacementRiskScore: {
      type: Number,
      default: 15,
      min: 0,
      max: 100,
    },
    associatedRoles: [
      {
        type: String,
        trim: true,
      },
    ],
    adjacentTraditionalSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    forecastHorizonYears: {
      type: Number,
      default: 3,
    },
    readinessRecommendation: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const EmergingSkill =
  mongoose.models.EmergingSkill || mongoose.model('EmergingSkill', emergingSkillSchema);
export default EmergingSkill;
