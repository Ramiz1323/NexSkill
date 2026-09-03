import mongoose from 'mongoose';

export const PROFICIENCY_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
export const VERIFICATION_BADGES = ['UNVERIFIED', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];

const studentSkillSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student user reference is required'],
      index: true,
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'Skill reference is required'],
      index: true,
    },
    proficiencyScore: {
      type: Number,
      min: [0, 'Score cannot be negative'],
      max: [100, 'Score cannot exceed 100'],
      default: 0,
    },
    level: {
      type: String,
      enum: PROFICIENCY_LEVELS,
      default: 'BEGINNER',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationBadge: {
      type: String,
      enum: VERIFICATION_BADGES,
      default: 'UNVERIFIED',
    },
    lastEvaluatedAt: {
      type: Date,
      default: Date.now,
    },
    assessmentSource: {
      type: String,
      default: 'Self-Reported',
      trim: true,
    },
    evidenceUrl: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index ensuring 1 record per student-skill pair
studentSkillSchema.index({ student: 1, skill: 1 }, { unique: true });

// Pre-save calculate level and badge dynamically from proficiencyScore
studentSkillSchema.pre('save', function (next) {
  const score = this.proficiencyScore;

  if (score >= 85) {
    this.level = 'EXPERT';
    if (this.isVerified) this.verificationBadge = 'PLATINUM';
  } else if (score >= 70) {
    this.level = 'ADVANCED';
    if (this.isVerified) this.verificationBadge = 'GOLD';
  } else if (score >= 50) {
    this.level = 'INTERMEDIATE';
    if (this.isVerified) this.verificationBadge = 'SILVER';
  } else {
    this.level = 'BEGINNER';
    if (this.isVerified) this.verificationBadge = 'BRONZE';
  }

  next();
});

export const StudentSkill = mongoose.model('StudentSkill', studentSkillSchema);

export default StudentSkill;
