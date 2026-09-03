import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { EmergingSkill } from '../modules/emergingSkills/emergingSkills.model.js';

const router = Router();

// 1. Skill Demand Forecast Projections (1Y, 3Y, 5Y Horizon)
router.get(
  '/projections',
  asyncHandler(async (req, res) => {
    const horizon = req.query.horizon || '5Y';
    const dbSkills = await EmergingSkill.find().lean();

    if (dbSkills && dbSkills.length > 0) {
      const formatted = dbSkills.map((s) => ({
        skill: s.skillName,
        growth2026: s.projectedGrowthRate || Math.round((s.demandForecastScore || 70) * 0.8),
        growth2028: Math.round((s.projectedGrowthRate || 60) * 1.5),
        riskScore: s.displacementRiskScore > 50 ? 'High Risk' : s.displacementRiskScore > 25 ? 'Moderate' : 'Low',
        adoption: s.adoptionRate > 75 ? 'Hypergrowth' : s.adoptionRate > 50 ? 'Mainstream Standard' : 'Rapid Growth',
      }));
      return res.status(200).json(
        new ApiResponse(200, formatted, `Projections fetched for ${horizon} horizon`)
      );
    }

    const projections = [
      { skill: 'Generative AI & LLM Systems', growth2026: 88, growth2028: 145, riskScore: 'Low', adoption: 'Hypergrowth' },
      { skill: 'Kubernetes & Cloud Orchestration', growth2026: 72, growth2028: 110, riskScore: 'Very Low', adoption: 'Mainstream Standard' },
      { skill: 'Cybersecurity Threat Modeling', growth2026: 65, growth2028: 98, riskScore: 'Low', adoption: 'Mandatory' },
      { skill: 'Rust & Systems Optimization', growth2026: 54, growth2028: 85, riskScore: 'Moderate', adoption: 'Rapid Growth' },
      { skill: 'Distributed Ledger & Smart Contracts', growth2026: 42, growth2028: 68, riskScore: 'Moderate', adoption: 'Selective' },
      { skill: 'Legacy Monolithic Maintenance', growth2026: -28, growth2028: -64, riskScore: 'High Risk', adoption: 'Declining' },
    ];

    return res.status(200).json(
      new ApiResponse(200, projections, `Skill forecast projections for ${horizon} horizon`)
    );
  })
);

// 2. Emerging Tech Roles Forecast
router.get(
  '/emerging-roles',
  asyncHandler(async (req, res) => {
    const roles = [
      { title: 'AI Ethics & Alignment Auditor', demandIndex: 94, requiredCore: ['LLM Evaluation', 'Bias Detection', 'Python', 'Governance'] },
      { title: 'Platform & FinOps Engineer', demandIndex: 89, requiredCore: ['Kubernetes', 'AWS Cost Explorer', 'Prometheus', 'Terraform'] },
      { title: 'Quantum Algorithm Specialist', demandIndex: 76, requiredCore: ['Qiskit', 'Linear Algebra', 'Python', 'Quantum Circuit Design'] },
      { title: 'Autonomous Agent Orchestrator', demandIndex: 96, requiredCore: ['LangChain', 'CrewAI', 'Vector DBs', 'FastAPI'] },
    ];

    return res.status(200).json(
      new ApiResponse(200, roles, 'Emerging roles forecast fetched successfully')
    );
  })
);

// 3. Automation Impact & Risk Analysis
router.get(
  ['/automation-risk', '/automation-impact'],
  asyncHandler(async (req, res) => {
    const analysis = [
      { sector: 'Manual Software QA & Basic Scripting', displacementProbability: 68, mitigationStrategy: 'Upskill to AI-augmented Test Automation & Security QA' },
      { sector: 'Level-1 Helpdesk & Ticket Routing', displacementProbability: 74, mitigationStrategy: 'Shift to Site Reliability Engineering & Cloud Operations' },
      { sector: 'Complex Cloud Architecture', displacementProbability: 12, mitigationStrategy: 'Safe tier with high human strategic decision-making' },
      { sector: 'Applied Machine Learning Engineering', displacementProbability: 8, mitigationStrategy: 'Safe tier with frontier algorithmic design' },
    ];

    return res.status(200).json(
      new ApiResponse(200, analysis, 'Automation impact analysis fetched successfully')
    );
  })
);

export default router;
