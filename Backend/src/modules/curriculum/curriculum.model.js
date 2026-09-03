import mongoose from 'mongoose';

const moduleItemSchema = new mongoose.Schema({
  moduleNumber: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  learningOutcomes: [{ type: String, trim: true }],
  competencies: [{ type: String, trim: true }],
  estimatedHours: { type: Number, default: 10 },
});

const curriculumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Curriculum title is required'],
      trim: true,
      index: true,
    },
    domain: {
      type: String,
      required: [true, 'Industry domain is required'],
      trim: true,
      index: true,
    },
    targetRole: {
      type: String,
      required: [true, 'Target job role is required'],
      trim: true,
      index: true,
    },
    industryPartners: [
      {
        type: String,
        trim: true,
      },
    ],
    version: {
      type: String,
      default: '1.0',
    },
    alignmentScore: {
      type: Number,
      default: 90,
      min: 0,
      max: 100,
    },
    modules: [moduleItemSchema],
    status: {
      type: String,
      enum: ['Active', 'Draft', 'Archived'],
      default: 'Active',
      index: true,
    },
    lastReviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Curriculum =
  mongoose.models.Curriculum || mongoose.model('Curriculum', curriculumSchema);
export default Curriculum;
