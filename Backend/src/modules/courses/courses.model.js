import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },
    provider: {
      type: String,
      required: [true, 'Course provider is required'],
      trim: true,
      index: true,
    },
    skillsTaught: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
      index: true,
    },
    durationWeeks: {
      type: Number,
      default: 4,
    },
    durationHours: {
      type: Number,
      default: 20,
    },
    url: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    certificationAvailable: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;
