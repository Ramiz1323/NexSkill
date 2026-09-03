import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    curriculumId: {
      type: String,
      required: true,
      index: true,
    },
    reviewerName: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    roleTitle: {
      type: String,
      required: true,
    },
    technicalAlignmentScore: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    practicalDepthScore: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    missingCompetencies: {
      type: String,
      default: '',
    },
    recommendedModules: {
      type: String,
      default: '',
    },
    comments: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
