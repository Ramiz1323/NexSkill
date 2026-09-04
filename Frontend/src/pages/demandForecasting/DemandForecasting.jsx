import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  BarChart3,
  Cpu
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

  const getAdoptionBadgeStyle = (adoption = '') => {
    const text = adoption.toLowerCase();
    if (text.includes('hypergrowth')) {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        dot: 'bg-emerald-500',
        icon: Sparkles
      };
    }
    if (text.includes('mainstream') || text.includes('standard')) {
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200/80',
        dot: 'bg-blue-500',
        icon: CheckCircle2
      };
    }
    if (text.includes('mandatory')) {
      return {
        bg: 'bg-purple-50 text-purple-700 border-purple-200/80',
        dot: 'bg-purple-500',
        icon: ShieldCheck
      };
    }
    if (text.includes('rapid') || text.includes('growth')) {
      return {
        bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
        dot: 'bg-indigo-500',
        icon: TrendingUp
      };
    }
    if (text.includes('selective')) {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
        dot: 'bg-amber-500',
        icon: Layers
      };
    }
    if (text.includes('declining')) {
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
        dot: 'bg-rose-500',
        icon: TrendingDown
      };
    }
    return {
      bg: 'bg-slate-50 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      icon: Activity
    };
  };

  const getRiskBadgeStyle = (risk = '') => {
    const text = String(risk).toLowerCase();
    if (text.includes('very low') || text.includes('low')) {
      return {
        bg: 'bg-emerald-50/80 text-emerald-700 border-emerald-200/70',
        dot: 'bg-emerald-500',
        label: risk.startsWith('Risk:') ? risk : `Risk: ${risk}`
      };
    }
    if (text.includes('moderate') || text.includes('medium')) {
      return {
        bg: 'bg-amber-50/80 text-amber-700 border-amber-200/70',
        dot: 'bg-amber-500',
        label: risk.startsWith('Risk:') ? risk : `Risk: ${risk}`
      };
    }
    if (text.includes('high')) {
      return {
        bg: 'bg-rose-50/80 text-rose-700 border-rose-200/70',
        dot: 'bg-rose-500',
        label: risk.startsWith('Risk:') ? risk : `Risk: ${risk}`
      };
    }
    return {
      bg: 'bg-slate-50 text-slate-600 border-slate-200',
      dot: 'bg-slate-400',
      label: risk.startsWith('Risk:') ? risk : `Risk: ${risk}`
    };
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <LineChart className="w-3.5 h-3.5" />
            <span>Future Demand Forecasting & Automation Risk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Future-Ready Demand Forecasting Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Predictive labor market analytics, multi-year skill growth trajectories, and automated risk mitigation models.
          </p>
        </div>

        {/* Action Controls & Horizon Picker */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 sm:flex-initial">
            <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Horizon:</span>
            <select
              value={forecastHorizon}
              onChange={handleHorizonChange}
              className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer pr-2"
            >
              <option value="1Y">1-Year Horizon (2027)</option>
              <option value="3Y">3-Year Horizon (2029)</option>
              <option value="5Y">5-Year Horizon (2031)</option>
              <option value="10Y">10-Year Long Range (2036)</option>
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2 font-semibold shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
            <span>Refresh</span>
          </Button>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Multi-Year Skill Trajectory Models
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirical market projections synthesized from hiring trends and industry shifts.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs font-medium text-slate-600 shrink-0">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            <span>Forecast Model: <strong className="text-slate-800 font-semibold">ARIMA + LLM Synthesis</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
          {(projections && projections.length > 0 ? projections : [
            { skill: 'Generative AI & LLM Systems', growth2026: 88, growth2028: 145, riskScore: 'Low', adoption: 'Hypergrowth' },
            { skill: 'Kubernetes & Cloud Orchestration', growth2026: 72, growth2028: 110, riskScore: 'Very Low', adoption: 'Mainstream Standard' },
            { skill: 'Cybersecurity Threat Modeling', growth2026: 65, growth2028: 98, riskScore: 'Low', adoption: 'Mandatory' },
            { skill: 'Rust & Systems Optimization', growth2026: 54, growth2028: 85, riskScore: 'Moderate', adoption: 'Rapid Growth' },
            { skill: 'Distributed Ledger & Smart Contracts', growth2026: 42, growth2028: 68, riskScore: 'Moderate', adoption: 'Selective' },
            { skill: 'Legacy Monolithic Maintenance', growth2026: -28, growth2028: -64, riskScore: 'High Risk', adoption: 'Declining' },
          ]).map((p, idx) => {
            const adoptionStyle = getAdoptionBadgeStyle(p.adoption);
            const riskStyle = getRiskBadgeStyle(p.riskScore);
            const AdoptionIcon = adoptionStyle.icon;
            const isPositive = p.growth2026 >= 0;

            return (
              <div
                key={idx}
                className="group relative bg-white border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                {/* Top Badges: Adoption & Risk */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border shadow-xs ${adoptionStyle.bg}`}
                    >
                      <AdoptionIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{p.adoption || 'Tracked'}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border ${riskStyle.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${riskStyle.dot}`} />
                      <span>{riskStyle.label}</span>
                    </span>
                  </div>

                  {/* Skill Title */}
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug min-h-[2.75rem] flex items-center">
                    {p.skill || p.skillName}
                  </h3>
                </div>

                {/* Growth Metrics Box */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Short Horizon Cardlet */}
                    <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl flex flex-col justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Short Horizon
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span
                          className={`text-base sm:text-lg font-black tracking-tight ${
                            isPositive ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {isPositive ? `+${p.growth2026}%` : `${p.growth2026}%`}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">YoY</span>
                      </div>
                    </div>

                    {/* 5-Year Projected Cardlet */}
                    <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl flex flex-col justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        5-Year Projected
                      </span>
                      <div className="flex items-center gap-1.5">
                        {p.growth2028 >= 0 ? (
                          <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span
                          className={`text-base sm:text-lg font-black tracking-tight ${
                            p.growth2028 >= 0 ? 'text-indigo-600' : 'text-rose-600'
                          }`}
                        >
                          {p.growth2028 >= 0 ? `+${p.growth2028}%` : `${p.growth2028}%`}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">Total</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Velocity Bar */}
                  <div className="pt-1">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mb-1">
                      <span>Market Trajectory Velocity</span>
                      <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>
                        {isPositive ? 'Accelerating' : 'Declining'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isPositive
                            ? 'bg-gradient-to-r from-indigo-500 to-emerald-500'
                            : 'bg-gradient-to-r from-rose-400 to-rose-600'
                        }`}
                        style={{
                          width: `${Math.min(Math.abs(p.growth2028 || 50), 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two-Column: Emerging Roles & Automation Displacement Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Emerging Roles */}
        <Card
          title="High-Velocity Emerging Job Roles"
          subtitle="New titles generated from industry macro demand signals"
          className="flex flex-col justify-between"
        >
          <div className="space-y-3.5 pt-2">
            {(emergingRoles && emergingRoles.length > 0 ? emergingRoles : [
              { title: 'AI Ethics & Alignment Auditor', demandIndex: 94, requiredCore: ['LLM Evaluation', 'Bias Detection', 'Python'] },
              { title: 'Platform & FinOps Engineer', demandIndex: 89, requiredCore: ['Kubernetes', 'AWS Cost Explorer', 'Prometheus'] },
              { title: 'Autonomous Multi-Agent Orchestrator', demandIndex: 96, requiredCore: ['LangChain', 'CrewAI', 'Vector DBs'] },
            ]).map((r, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-indigo-200 hover:bg-white transition-all space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <strong className="text-slate-900 text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                    {r.title}
                  </strong>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-1 rounded-lg text-xs font-extrabold shrink-0 self-start sm:self-auto">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {r.demandIndex}/100 Demand
                  </span>
                </div>

                {/* Visual Demand Meter */}
                <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                    style={{ width: `${Math.min(r.demandIndex || 80, 100)}%` }}
                  />
                </div>

                {r.requiredCore && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                      Core Skills:
                    </span>
                    {r.requiredCore.map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[11px] bg-white border border-slate-200 px-2.5 py-0.5 rounded-md font-semibold text-slate-700 shadow-xs"
                      >
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
        <Card
          title="Automation Impact & Displacement Mitigation"
          subtitle="Vulnerability indexing and strategic remediation plans"
          className="flex flex-col justify-between"
        >
          <div className="space-y-3.5 pt-2">
            {(automationIndex && automationIndex.length > 0 ? automationIndex : [
              { sector: 'Manual Software QA & Basic Scripting', displacementProbability: 68, mitigationStrategy: 'Upskill to AI-augmented Test Automation & Security QA' },
              { sector: 'Level-1 Helpdesk & Ticket Routing', displacementProbability: 74, mitigationStrategy: 'Shift to Site Reliability Engineering & Cloud Operations' },
              { sector: 'Complex Cloud Architecture', displacementProbability: 12, mitigationStrategy: 'Safe tier with high human strategic decision-making' },
            ]).map((item, idx) => {
              const isHighRisk = item.displacementProbability > 50;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-indigo-200 hover:bg-white transition-all space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <strong className="text-slate-900 text-sm font-bold flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
                      {item.sector}
                    </strong>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold shrink-0 self-start sm:self-auto border ${
                        isHighRisk
                          ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                      }`}
                    >
                      {item.displacementProbability}% Risk Index
                    </span>
                  </div>

                  {/* Probability Bar */}
                  <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isHighRisk
                          ? 'bg-gradient-to-r from-amber-400 to-rose-500'
                          : 'bg-gradient-to-r from-teal-400 to-emerald-500'
                      }`}
                      style={{ width: `${Math.min(item.displacementProbability || 50, 100)}%` }}
                    />
                  </div>

                  <div className="bg-white/80 border border-slate-200/80 p-2.5 rounded-lg">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800 font-bold">Remediation:</strong>{' '}
                      {item.mitigationStrategy}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
}

