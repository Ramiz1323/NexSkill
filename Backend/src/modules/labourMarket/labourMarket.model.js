import mongoose from 'mongoose';

const historicalTrendSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  openingsCount: { type: Number, default: 0 },
  averageSalary: { type: Number, default: 0 },
});

const labourMarketSchema = new mongoose.Schema(
  {
    sector: {
      type: String,
      required: [true, 'Industry sector is required'],
      trim: true,
      index: true,
    },
    jobRole: {
      type: String,
      required: [true, 'Job role is required'],
      trim: true,
      index: true,
    },
    region: {
      type: String,
      default: 'India',
      trim: true,
      index: true,
    },
    hiringVolume: {
      type: Number,
      required: [true, 'Hiring volume is required'],
      min: 0,
    },
    growthRatePercentage: {
      type: Number,
      required: [true, 'Growth rate percentage is required'],
    },
    demandLevel: {
      type: String,
      enum: ['Very High', 'High', 'Medium', 'Moderate', 'Emerging'],
      default: 'High',
      index: true,
    },
    salaryInsights: {
      currency: { type: String, default: 'INR' },
      entryLevel: { type: Number, default: 500000 },
      midLevel: { type: Number, default: 1200000 },
      seniorLevel: { type: Number, default: 2400000 },
      average: { type: Number, default: 1300000 },
    },
    topRequiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    historicalTrends: [historicalTrendSchema],
    reportedQuarter: {
      type: String,
      default: 'Q3-2026',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LabourMarket =
  mongoose.models.LabourMarket || mongoose.model('LabourMarket', labourMarketSchema);
export default LabourMarket;
