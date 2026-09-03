import StudentSkill from '../skillProfiles/skillProfile.model.js';
import Skill from '../skills/skill.model.js';
import ApiError from '../../utils/ApiError.js';

// Industry Role Benchmarks mapped to modern tech job demands
export const ROLE_BENCHMARKS = {
  'Software Engineer': [
    { skill: 'Data Structures & Algorithms', requiredScore: 80, weight: 1.5 },
    { skill: 'JavaScript', requiredScore: 85, weight: 1.2 },
    { skill: 'Node.js', requiredScore: 75, weight: 1.2 },
    { skill: 'React.js', requiredScore: 75, weight: 1.0 },
    { skill: 'SQL & Database Design', requiredScore: 70, weight: 1.0 },
    { skill: 'Git & Version Control', requiredScore: 80, weight: 0.8 },
  ],
  'Cloud Architect': [
    { skill: 'AWS Cloud Architecture', requiredScore: 85, weight: 1.5 },
    { skill: 'Docker & Containerization', requiredScore: 80, weight: 1.3 },
    { skill: 'Kubernetes Orchestration', requiredScore: 75, weight: 1.2 },
    { skill: 'Terraform & IaC', requiredScore: 70, weight: 1.0 },
    { skill: 'Linux Administration', requiredScore: 75, weight: 1.0 },
    { skill: 'Cloud Security & IAM', requiredScore: 80, weight: 1.2 },
  ],
  'Data Analyst': [
    { skill: 'Python', requiredScore: 85, weight: 1.4 },
    { skill: 'SQL & Database Design', requiredScore: 85, weight: 1.4 },
    { skill: 'PowerBI / Tableau', requiredScore: 80, weight: 1.2 },
    { skill: 'Data Warehousing', requiredScore: 70, weight: 1.0 },
    { skill: 'Statistics & Probability', requiredScore: 75, weight: 1.0 },
    { skill: 'Pandas & NumPy', requiredScore: 80, weight: 1.2 },
  ],
  'DevOps Engineer': [
    { skill: 'CI/CD Pipelines', requiredScore: 85, weight: 1.5 },
    { skill: 'Docker & Containerization', requiredScore: 85, weight: 1.3 },
    { skill: 'Kubernetes Orchestration', requiredScore: 80, weight: 1.3 },
    { skill: 'Linux Administration', requiredScore: 80, weight: 1.1 },
    { skill: 'AWS Cloud Architecture', requiredScore: 75, weight: 1.0 },
    { skill: 'Monitoring & Logging (Prometheus/ELK)', requiredScore: 75, weight: 1.0 },
  ],
  'Full Stack Web Development': [
    { skill: 'JavaScript', requiredScore: 85, weight: 1.3 },
    { skill: 'React.js', requiredScore: 80, weight: 1.3 },
    { skill: 'Node.js', requiredScore: 80, weight: 1.3 },
    { skill: 'MongoDB', requiredScore: 75, weight: 1.0 },
    { skill: 'REST API Architecture', requiredScore: 80, weight: 1.2 },
    { skill: 'Docker & Containerization', requiredScore: 65, weight: 0.9 },
  ],
};

export const calculateSkillGap = async (studentId, targetRole = 'Software Engineer') => {
  const benchmarkSkills = ROLE_BENCHMARKS[targetRole] || ROLE_BENCHMARKS['Software Engineer'];

  // Fetch student's existing skills
  const studentSkills = await StudentSkill.find({ student: studentId }).populate('skill');

  const studentSkillMap = new Map();
  studentSkills.forEach((item) => {
    if (item.skill && item.skill.name) {
      studentSkillMap.set(item.skill.name.toLowerCase(), {
        score: item.proficiencyScore,
        isVerified: item.isVerified,
        level: item.level,
      });
    }
  });

  let totalWeightedGap = 0;
  let totalWeights = 0;
  const comparisonData = [];
  const deficientSkills = [];
  const matchedSkills = [];
  const missingSkills = [];

  for (const benchmark of benchmarkSkills) {
    const studentData = studentSkillMap.get(benchmark.skill.toLowerCase()) || {
      score: 0,
      isVerified: false,
      level: 'UNVERIFIED',
    };

    const currentScore = studentData.score;
    const requiredScore = benchmark.requiredScore;
    const gap = Math.max(0, requiredScore - currentScore);

    totalWeightedGap += gap * benchmark.weight;
    totalWeights += benchmark.weight;

    const item = {
      skill: benchmark.skill,
      required: requiredScore,
      current: currentScore,
      gap,
      isVerified: studentData.isVerified,
      level: studentData.level,
    };

    comparisonData.push(item);

    if (currentScore === 0) {
      missingSkills.push({
        skill: benchmark.skill,
        requiredScore,
        priority: benchmark.weight >= 1.2 ? 'Critical' : 'High',
      });
    } else if (currentScore < requiredScore) {
      deficientSkills.push({
        skill: benchmark.skill,
        currentScore,
        requiredScore,
        gap,
        priority: gap > 30 ? 'High' : 'Medium',
      });
    } else {
      matchedSkills.push({
        skill: benchmark.skill,
        currentScore,
        requiredScore,
        status: 'Benchmark Met',
      });
    }
  }

  // Calculate overall gap percentage (0% means completely ready, 100% means total deficit)
  const maxPossibleWeightedScore = 100 * totalWeights;
  const gapPercentage = Math.min(100, Math.round((totalWeightedGap / maxPossibleWeightedScore) * 100));
  const readinessPercentage = Math.max(0, 100 - gapPercentage);

  return {
    targetRole,
    overallGap: gapPercentage,
    readinessPercentage,
    skills: comparisonData,
    comparisonData,
    matchedCount: matchedSkills.length,
    deficientCount: deficientSkills.length,
    missingCount: missingSkills.length,
    deficientSkills,
    missingSkills,
    matchedSkills,
  };
};

export const generateAdaptiveLearningPath = async (studentId, targetRole = 'Software Engineer') => {
  const gapReport = await calculateSkillGap(studentId, targetRole);

  const roadmapSteps = [];

  // Prioritize missing skills first, then deficient skills
  const priorityList = [
    ...gapReport.missingSkills.map((s) => ({ ...s, isMissing: true })),
    ...gapReport.deficientSkills.map((s) => ({ ...s, isMissing: false })),
  ];

  priorityList.forEach((item, index) => {
    roadmapSteps.push({
      id: `STEP-${index + 1}`,
      stepNumber: index + 1,
      moduleName: item.isMissing
        ? `Core Foundation: ${item.skill}`
        : `Advanced Competency Lab: ${item.skill}`,
      targetSkill: item.skill,
      estimatedHours: item.isMissing ? 25 : Math.round(item.gap * 0.5) + 10,
      priority: item.priority || 'High',
      practicalEvidence: `Complete end-to-end hands-on project demonstrating ${item.skill}`,
      deliverable: `GitHub Repository + Automated Unit Tests for ${item.skill}`,
    });
  });

  return roadmapSteps;
};

export default {
  calculateSkillGap,
  generateAdaptiveLearningPath,
  ROLE_BENCHMARKS,
};
