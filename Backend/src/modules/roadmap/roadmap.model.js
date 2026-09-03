import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  focusArea: { type: String, trim: true },
  learningObjectives: [{ type: String, trim: true }],
  recommendedCourseIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  recommendedCourses: [
    {
      title: { type: String, trim: true },
      provider: { type: String, trim: true },
      url: { type: String, trim: true },
      durationHours: { type: Number, default: 5 },
    },
  ],
  handsOnProject: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    deliverable: { type: String, default: '' },
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const roadmapSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      trim: true,
      index: true,
    },
    targetRole: {
      type: String,
      required: [true, 'Target role is required'],
      trim: true,
      index: true,
    },
    currentSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    targetSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    skillGaps: [
      {
        type: String,
        trim: true,
      },
    ],
    totalWeeks: {
      type: Number,
      default: 8,
    },
    weeklyMilestones: [milestoneSchema],
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Paused'],
      default: 'Active',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Roadmap = mongoose.models.Roadmap || mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
