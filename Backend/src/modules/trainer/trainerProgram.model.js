import mongoose from 'mongoose';

const trainerProgramSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    mode: { type: String, enum: ['Online', 'Hybrid', 'On-site'], default: 'Online' },
    partner: { type: String, required: true },
    duration: { type: String, required: true },
    seats: { type: Number, default: 30 },
    availableSeats: { type: Number, default: 30 },
    description: { type: String, required: true },
    syllabus: [{ type: String }],
    prerequisites: { type: String },
    isEnrolled: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TrainerProgram = mongoose.model('TrainerProgram', trainerProgramSchema);
export default TrainerProgram;
