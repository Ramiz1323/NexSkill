import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const router = Router();

// 1. Get Student Progress
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
      verifiedBadgesCount: 6,
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
