import mongoose from 'mongoose';

const careerTrackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    domain: { type: String, required: true },
    demandLevel: { type: String, default: 'High' },
    averageSalary: { type: String },
    timeToReady: { type: String },
    description: { type: String },
    requiredSkills: [{ type: String }],
    milestones: [
      {
        phase: { type: String },
        title: { type: String },
        duration: { type: String },
        skills: [{ type: String }],
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CareerTrack = mongoose.model('CareerTrack', careerTrackSchema);
export default CareerTrack;
