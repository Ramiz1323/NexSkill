import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const router = Router();

let credentialsStore = [
  { id: 'cred-1', title: 'Full-Stack Cloud Readiness Credential', issuer: 'NexSkill & AWS Industry Alliance', issueDate: 'March 2026', verified: true },
  { id: 'cred-2', title: 'AI Systems & RAG Diagnostics Certification', issuer: 'NASSCOM FutureSkills Prime', issueDate: 'Feb 2026', verified: true },
  { id: 'cred-3', title: 'Enterprise Backend Microservices Badge', issuer: 'NexSkill Technical Committee', issueDate: 'Jan 2026', verified: true },
];

let defaultSkillProgress = [
  { id: 1, skillName: 'React 19 & State Architecture', proficiency: 92, status: 'Verified' },
  { id: 2, skillName: 'Node.js Microservices & REST', proficiency: 88, status: 'Verified' },
  { id: 3, skillName: 'Cloud & Docker Containerization', proficiency: 75, status: 'Verified' },
  { id: 4, skillName: 'LangChain & RAG Pipelines', proficiency: 82, status: 'Verified' },
  { id: 5, skillName: 'PostgreSQL Database Indexing', proficiency: 70, status: 'Remediated' },
  { id: 6, skillName: 'Kubernetes Orchestration & Helm', proficiency: 50, status: 'In Progress' },
];

// 1. Get Base Progress Data (for /api/progress and /api/progress/)
router.get(
  ['/', '/overview'],
  asyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          overallProgress: 78,
          credentials: credentialsStore,
          skillProgress: defaultSkillProgress,
          readinessCategory: 'Job Ready (Accelerated Track)',
          weeklyStudyHours: 18.5,
          verifiedBadgesCount: credentialsStore.length,
        },
        'Candidate progress data retrieved successfully'
      )
    );
  })
);

// 2. Get Credentials / Add Credentials
router.route(['/credentials', '/credential'])
  .get(
    asyncHandler(async (req, res) => {
      return res.status(200).json(
        new ApiResponse(200, { credentials: credentialsStore }, 'Credentials fetched')
      );
    })
  )
  .post(
    asyncHandler(async (req, res) => {
      const { title, issuer, issueDate, credentialUrl } = req.body;
      const newCred = {
        id: `cred-${Date.now()}`,
        title: title || 'Verified Technical Credential',
        issuer: issuer || 'NexSkill Industry Alliance',
        issueDate: issueDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        credentialUrl: credentialUrl || '',
        verified: true,
      };
      credentialsStore.push(newCred);

      return res.status(201).json(
        new ApiResponse(201, { credential: newCred, credentials: credentialsStore }, 'Credential saved and verified')
      );
    })
  );

// 3. Get Student Specific Progress
router.get(
  '/student/:studentId',
  asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const progressData = {
      studentId,
      overallReadiness: 78,
      readinessCategory: 'Job Ready (Accelerated Track)',
      completedModulesCount: 14,
      totalModulesCount: 18,
      verifiedBadgesCount: credentialsStore.length,
      weeklyStudyHours: 18.5,
      skillProficiencyScore: 84,
      targetRole: 'Full-Stack AI Developer',
      radarMetrics: [
        { subject: 'System Design', value: 80, fullMark: 100 },
        { subject: 'Frontend React', value: 92, fullMark: 100 },
        { subject: 'Backend Node', value: 88, fullMark: 100 },
        { subject: 'Cloud & Docker', value: 75, fullMark: 100 },
        { subject: 'AI Integration', value: 82, fullMark: 100 },
        { subject: 'Database Opt.', value: 70, fullMark: 100 },
      ],
      recentMilestones: [
        { id: 1, title: 'Passed Live System Architecture Assessment', date: '2026-03-01', score: '94%' },
        { id: 2, title: 'Remediated MongoDB Indexing Skill Gap', date: '2026-02-24', score: '100%' },
        { id: 3, title: 'Earned Cloud Deployment Micro-Credential', date: '2026-02-18', score: 'Verified' },
      ],
    };

    return res.status(200).json(
      new ApiResponse(200, progressData, 'Student progress and credential tracker data retrieved')
    );
  })
);

// 4. Skill Matrix by Student ID
router.get(
  ['/skill-matrix/:studentId', '/matrix/:studentId'],
  asyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse(200, defaultSkillProgress, 'Student skill matrix retrieved')
    );
  })
);

// 5. Log Learning Progress
router.post(
  '/log-learning',
  asyncHandler(async (req, res) => {
    const { studentId, moduleId, timeSpentMinutes, score } = req.body;

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          studentId,
          moduleId,
          timeSpentMinutes,
          score,
          loggedAt: new Date().toISOString(),
          status: 'Recorded',
        },
        'Learning progress logged successfully'
      )
    );
  })
);

export default router;
