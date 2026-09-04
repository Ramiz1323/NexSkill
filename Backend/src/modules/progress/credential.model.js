import mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    studentId: { type: String },
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String },
    credentialUrl: { type: String },
    verified: { type: Boolean, default: true },
    badgeLevel: { type: String, default: 'PLATINUM' },
  },
  { timestamps: true }
);

export const Credential = mongoose.model('Credential', credentialSchema);
export default Credential;
