import StudentSkill from '../skillProfiles/skillProfile.model.js';
import StudentProfile from '../students/student.model.js';
import { AssessmentResult } from '../assessments/assessment.model.js';
import ApiError from '../../utils/ApiError.js';

export const calculateCompositeReadinessScore = async (studentId) => {
  const [profile, skills, assessmentResults] = await Promise.all([
    StudentProfile.findOne({ user: studentId }),
    StudentSkill.find({ student: studentId }),
    AssessmentResult.find({ student: studentId }),
  ]);

  if (!profile) {
    throw new ApiError(404, 'Student profile not found');
  }

  // 1. Skill Competency Score (50% Weight)
  let skillCompetencyScore = 0;
  if (skills && skills.length > 0) {
    const totalProficiency = skills.reduce((sum, s) => sum + (s.proficiencyScore || 0), 0);
    skillCompetencyScore = Math.round(totalProficiency / skills.length);
  }

  // 2. Project & Portfolio Evidence Score (25% Weight)
  let projectEvidenceScore = 0;
  if (profile.githubUrl && profile.githubUrl.trim().length > 0) projectEvidenceScore += 40;
  if (profile.portfolioUrl && profile.portfolioUrl.trim().length > 0) projectEvidenceScore += 30;
  if (profile.linkedinUrl && profile.linkedinUrl.trim().length > 0) projectEvidenceScore += 15;
  if (profile.resumeUrl && profile.resumeUrl.trim().length > 0) projectEvidenceScore += 15;
  projectEvidenceScore = Math.min(100, projectEvidenceScore);

  // 3. Assessment Verified Score (15% Weight)
  let assessmentScore = 0;
  if (assessmentResults && assessmentResults.length > 0) {
    const totalAssessment = assessmentResults.reduce((sum, r) => sum + (r.score || 0), 0);
    assessmentScore = Math.round(totalAssessment / assessmentResults.length);
  } else {
    // If no assessments yet, give baseline from verified skills
    const verifiedSkills = skills.filter((s) => s.isVerified);
    assessmentScore = verifiedSkills.length > 0 ? 50 : 20;
  }

  // 4. Coursework / Academic Score (10% Weight)
  let courseworkScore = 0;
  if (profile.cgpa && profile.cgpa > 0) {
    courseworkScore = Math.round((profile.cgpa / 10) * 100);
  } else {
    courseworkScore = 70; // Default benchmark
  }

  // Weighted Formula: 50% Skills + 25% Projects + 15% Assessments + 10% Coursework
  const compositeScore = Math.round(
    skillCompetencyScore * 0.5 +
    projectEvidenceScore * 0.25 +
    assessmentScore * 0.15 +
    courseworkScore * 0.1
  );

  const boundedScore = Math.min(100, Math.max(0, compositeScore));

  // Update profile
  profile.readinessScore = boundedScore;
  await profile.save();

  // Tier classification
  let tier = 'Needs Upskilling';
  let badge = 'BRONZE';
  if (boundedScore >= 85) {
    tier = 'Job Ready (High Demand)';
    badge = 'PLATINUM';
  } else if (boundedScore >= 70) {
    tier = 'Interview Ready';
    badge = 'GOLD';
  } else if (boundedScore >= 55) {
    tier = 'Competent with Minor Gaps';
    badge = 'SILVER';
  }

  return {
    studentId,
    compositeScore: boundedScore,
    tier,
    badge,
    breakdown: {
      skillCompetency: {
        score: skillCompetencyScore,
        weight: '50%',
        weightedContribution: Math.round(skillCompetencyScore * 0.5),
        evaluatedSkillsCount: skills.length,
      },
      projectEvidence: {
        score: projectEvidenceScore,
        weight: '25%',
        weightedContribution: Math.round(projectEvidenceScore * 0.25),
        hasGithub: Boolean(profile.githubUrl),
        hasPortfolio: Boolean(profile.portfolioUrl),
      },
      assessmentPerformance: {
        score: assessmentScore,
        weight: '15%',
        weightedContribution: Math.round(assessmentScore * 0.15),
        testsCompletedCount: assessmentResults.length,
      },
      courseworkAcademic: {
        score: courseworkScore,
        weight: '10%',
        weightedContribution: Math.round(courseworkScore * 0.1),
        cgpa: profile.cgpa,
      },
    },
    updatedAt: new Date(),
  };
};

export default {
  calculateCompositeReadinessScore,
};
