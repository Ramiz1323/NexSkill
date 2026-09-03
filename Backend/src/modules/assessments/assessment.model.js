import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
  },
  options: {
    type: [String],
    validate: {
      validator: (val) => val.length >= 2,
      message: 'A question must have at least 2 options',
    },
    required: true,
  },
  correctAnswerIndex: {
    type: Number,
    required: [true, 'Correct option index is required'],
    min: 0,
  },
  weight: {
    type: Number,
    default: 1,
    min: 1,
  },
  explanation: {
    type: String,
    default: '',
  },
});

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Assessment title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    targetSkill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'Target skill reference is required'],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
      default: 'INTERMEDIATE',
    },
    durationMinutes: {
      type: Number,
      default: 20,
    },
    passingScore: {
      type: Number,
      default: 60, // percentage
    },
    questions: [questionSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const assessmentResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment',
      required: true,
      index: true,
    },
    targetSkill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    awardedLevel: {
      type: String,
      enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswersCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Assessment = mongoose.model('Assessment', assessmentSchema);
export const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);

export default {
  Assessment,
  AssessmentResult,
};
