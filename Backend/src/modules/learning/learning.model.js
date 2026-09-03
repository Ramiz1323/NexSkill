import mongoose from 'mongoose';

const quizScoreSchema = new mongoose.Schema({
  quizTitle: { type: String, required: true, trim: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, default: 100 },
  completedAt: { type: Date, default: Date.now },
});

const learningEnrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      trim: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
      index: true,
    },
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roadmap',
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Enrolled', 'In Progress', 'Completed', 'Dropped'],
      default: 'Enrolled',
      index: true,
    },
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      index: true,
    },
    completedModules: [
      {
        type: String,
        trim: true,
      },
    ],
    timeSpentHours: {
      type: Number,
      default: 0,
    },
    quizScores: [quizScoreSchema],
    certificateUrl: {
      type: String,
      default: '',
    },
    completionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const LearningEnrollment =
  mongoose.models.LearningEnrollment ||
  mongoose.model('LearningEnrollment', learningEnrollmentSchema);
export default LearningEnrollment;
