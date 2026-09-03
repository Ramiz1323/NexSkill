import mongoose from 'mongoose';

export const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'Cloud & DevOps',
  'AI & Machine Learning',
  'Cybersecurity',
  'Mobile Development',
  'Soft Skills',
];

export const DEMAND_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      unique: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      enum: SKILL_CATEGORIES,
      required: [true, 'Skill category is required'],
      index: true,
    },
    demandLevel: {
      type: String,
      enum: DEMAND_LEVELS,
      default: 'High',
    },
    benchmarkWeight: {
      type: Number,
      min: [1, 'Weight must be at least 1'],
      max: [10, 'Weight cannot exceed 10'],
      default: 5,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    aliases: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
