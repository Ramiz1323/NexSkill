import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    targetRole: {
      type: String,
      required: true,
      index: true,
    },
    partnerOrganization: {
      type: String,
      default: 'Industry Standard Council',
    },
    totalHours: {
      type: Number,
      default: 40,
    },
    alignmentScore: {
      type: Number,
      default: 90,
    },
    description: {
      type: String,
      default: '',
    },
    modules: [
      {
        name: String,
        summary: String,
        skillsCovered: [String],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model('Course', courseSchema);

export default Course;
