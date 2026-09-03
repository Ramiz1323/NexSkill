import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      index: true,
    },
    website: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      required: [true, 'Industry sector is required'],
      trim: true,
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Headquarters/Location is required'],
      trim: true,
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    verifiedStatus: {
      type: Boolean,
      default: false,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    hiringDomains: [
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

export const Employer = mongoose.models.Employer || mongoose.model('Employer', employerSchema);
export default Employer;
