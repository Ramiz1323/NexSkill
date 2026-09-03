import RecommendationLog from './ai.model.js';
import Job from '../jobs/jobs.model.js';

/**
 * Standard career pathways and their requisite competencies
 */
const STANDARD_CAREER_TRACKS = [
  {
    role: 'Full Stack Web Architect',
    domain: 'Software Engineering',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'REST API', 'Tailwind CSS', 'Git'],
    description: 'Build robust end-to-end web applications, microservices, and reactive user interfaces.',
  },
  {
    role: 'Cloud & DevOps Specialist',
    domain: 'Cloud Infrastructure',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux', 'Microservices', 'Monitoring'],
    description: 'Design scalable cloud-native architectures and automated delivery pipelines.',
  },
  {
    role: 'Generative AI & ML Engineer',
    domain: 'Artificial Intelligence',
    skills: ['Python', 'PyTorch', 'LangChain', 'Prompt Engineering', 'Agentic AI', 'NLP', 'Vector Databases'],
    description: 'Develop intelligent agentic systems, LLM orchestrations, and predictive models.',
  },
  {
    role: 'Data Analytics & Intelligence Specialist',
    domain: 'Data Analytics',
    skills: ['Python', 'SQL', 'PowerBI', 'Data Modeling', 'Pandas', 'ETL', 'Statistical Analysis'],
    description: 'Transform complex business datasets into actionable strategic intelligence dashboards.',
  },
];

/**
 * Calculate match score between candidate skills and a specific job
 */
export const calculateCandidateJobMatch = (candidateSkills = [], job) => {
  const cSkillSet = new Set(candidateSkills.map((s) => s.toLowerCase().trim()));
  const required = job.requiredSkills || [];
  const preferred = job.preferredSkills || [];

  const matchedRequired = required.filter((s) => cSkillSet.has(s.toLowerCase().trim()));
  const missingRequired = required.filter((s) => !cSkillSet.has(s.toLowerCase().trim()));

  const matchedPreferred = preferred.filter((s) => cSkillSet.has(s.toLowerCase().trim()));
  const missingPreferred = preferred.filter((s) => !cSkillSet.has(s.toLowerCase().trim()));

  const reqRatio = required.length > 0 ? matchedRequired.length / required.length : 1;
  const prefRatio = preferred.length > 0 ? matchedPreferred.length / preferred.length : 1;

  // Weighted score: 75% required skills, 25% preferred skills
  const weightedScore = Math.round((reqRatio * 0.75 + prefRatio * 0.25) * 100);

  return {
    overallMatchScore: weightedScore,
    skillMatchScore: Math.round(reqRatio * 100),
    matchedSkills: [...matchedRequired, ...matchedPreferred],
    missingSkills: missingRequired,
    preferredMissingSkills: missingPreferred,
  };
};

/**
 * Recommend top matching jobs for a candidate
 */
export const recommendJobsForCandidate = async ({
  candidateId,
  candidateSkills = [],
  limit = 10,
}) => {
  const activeJobs = await Job.find({ status: 'Active' }).populate('employer');

  const scoredJobs = activeJobs.map((job) => {
    const matchAnalysis = calculateCandidateJobMatch(candidateSkills, job);
    return {
      job,
      ...matchAnalysis,
    };
  });

  // Sort by highest match score first
  scoredJobs.sort((a, b) => b.overallMatchScore - a.overallMatchScore);

  const topJobs = scoredJobs.slice(0, Number(limit));

  // Log top recommendation if candidateId is provided
  if (candidateId && topJobs.length > 0) {
    const bestMatch = topJobs[0];
    await RecommendationLog.create({
      candidateId,
      targetJobId: bestMatch.job._id,
      overallMatchScore: bestMatch.overallMatchScore,
      skillMatchScore: bestMatch.skillMatchScore,
      matchedSkills: bestMatch.matchedSkills,
      missingSkills: bestMatch.missingSkills,
      confidenceScore: Math.max(70, bestMatch.overallMatchScore),
      recommendationReasoning: `Matched ${bestMatch.matchedSkills.length} requisite competencies for ${bestMatch.job.title}. Focus on ${bestMatch.missingSkills.slice(0, 3).join(', ') || 'interview preparation'} to achieve 100% readiness.`,
    });
  }

  return topJobs;
};

/**
 * Recommend best-fit career pathways based on candidate skills and aspirations
 */
export const recommendCareerPaths = async ({ candidateSkills = [], aspirations = '' }) => {
  const cSkillSet = new Set(candidateSkills.map((s) => s.toLowerCase().trim()));

  const evaluatedPaths = STANDARD_CAREER_TRACKS.map((track) => {
    const matched = track.skills.filter((s) => cSkillSet.has(s.toLowerCase().trim()));
    const missing = track.skills.filter((s) => !cSkillSet.has(s.toLowerCase().trim()));
    const readinessScore = Math.round((matched.length / track.skills.length) * 100);

    let readinessStatus = 'Developing';
    if (readinessScore >= 75) readinessStatus = 'Job Ready';
    else if (readinessScore >= 50) readinessStatus = 'High Potential';

    const estimatedWeeks = Math.max(2, Math.ceil(missing.length * 1.5));

    return {
      role: track.role,
      domain: track.domain,
      description: track.description,
      readinessScore,
      readinessStatus,
      matchedSkills: matched,
      missingSkills: missing,
      estimatedWeeksToReadiness: estimatedWeeks,
    };
  });

  evaluatedPaths.sort((a, b) => b.readinessScore - a.readinessScore);
  return evaluatedPaths;
};

/**
 * Retrieve past recommendation audit logs for a candidate
 */
export const getRecommendationHistory = async (candidateId) => {
  const history = await RecommendationLog.find({ candidateId })
    .populate('targetJobId')
    .sort({ createdAt: -1 })
    .limit(20);

  return history;
};
