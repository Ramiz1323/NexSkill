import mongoose from 'mongoose';

const placementSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    studentEmail: {
      type: String,
      required: [true, 'Student email is required'],
      trim: true,
      lowercase: true,
    },
    studentId: {
      type: String,
      trim: true,
      index: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job reference is required'],
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
      required: [true, 'Employer reference is required'],
      index: true,
    },
    packageOffered: {
      type: Number,
      required: [true, 'Package offered (CTC) is required'],
    },
    placementDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Offer Made', 'Offer Accepted', 'Joined', 'Declined'],
      default: 'Offer Made',
      index: true,
    },
    academicYear: {
      type: String,
      required: [true, 'Academic year is required (e.g. 2025-2026)'],
      trim: true,
      index: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      index: true,
    },
    offerLetterUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Placement =
  mongoose.models.Placement || mongoose.model('Placement', placementSchema);
export default Placement;
