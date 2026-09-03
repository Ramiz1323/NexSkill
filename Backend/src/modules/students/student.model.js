import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
      index: true,
    },
    college: {
      type: String,
      required: [true, 'College or university name is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree program is required'],
      trim: true,
      default: 'B.Tech',
    },
    branch: {
      type: String,
      required: [true, 'Specialization branch is required'],
      trim: true,
      default: 'Computer Science and Engineering',
    },
    graduationYear: {
      type: Number,
      required: [true, 'Graduation year is required'],
      min: [2020, 'Year must be 2020 or later'],
      max: [2035, 'Year cannot exceed 2035'],
    },
    cgpa: {
      type: Number,
      min: [0, 'CGPA cannot be negative'],
      max: [10, 'CGPA cannot exceed 10'],
      default: 0,
    },
    targetCareerDomains: {
      type: [String],
      default: ['Full Stack Web Development'],
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: '',
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    readinessScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

export default StudentProfile;
