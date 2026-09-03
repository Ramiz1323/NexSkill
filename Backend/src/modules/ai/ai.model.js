import mongoose from 'mongoose';

const recommendationLogSchema = new mongoose.Schema(
  {
    candidateId: {
      type: String,
      required: [true, 'Candidate ID is required'],
      trim: true,
      index: true,
    },
    targetJobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    overallMatchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    skillMatchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    matchedSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    missingSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    confidenceScore: {
      type: Number,
      default: 85,
    },
    recommendationReasoning: {
      type: String,
      trim: true,
      default: '',
    },
    careerTransitionPath: {
      currentLevel: { type: String, default: 'Entry' },
      recommendedNextRole: { type: String, default: '' },
      estimatedTimeToReadinessWeeks: { type: Number, default: 6 },
    },
  },
  {
    timestamps: true,
  }
);

export const RecommendationLog =
  mongoose.models.RecommendationLog ||
  mongoose.model('RecommendationLog', recommendationLogSchema);
export default RecommendationLog;
