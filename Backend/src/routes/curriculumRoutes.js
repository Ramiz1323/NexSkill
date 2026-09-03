import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import curriculumService from '../services/curriculumService.js';

const router = Router();

// Catalog of industry curricula
router.get(
  '/industry',
  asyncHandler(async (req, res) => {
    const data = await curriculumService.getIndustryCurriculums(req.query);
    return res.status(200).json(new ApiResponse(200, data, 'Industry curriculums fetched successfully'));
  })
);

router.get(
  '/industry/:id',
  asyncHandler(async (req, res) => {
    const data = await curriculumService.getCurriculumById(req.params.id);
    return res.status(200).json(new ApiResponse(200, data, 'Curriculum details fetched'));
  })
);

// Student Skill Gap calculation endpoint (used by frontend dynamic curriculum)
router.get(
  '/skill-gap',
  asyncHandler(async (req, res) => {
    const { studentId, targetRole } = req.query;
    const data = await curriculumService.calculateSkillGap(studentId, targetRole);
    return res.status(200).json(new ApiResponse(200, data, 'Skill gap evaluated successfully'));
  })
);

// Adaptive learning roadmap
router.get(
  '/adaptive-path',
  asyncHandler(async (req, res) => {
    const { studentId, targetRole } = req.query;
    const data = await curriculumService.generateAdaptiveLearningPath(studentId, targetRole);
    return res.status(200).json(new ApiResponse(200, data, 'Adaptive learning path generated'));
  })
);

// Industry Feedback Submission
router.post(
  '/feedback',
  asyncHandler(async (req, res) => {
    const feedback = await curriculumService.submitCurriculumFeedback(req.body);
    return res.status(201).json(new ApiResponse(201, feedback, 'Feedback received and recorded'));
  })
);

export default router;
