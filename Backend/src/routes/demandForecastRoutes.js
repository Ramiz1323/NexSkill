import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { EmergingSkill } from '../modules/emergingSkills/emergingSkills.model.js';

const router = Router();

// 1. Skill Demand Forecast Projections (1Y, 3Y, 5Y, 10Y Horizon)
router.get(
  ['/projections', '/forecast'],
  asyncHandler(async (req, res) => {
    const horizon = req.query.horizon || '5Y';
    const horizonMultiplier =
      horizon === '1Y' ? 0.6 :
      horizon === '3Y' ? 1.0 :
      horizon === '10Y' ? 2.2 :
      1.5;

    let dbSkills = [];
    try {
      dbSkills = await EmergingSkill.find().lean();
    } catch (err) {
      console.warn('⚠️ EmergingSkill query failed, using telemetry models:', err.message);
    }

    if (dbSkills && dbSkills.length > 0) {
      const formatted = dbSkills.map((s) => ({
        skill: s.skillName,
        growth2026: Math.round((s.projectedGrowthRate || Math.round((s.demandForecastScore || 70) * 0.8)) * (horizon === '1Y' ? 0.7 : 1)),
        growth2028: Math.round((s.projectedGrowthRate || 60) * horizonMultiplier),
        riskScore: s.displacementRiskScore > 50 ? 'High Risk' : s.displacementRiskScore > 25 ? 'Moderate' : 'Low',
        adoption: s.adoptionRate > 75 ? 'Hypergrowth' : s.adoptionRate > 50 ? 'Mainstream Standard' : 'Rapid Growth',
      }));
      return res.status(200).json(
        new ApiResponse(200, formatted, `Projections fetched for ${horizon} horizon`)
      );
    }

    const baseProjections = [
      { skill: 'Generative AI & LLM Systems', growth2026: 88, base2028: 145, riskScore: 'Low', adoption: 'Hypergrowth' },
      { skill: 'Kubernetes & Cloud Orchestration', growth2026: 72, base2028: 110, riskScore: 'Very Low', adoption: 'Mainstream Standard' },
      { skill: 'Cybersecurity Threat Modeling', growth2026: 65, base2028: 98, riskScore: 'Low', adoption: 'Mandatory' },
      { skill: 'Rust & Systems Optimization', growth2026: 54, base2028: 85, riskScore: 'Moderate', adoption: 'Rapid Growth' },
      { skill: 'Distributed Ledger & Smart Contracts', growth2026: 42, base2028: 68, riskScore: 'Moderate', adoption: 'Selective' },
      { skill: 'Legacy Monolithic Maintenance', growth2026: -28, base2028: -64, riskScore: 'High Risk', adoption: 'Declining' },
    ];

    const projections = baseProjections.map((p) => ({
      skill: p.skill,
      growth2026: Math.round(p.growth2026 * (horizon === '1Y' ? 0.7 : 1)),
      growth2028: Math.round(p.base2028 * (horizonMultiplier / 1.5)),
      riskScore: p.riskScore,
      adoption: p.adoption,
    }));

    return res.status(200).json(
      new ApiResponse(200, projections, `Skill forecast projections for ${horizon} horizon`)
    );
  })
);

// 2. Emerging Tech Roles Forecast
router.get(
  ['/emerging-roles', '/roles'],
  asyncHandler(async (req, res) => {
    const horizon = req.query.horizon || '5Y';
    const roleMultiplier =
      horizon === '1Y' ? 0.9 :
      horizon === '3Y' ? 0.96 :
      horizon === '10Y' ? 1.05 :
      1.0;

    const roles = [
      { title: 'AI Ethics & Alignment Auditor', demandIndex: Math.min(100, Math.round(94 * roleMultiplier)), requiredCore: ['LLM Evaluation', 'Bias Detection', 'Python', 'Governance'] },
      { title: 'Platform & FinOps Engineer', demandIndex: Math.min(100, Math.round(89 * roleMultiplier)), requiredCore: ['Kubernetes', 'AWS Cost Explorer', 'Prometheus', 'Terraform'] },
      { title: 'Quantum Algorithm Specialist', demandIndex: Math.min(100, Math.round(76 * roleMultiplier)), requiredCore: ['Qiskit', 'Linear Algebra', 'Python', 'Quantum Circuit Design'] },
      { title: 'Autonomous Multi-Agent Orchestrator', demandIndex: Math.min(100, Math.round(96 * roleMultiplier)), requiredCore: ['LangChain', 'CrewAI', 'Vector DBs', 'FastAPI'] },
    ];

    return res.status(200).json(
      new ApiResponse(200, roles, 'Emerging roles forecast fetched successfully')
    );
  })
);

// 3. Automation Impact / Automation Risk Analysis (Supports both /automation-risk and /automation-impact)
router.get(
  ['/automation-risk', '/automation-impact'],
  asyncHandler(async (req, res) => {
    const horizon = req.query.horizon || '5Y';
    const riskMultiplier =
      horizon === '1Y' ? 0.85 :
      horizon === '3Y' ? 0.95 :
      horizon === '10Y' ? 1.15 :
      1.0;

    const analysis = [
      { sector: 'Manual Software QA & Basic Scripting', displacementProbability: Math.min(99, Math.round(68 * riskMultiplier)), mitigationStrategy: 'Upskill to AI-augmented Test Automation & Security QA' },
      { sector: 'Level-1 Helpdesk & Ticket Routing', displacementProbability: Math.min(99, Math.round(74 * riskMultiplier)), mitigationStrategy: 'Shift to Site Reliability Engineering & Cloud Operations' },
      { sector: 'Complex Cloud Architecture', displacementProbability: Math.min(99, Math.round(12 * riskMultiplier)), mitigationStrategy: 'Safe tier with high human strategic decision-making' },
      { sector: 'Applied Machine Learning Engineering', displacementProbability: Math.min(99, Math.round(8 * riskMultiplier)), mitigationStrategy: 'Safe tier with frontier algorithmic design' },
    ];

    return res.status(200).json(
      new ApiResponse(200, analysis, 'Automation risk & impact analysis fetched successfully')
    );
  })
);

export default router;
