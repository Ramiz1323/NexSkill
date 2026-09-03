import mongoose from 'mongoose';

const platformMetricSnapshotSchema = new mongoose.Schema(
  {
    snapshotDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    totalJobsActive: {
      type: Number,
      default: 0,
    },
    totalEmployersRegistered: {
      type: Number,
      default: 0,
    },
    totalApplicationsSubmitted: {
      type: Number,
      default: 0,
    },
    totalCoursesAvailable: {
      type: Number,
      default: 0,
    },
    totalStudentsEnrolled: {
      type: Number,
      default: 0,
    },
    totalPlacementsRecorded: {
      type: Number,
      default: 0,
    },
    averagePlacementCTC: {
      type: Number,
      default: 0,
    },
    topHiringSectors: [
      {
        sector: { type: String, trim: true },
        count: { type: Number, default: 0 },
      },
    ],
    topDemandedSkills: [
      {
        skill: { type: String, trim: true },
        count: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const PlatformMetricSnapshot =
  mongoose.models.PlatformMetricSnapshot ||
  mongoose.model('PlatformMetricSnapshot', platformMetricSnapshotSchema);
export default PlatformMetricSnapshot;
