import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job reference is required'],
      index: true,
    },
    student: {
      studentId: {
        type: String,
        trim: true,
        index: true,
      },
      name: {
        type: String,
        required: [true, 'Candidate name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Candidate email is required'],
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      skills: [
        {
          type: String,
          trim: true,
        },
      ],
      resumeUrl: {
        type: String,
        default: '',
      },
    },
    coverLetter: {
      type: String,
      trim: true,
    },
    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      index: true,
    },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
      default: 'Applied',
      index: true,
    },
    interviewDetails: {
      scheduledAt: { type: Date },
      mode: {
        type: String,
        enum: ['Online', 'On-site', 'Phone'],
        default: 'Online',
      },
      meetingLink: { type: String, default: '' },
      notes: { type: String, default: '' },
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, default: Date.now },
        note: { type: String, default: '' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Application =
  mongoose.models.Application || mongoose.model('Application', applicationSchema);
export default Application;
