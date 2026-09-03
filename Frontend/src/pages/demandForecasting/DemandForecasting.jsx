import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Calendar,
  ShieldCheck,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import {
  fetchSkillForecast,
  fetchEmergingRoles,
  fetchAutomationAnalysis,
  setForecastHorizon,
  clearDemandErrors,
} from '../../redux/slices/demandSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

export default function DemandForecasting() {
  const dispatch = useDispatch();
  const {
    projections = [],
    emergingRoles = [],
    automationIndex = [],
    forecastHorizon = '5Y',
    loading,
    error,
  } = useSelector((state) => state.demand);

  useEffect(() => {
    dispatch(fetchSkillForecast({ horizon: forecastHorizon }));
    dispatch(fetchEmergingRoles({ horizon: forecastHorizon }));
    dispatch(fetchAutomationAnalysis({ horizon: forecastHorizon }));
  }, [dispatch, forecastHorizon]);

  const handleHorizonChange = (e) => {
    dispatch(setForecastHorizon(e.target.value));
  };

  const handleRefresh = () => {
    dispatch(clearDemandErrors());
    dispatch(fetchSkillForecast({ horizon: forecastHorizon }));
    dispatch(fetchEmergingRoles({ horizon: forecastHorizon }));
    dispatch(fetchAutomationAnalysis({ horizon: forecastHorizon }));
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <LineChart className="w-3.5 h-3.5" />
            <span>Module 7: Future Demand Forecasting & Automation Risk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Future-Ready Demand Forecasting Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Predictive labor market analytics, multi-year skill growth projections, and automation risk mitigation.
          </p>
        </div>

        {/* Horizon Picker */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <Calendar className="w-4 h-4 text-indigo-600 ml-2" />
          <select
            value={forecastHorizon}
            onChange={handleHorizonChange}
            className="p-1.5 text-xs font-bold text-slate-700 bg-transparent outline-none cursor-pointer"
          >
            <option value="1Y">1-Year Horizon (2027)</option>
            <option value="3Y">3-Year Horizon (2029)</option>
            <option value="5Y">5-Year Horizon (2031)</option>
            <option value="10Y">10-Year Long Range (2036)</option>
          </select>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="p-4 border border-rose-200 bg-rose-50 text-rose-700 rounded-2xl flex justify-between items-center text-xs">
          <span>{error}</span>
          <Button variant="secondary" size="sm" onClick={() => dispatch(clearDemandErrors())}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Projections Table & Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">Multi-Year Skill Trajectory Models</h2>
          <span className="text-xs text-slate-500 font-semibold">Forecast Model: ARIMA + LLM Synthesis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(projections && projections.length > 0 ? projections : [
            { skill: 'Generative AI & LLM Systems', growth2026: 88, growth2028: 145, riskScore: 'Low', adoption: 'Hypergrowth' },
            { skill: 'Kubernetes & Cloud Orchestration', growth2026: 72, growth2028: 110, riskScore: 'Very Low', adoption: 'Mainstream Standard' },
            { skill: 'Cybersecurity Threat Modeling', growth2026: 65, growth2028: 98, riskScore: 'Low', adoption: 'Mandatory' },
            { skill: 'Rust & Systems Optimization', growth2026: 54, growth2028: 85, riskScore: 'Moderate', adoption: 'Rapid Growth' },
            { skill: 'Distributed Ledger & Smart Contracts', growth2026: 42, growth2028: 68, riskScore: 'Moderate', adoption: 'Selective' },
            { skill: 'Legacy Monolithic Maintenance', growth2026: -28, growth2028: -64, riskScore: 'High Risk', adoption: 'Declining' },
          ]).map((p, idx) => (
            <Card key={idx} className="p-5 border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                    p.growth2026 > 60 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    p.growth2026 > 0 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                    'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {p.adoption || 'Tracked'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Risk: {p.riskScore}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{p.skill || p.skillName}</h3>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Short Horizon</span>
                    <strong className={p.growth2026 > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {p.growth2026 > 0 ? `+${p.growth2026}%` : `${p.growth2026}%`} YoY
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">5-Year Projected</span>
                    <strong className={p.growth2028 > 0 ? 'text-indigo-600' : 'text-rose-600'}>
                      {p.growth2028 > 0 ? `+${p.growth2028}%` : `${p.growth2028}%`} Total
                    </strong>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Two-Column: Emerging Roles & Automation Displacement Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emerging Roles */}
        <Card title="High-Velocity Emerging Job Roles" subtitle="New titles generated from industry macro demand">
          <div className="space-y-3.5 pt-1">
            {(emergingRoles && emergingRoles.length > 0 ? emergingRoles : [
              { title: 'AI Ethics & Alignment Auditor', demandIndex: 94, requiredCore: ['LLM Evaluation', 'Bias Detection', 'Python'] },
              { title: 'Platform & FinOps Engineer', demandIndex: 89, requiredCore: ['Kubernetes', 'AWS Cost Explorer', 'Prometheus'] },
              { title: 'Autonomous Multi-Agent Orchestrator', demandIndex: 96, requiredCore: ['LangChain', 'CrewAI', 'Vector DBs'] },
            ]).map((r, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <strong className="text-slate-900 text-sm">{r.title}</strong>
                  <span className="badge-emerald px-2 py-0.5 rounded-md text-xs font-bold">
                    {r.demandIndex}/100 Demand
                  </span>
                </div>
                {r.requiredCore && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {r.requiredCore.map((c, cIdx) => (
                      <span key={cIdx} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md font-medium text-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Automation Displacement Mitigation */}
        <Card title="Automation Impact & Displacement Mitigation" subtitle="Vulnerability indexing and strategic remediation plans">
          <div className="space-y-3.5 pt-1">
            {(automationIndex && automationIndex.length > 0 ? automationIndex : [
              { sector: 'Manual Software QA & Basic Scripting', displacementProbability: 68, mitigationStrategy: 'Upskill to AI-augmented Test Automation & Security QA' },
              { sector: 'Level-1 Helpdesk & Ticket Routing', displacementProbability: 74, mitigationStrategy: 'Shift to Site Reliability Engineering & Cloud Operations' },
              { sector: 'Complex Cloud Architecture', displacementProbability: 12, mitigationStrategy: 'Safe tier with high human strategic decision-making' },
            ]).map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <strong className="text-slate-900">{item.sector}</strong>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    item.displacementProbability > 50
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {item.displacementProbability}% Risk Index
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Mitigation:</strong> {item.mitigationStrategy}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
