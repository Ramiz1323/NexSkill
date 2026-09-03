import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Employer } from '../modules/employers/employers.model.js';

const router = Router();

// In-Memory Fallback Candidates for Live Demos
let fallbackCandidates = [
  {
    id: 'cand-1',
    _id: 'cand-1',
    name: 'Aarav Sharma',
    role: 'Full-Stack Cloud Engineer',
    title: 'Full-Stack Cloud Engineer',
    location: 'Bengaluru, India',
    matchScore: 94,
    readinessScore: 94,
    readinessLevel: 'Industry Ready (Verified)',
    atsScore: 92,
    experienceYears: 2,
    experience: '2 years',
    status: 'Shortlisted',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    bio: 'Specialized in scalable React 19 web applications, Node.js microservices, and Dockerized Kubernetes deployment pipelines.',
    skills: ['React', 'Node.js', 'Kubernetes', 'Docker', 'PostgreSQL', 'TypeScript'],
    verifiedBadges: 4,
    isShortlisted: true,
  },
  {
    id: 'cand-2',
    _id: 'cand-2',
    name: 'Priya Venkatesh',
    role: 'AI & Data Systems Specialist',
    title: 'AI & Data Systems Specialist',
    location: 'Hyderabad, India',
    matchScore: 91,
    readinessScore: 91,
    readinessLevel: 'Industry Ready (Verified)',
    atsScore: 89,
    experienceYears: 1,
    experience: '1 year',
    status: 'New',
    email: 'priya.v@example.com',
    phone: '+91 98123 45678',
    bio: 'Expertise in building retrieval-augmented generation pipelines, vector databases, and fine-tuning PyTorch models.',
    skills: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Qdrant', 'AWS'],
    verifiedBadges: 3,
    isShortlisted: false,
  },
  {
    id: 'cand-3',
    _id: 'cand-3',
    name: 'Rohan Deshmukh',
    role: 'DevOps & Site Reliability Engineer',
    title: 'DevOps & Site Reliability Engineer',
    location: 'Pune, India',
    matchScore: 88,
    readinessScore: 88,
    readinessLevel: 'Assessment Passed',
    atsScore: 86,
    experienceYears: 3,
    experience: '3 years',
    status: 'Interview Scheduled',
    email: 'rohan.d@example.com',
    phone: '+91 97654 32109',
    bio: 'Specialist in infrastructure as code, continuous delivery automation, and Prometheus observability metrics.',
    skills: ['Terraform', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Go'],
    verifiedBadges: 5,
    isShortlisted: true,
  },
];

// 1. Search Candidates
router.get(
  '/candidates',
  asyncHandler(async (req, res) => {
    const { search, skills, minScore, experienceLevel, page = 1, limit = 10 } = req.query;

    let results = [...fallbackCandidates];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }

    if (skills) {
      const skillList = skills.split(',').map((s) => s.trim().toLowerCase());
      results = results.filter((c) =>
        skillList.some((s) => c.skills.map((k) => k.toLowerCase()).includes(s))
      );
    }

    if (minScore) {
      results = results.filter((c) => (c.matchScore || 0) >= Number(minScore));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          candidates: results,
          pagination: {
            total: results.length,
            page: Number(page),
            limit: Number(limit),
          },
        },
        'Candidate pool retrieved successfully'
      )
    );
  })
);

// 2. Get Candidate Details
router.get(
  '/candidates/:id',
  asyncHandler(async (req, res) => {
    const candidate = fallbackCandidates.find(
      (c) => c.id === req.params.id || c._id === req.params.id
    );
    if (!candidate) {
      return res.status(404).json(new ApiResponse(404, null, 'Candidate not found'));
    }
    return res.status(200).json(
      new ApiResponse(200, { candidate }, 'Candidate profile retrieved')
    );
  })
);

// 3. Update Status
router.patch(
  '/candidates/:id/status',
  asyncHandler(async (req, res) => {
    const candidate = fallbackCandidates.find(
      (c) => c.id === req.params.id || c._id === req.params.id
    );
    if (candidate) {
      candidate.status = req.body.status;
    }
    return res.status(200).json(
      new ApiResponse(200, { status: req.body.status }, 'Status updated')
    );
  })
);

// 4. Toggle Shortlist
router.post(
  '/candidates/:id/shortlist',
  asyncHandler(async (req, res) => {
    const candidate = fallbackCandidates.find(
      (c) => c.id === req.params.id || c._id === req.params.id
    );
    if (candidate) {
      candidate.isShortlisted = !candidate.isShortlisted;
    }
    return res.status(200).json(
      new ApiResponse(200, { isShortlisted: candidate?.isShortlisted }, 'Shortlist updated')
    );
  })
);

// 5. Job Listings
router.get(
  '/jobs',
  asyncHandler(async (req, res) => {
    const jobs = [
      { id: 'job-1', title: 'Senior Cloud Engineer', company: 'NexSkill Industry Partner', location: 'Bengaluru', applicants: 24 },
      { id: 'job-2', title: 'AI Systems Developer', company: 'AI Labs India', location: 'Hyderabad', applicants: 18 },
    ];
    return res.status(200).json(new ApiResponse(200, { jobs }, 'Employer job listings fetched'));
  })
);

export default router;
