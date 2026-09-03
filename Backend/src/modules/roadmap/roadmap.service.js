import Roadmap from './roadmap.model.js';
import Course from '../courses/courses.model.js';

/**
 * Generate a multi-week personalized learning roadmap based on detected skill gaps
 */
export const generatePersonalizedRoadmap = async ({
  studentId,
  targetRole,
  currentSkills = [],
  targetSkills = [],
  skillGaps: providedGaps,
  targetWeeks = 8,
}) => {
  // Normalize skills to lowercase for comparison
  const currentSet = new Set(currentSkills.map((s) => s.toLowerCase().trim()));

  // Detect skill gaps if not provided
  const detectedGaps = providedGaps && providedGaps.length > 0
    ? providedGaps
    : targetSkills.filter((s) => !currentSet.has(s.toLowerCase().trim()));

  // Query relevant courses for the missing skills
  const relevantCourses = await Course.find({
    skillsTaught: { $in: detectedGaps.map((g) => new RegExp(g, 'i')) },
  }).limit(12);

  const totalWeeks = Math.max(4, Math.min(16, Number(targetWeeks) || 8));
  const milestones = [];

  // Group detected gaps across the total weeks
  const gapsCount = detectedGaps.length;
  const gapsPerPhase = Math.max(1, Math.ceil(gapsCount / 4));

  for (let week = 1; week <= totalWeeks; week++) {
    const phaseIndex = Math.floor(((week - 1) / totalWeeks) * 4);
    let title = `Week ${week}: Core Concepts`;
    let focusArea = 'Foundations';

    if (phaseIndex === 0) {
      title = `Week ${week}: Foundations & Syntax Prerequisites`;
      focusArea = 'Foundations & Tooling';
    } else if (phaseIndex === 1) {
      title = `Week ${week}: Applied Development & Intermediate Patterns`;
      focusArea = 'Hands-on Implementation';
    } else if (phaseIndex === 2) {
      title = `Week ${week}: Production Architecture & Best Practices`;
      focusArea = 'Industry Standards';
    } else {
      title = `Week ${week}: Capstone Integration & Interview Readiness`;
      focusArea = 'Portfolio Capstone';
    }

    const assignedGaps = detectedGaps.slice(
      phaseIndex * gapsPerPhase,
      (phaseIndex + 1) * gapsPerPhase
    );

    const weekCourses = relevantCourses.slice((week - 1) % 4, ((week - 1) % 4) + 2);

    milestones.push({
      weekNumber: week,
      title,
      focusArea,
      learningObjectives: assignedGaps.length > 0
        ? assignedGaps.map((g) => `Master core capabilities and syntax for ${g}`)
        : [`Deepen practical knowledge in ${targetRole} workflows`],
      recommendedCourseIds: weekCourses.map((c) => c._id),
      recommendedCourses: weekCourses.map((c) => ({
        title: c.title,
        provider: c.provider,
        url: c.url,
        durationHours: c.durationHours,
      })),
      handsOnProject: {
        title: `${focusArea} Mini-Project`,
        description: `Build a functional demonstration utilizing ${assignedGaps.join(', ') || targetRole}`,
        deliverable: `GitHub repository with automated tests and documentation`,
      },
      isCompleted: false,
    });
  }

  const roadmap = await Roadmap.create({
    studentId,
    targetRole,
    currentSkills,
    targetSkills,
    skillGaps: detectedGaps,
    totalWeeks,
    weeklyMilestones: milestones,
    progressPercentage: 0,
    status: 'Active',
  });

  return roadmap.populate('weeklyMilestones.recommendedCourseIds');
};

/**
 * Retrieve roadmap by ID
 */
export const getRoadmapById = async (roadmapId) => {
  const roadmap = await Roadmap.findById(roadmapId).populate(
    'weeklyMilestones.recommendedCourseIds'
  );
  return roadmap;
};

/**
 * Retrieve active roadmaps for a student
 */
export const getRoadmapsByStudent = async (studentId) => {
  const roadmaps = await Roadmap.find({ studentId })
    .populate('weeklyMilestones.recommendedCourseIds')
    .sort({ createdAt: -1 });
  return roadmaps;
};

/**
 * Update milestone completion status and recalculate progress %
 */
export const updateMilestoneStatus = async (roadmapId, weekNumber, isCompleted) => {
  const roadmap = await Roadmap.findById(roadmapId);
  if (!roadmap) return null;

  const milestone = roadmap.weeklyMilestones.find(
    (m) => m.weekNumber === Number(weekNumber)
  );
  if (!milestone) return null;

  milestone.isCompleted = Boolean(isCompleted);

  // Recalculate progress %
  const completedCount = roadmap.weeklyMilestones.filter((m) => m.isCompleted).length;
  const totalCount = roadmap.weeklyMilestones.length;
  roadmap.progressPercentage = Math.round((completedCount / totalCount) * 100);

  if (roadmap.progressPercentage === 100) {
    roadmap.status = 'Completed';
  } else if (roadmap.status === 'Completed') {
    roadmap.status = 'Active';
  }

  await roadmap.save();
  return roadmap.populate('weeklyMilestones.recommendedCourseIds');
};

/**
 * Delete roadmap
 */
export const deleteRoadmap = async (roadmapId) => {
  const roadmap = await Roadmap.findByIdAndDelete(roadmapId);
  return roadmap;
};
