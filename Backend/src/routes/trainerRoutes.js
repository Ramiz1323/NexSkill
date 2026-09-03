import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const router = Router();

// Faculty Programs In-Memory / DB Store
let trainerPrograms = [
  {
    id: 'tp-1',
    _id: 'tp-1',
    title: 'Modern Cloud Architecture & Kubernetes Masterclass for Faculty',
    category: 'Faculty Upskilling',
    mode: 'Hybrid',
    partner: 'AWS Academy & NexSkill Industry Alliance',
    duration: '6 Weeks',
    seats: 40,
    description: 'Empowers professors and technical trainers with modern DevOps and cloud native infrastructure pedagogical tools.',
    syllabus: ['Microservices Design Patterns', 'Container Orchestration with K8s', 'Continuous Delivery Pipelines', 'Pedagogy & Hands-on Lab Setup'],
    prerequisites: 'Basic knowledge of Linux and command-line interfaces.',
  },
  {
    id: 'tp-2',
    _id: 'tp-2',
    title: 'Enterprise AI & Large Language Models Curriculum Delivery',
    category: 'Advanced Technical Training',
    mode: 'Online',
    partner: 'OpenAI Academic Initiative',
    duration: '4 Weeks',
    seats: 60,
    description: 'Hands-on pedagogy training for college educators to teach generative AI, vector retrieval, and prompt engineering.',
    syllabus: ['Foundations of Transformer Architectures', 'RAG Design & Vector Embeddings', 'Model Evaluation & Ethical AI Guardrails', 'Grading Practical AI Projects'],
    prerequisites: 'Proficiency in Python and basic data structures.',
  },
  {
    id: 'tp-3',
    _id: 'tp-3',
    title: 'Full-Stack JavaScript & Modern Web Standards',
    category: 'Core Engineering Upskilling',
    mode: 'On-site',
    partner: 'NASSCOM FutureSkills Prime',
    duration: '5 Weeks',
    seats: 30,
    description: 'Industry-aligned bootcamp for computer science faculty covering React 19, Node.js, and automated unit testing.',
    syllabus: ['Modern React & State Architecture', 'RESTful & GraphQL API Design', 'Database Modeling & Query Optimization', 'Setting up Industry Capstone Rubrics'],
    prerequisites: 'Prior experience teaching Web Development or OOP.',
  },
];

let trainerCertifications = [
  {
    id: 'cert-1',
    title: 'Certified Cloud Computing Educator (CCCE)',
    name: 'Certified Cloud Computing Educator (CCCE)',
    issuer: 'NexSkill & AWS Academic Alliance',
    status: 'Verified Badge',
    issuedDate: '2026-02-15',
  },
  {
    id: 'cert-2',
    title: 'Advanced AI Curriculum Instructor (AACI)',
    name: 'Advanced AI Curriculum Instructor (AACI)',
    issuer: 'NASSCOM FutureSkills Prime',
    status: 'Active',
    issuedDate: '2026-01-20',
  },
];

// 1. Get Programs List with Search & Filtering
router.get(
  '/programs',
  asyncHandler(async (req, res) => {
    const { category, mode, search } = req.query;
    let filtered = [...trainerPrograms];

    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (mode) {
      filtered = filtered.filter((p) => p.mode.toLowerCase() === mode.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.partner?.toLowerCase().includes(q)
      );
    }

    return res.status(200).json(
      new ApiResponse(200, { programs: filtered }, 'Trainer programs fetched successfully')
    );
  })
);

// 2. Get Program Details
router.get(
  '/programs/:id',
  asyncHandler(async (req, res) => {
    const program = trainerPrograms.find((p) => p.id === req.params.id || p._id === req.params.id);
    if (!program) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainer program not found'));
    }
    return res.status(200).json(
      new ApiResponse(200, { program }, 'Program details fetched successfully')
    );
  })
);

// 3. Enroll Faculty
router.post(
  ['/programs/:id/enroll', '/enroll'],
  asyncHandler(async (req, res) => {
    const programId = req.params.id || req.body.programId;
    const program = trainerPrograms.find((p) => p.id === programId || p._id === programId) || {
      id: programId,
      title: 'Industry Faculty Upskilling Program',
    };

    return res.status(201).json(
      new ApiResponse(
        201,
        { program: { ...program, isEnrolled: true, enrolledAt: new Date().toISOString() } },
        'Faculty successfully enrolled in program'
      )
    );
  })
);

// 4. Get Certifications
router.get(
  '/certifications',
  asyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse(200, { certifications: trainerCertifications }, 'Trainer certifications fetched')
    );
  })
);

export default router;
