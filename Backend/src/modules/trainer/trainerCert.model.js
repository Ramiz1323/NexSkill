import mongoose from 'mongoose';

const trainerCertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String },
    issuer: { type: String, required: true },
    status: { type: String, default: 'Verified Badge' },
    issuedDate: { type: String },
    badgeIcon: { type: String },
  },
  { timestamps: true }
);

export const TrainerCert = mongoose.model('TrainerCert', trainerCertSchema);
export default TrainerCert;
