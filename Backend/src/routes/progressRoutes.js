import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const router = Router();

// In-memory store for credentials
let storedCredentials = [
  {
    id: 'cred-1',
    title: 'Full-Stack Cloud Readiness Credential',
    issuer: 'NexSkill & AWS Industry Alliance',
    issueDate: 'March 2026',
    verified: true,
    credentialUrl: 'https://credentials.nexskill.org/cert/aws-cloud-2026',
  },
  {
    id: 'cred-2',
    title: 'AI Systems & RAG Diagnostics Certification',
    issuer: 'NASSCOM FutureSkills Prime',
    issueDate: 'Feb 2026',
    verified: true,
    credentialUrl: 'https://credentials.nexskill.org/cert/nasscom-ai-2026',
  },
  {
    id: 'cred-3',
    title: 'Enterprise Backend Microservices Badge',
    issuer: 'NexSkill Technical Committee',
    issueDate: 'Jan 2026',
    verified: true,
    credentialUrl: 'https://credentials.nexskill.org/cert/microservices-2026',
  },
];

// 1. Get Progress Telemetry (Supports GET /progress and GET /progress/student/:studentId)
router.get(
  ['/', '/student', '/student/:studentId'],
  asyncHandler(async (req, res) => {
    const studentId = req.params.studentId || req.user?.id || 'demo-student';

    const progressData = {
      studentId,
      overallProgress: 82,
      overallReadiness: 82,
      readinessCategory: 'Job Ready (Accelerated Track)',
      completedModulesCount: 14,
      totalModulesCount: 18,
      verifiedBadgesCount: storedCredentials.length,
      weeklyStudyHours: 18.5,
      skillProficiencyScore: 84,
      targetRole: 'Full-Stack AI Developer',
      credentials: storedCredentials,
      skillProgress: [
        { skill: 'React 19 & Modern State', progress: 92, level: 'Advanced' },
        { skill: 'Node.js Microservices', progress: 88, level: 'Advanced' },
        { skill: 'AI & LangChain RAG', progress: 85, level: 'Advanced' },
        { skill: 'Docker & Kubernetes', progress: 74, level: 'Intermediate' },
        { skill: 'PostgreSQL & Databases', progress: 70, level: 'Intermediate' },
      ],
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

// 1b. Add New Credential
router.post(
  '/credentials',
  asyncHandler(async (req, res) => {
    const { title, issuer, issueDate, credentialUrl } = req.body;
    const newCredential = {
      id: `cred-${Date.now()}`,
      title: title || 'Verified Professional Credential',
      issuer: issuer || 'NexSkill Industry Partner',
      issueDate: issueDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      verified: true,
      credentialUrl: credentialUrl || '',
    };
    storedCredentials.unshift(newCredential);
    return res.status(201).json(
      new ApiResponse(201, { credential: newCredential, credentials: storedCredentials }, 'Credential added successfully')
    );
  })
);

// 2. Skill Matrix by Student ID
router.get(
  '/skill-matrix/:studentId',
  asyncHandler(async (req, res) => {
    const matrix = [
      { skill: 'React 19', level: 'Advanced', verified: true, score: 92 },
      { skill: 'Node.js Microservices', level: 'Advanced', verified: true, score: 88 },
      { skill: 'Docker Containerization', level: 'Intermediate', verified: true, score: 75 },
      { skill: 'AI & LangChain RAG', level: 'Advanced', verified: true, score: 82 },
      { skill: 'PostgreSQL Database Design', level: 'Intermediate', verified: true, score: 70 },
      { skill: 'Kubernetes Orchestration', level: 'Beginner', verified: false, score: 45 },
    ];

    return res.status(200).json(
      new ApiResponse(200, matrix, 'Student skill matrix retrieved')
    );
  })
);

// 3. Log Learning Progress
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
