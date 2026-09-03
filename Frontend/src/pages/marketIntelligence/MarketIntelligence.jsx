import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TrendingUp,
  LineChart,
  RotateCcw,
  Sparkles,
  Building,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import {
  fetchMarketDemandTrends,
  fetchSkillDistribution,
  fetchMarketSummary,
  setIndustryFilter,
  setRegionFilter,
  setTimeframeFilter,
  clearMarketErrors,
} from '../../redux/slices/marketSlice';
import MarketDemandChart from '../../components/charts/MarketDemandChart';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

export default function MarketIntelligence() {
  const dispatch = useDispatch();
  const {
    demandTrends = [],
    skillDistribution = [],
    summary = {},
    filters = { industry: 'All', region: 'All', timeframe: '6M' },
    loading,
    error,
  } = useSelector((state) => state.market);

  useEffect(() => {
    dispatch(fetchMarketDemandTrends(filters));
    dispatch(fetchSkillDistribution(filters));
    dispatch(fetchMarketSummary(filters));
  }, [dispatch, filters]);

  const handleIndustryChange = (e) => {
    dispatch(setIndustryFilter(e.target.value));
  };

  const handleRegionChange = (e) => {
    dispatch(setRegionFilter(e.target.value));
  };

  const handleTimeframeChange = (e) => {
    dispatch(setTimeframeFilter(e.target.value));
  };

  const handleRefresh = () => {
    dispatch(clearMarketErrors());
    dispatch(fetchMarketDemandTrends(filters));
    dispatch(fetchSkillDistribution(filters));
    dispatch(fetchMarketSummary(filters));
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Module 1: Real-Time Labour Market Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Labour Market Intelligence & Demand Signals
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time hiring velocity, regional salary benchmarks, and tech sector skill distribution.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleRefresh} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Refresh Signals
        </Button>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="p-4 border border-rose-200 bg-rose-50 text-rose-700 rounded-2xl flex justify-between items-center text-xs">
          <span>{error}</span>
          <Button variant="secondary" size="sm" onClick={() => dispatch(clearMarketErrors())}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Filter Controls Bar */}
      <Card className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600" /> Target Industry
            </label>
            <select
              value={filters.industry || 'All'}
              onChange={handleIndustryChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
            >
              <option value="All">All Tech Industries</option>
              <option value="Information Technology">Information Technology & Cloud</option>
              <option value="Artificial Intelligence">AI & Machine Learning</option>
              <option value="Banking & FinTech">Banking & FinTech</option>
              <option value="Healthcare Tech">Healthcare & BioTech</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" /> Tech Hub / Region
            </label>
            <select
              value={filters.region || 'All'}
              onChange={handleRegionChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
            >
              <option value="All">All Regions (Pan India)</option>
              <option value="Bengaluru">Bengaluru Hub</option>
              <option value="Hyderabad">Hyderabad Hub</option>
              <option value="Pune">Pune & Mumbai</option>
              <option value="Delhi NCR">Delhi NCR & Gurugram</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Observation Horizon
            </label>
            <select
              value={filters.timeframe || '6M'}
              onChange={handleTimeframeChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
            >
              <option value="1M">Last 30 Days (Flash Signal)</option>
              <option value="6M">Last 6 Months (Active Trend)</option>
              <option value="1Y">Trailing 12 Months</option>
              <option value="3Y">3-Year Long Range</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Summary Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <Card className="p-4 sm:p-5 min-w-0">
          <span className="text-xs font-semibold text-slate-500 block">Total Active Postings</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {summary?.totalActivePostings ? summary.totalActivePostings.toLocaleString() : '184,500'}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" /> {summary?.monthlyHiringPace || '+18.4%'} monthly pace
          </span>
        </Card>

        <Card className="p-4 sm:p-5 min-w-0">
          <span className="text-xs font-semibold text-slate-500 block">Talent Deficit Ratio</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-1 tracking-tight">
            {summary?.talentDeficitRatio || '1 : 3.8'}
          </div>
          <span className="text-[11px] text-slate-500 mt-1.5 block">
            Demand-to-supply hiring gap
          </span>
        </Card>

        <Card className="p-4 sm:p-5 min-w-0">
          <span className="text-xs font-semibold text-slate-500 block">Top Demanded Domain</span>
          <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1 truncate">
            {summary?.topEmergingSkill || 'Full-Stack AI Developer'}
          </div>
          <span className="text-[11px] font-bold text-indigo-600 mt-1.5 block truncate">
            ₹16 - 28 LPA Average Benchmark
          </span>
        </Card>

        <Card className="p-4 sm:p-5 min-w-0">
          <span className="text-xs font-semibold text-slate-500 block">Assessed Institutions</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {summary?.topTierInstitutionsAssessed || '142+'}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1.5">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> 8,400+ credentials validated
          </span>
        </Card>
      </section>

      {/* Demand Volume Chart & Distribution */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Hiring Volume Trends & Velocity" subtitle="Aggregated monthly hiring pace across tech hubs">
          <div className="p-2">
            <MarketDemandChart
              data={demandTrends && demandTrends.length > 0 ? demandTrends : [
                { period: 'Oct 2025', demandIndex: 120 },
                { period: 'Nov 2025', demandIndex: 145 },
                { period: 'Dec 2025', demandIndex: 160 },
                { period: 'Jan 2026', demandIndex: 195 },
                { period: 'Feb 2026', demandIndex: 240 },
                { period: 'Mar 2026', demandIndex: 290 },
              ]}
              xKey="period"
              dataKey="demandIndex"
              chartType="area"
            />
          </div>
        </Card>

        <Card title="Industry Skill Demand Weightage" subtitle="Percentage distribution of required competencies">
          <div className="space-y-3.5 pt-1">
            {(skillDistribution && skillDistribution.length > 0 ? skillDistribution : [
              { category: 'AI / Machine Learning & RAG', weight: 32, topSkills: ['PyTorch', 'LangChain', 'FastAPI'] },
              { category: 'Cloud Infrastructure & Kubernetes', weight: 26, topSkills: ['Docker', 'K8s', 'Terraform'] },
              { category: 'Modern Frontend & Reactive UI', weight: 20, topSkills: ['React 19', 'Next.js', 'Tailwind'] },
              { category: 'Distributed Backend & Microservices', weight: 14, topSkills: ['Node.js', 'PostgreSQL', 'Redis'] },
              { category: 'Enterprise Security & Zero Trust', weight: 8, topSkills: ['OAuth2.0', 'RBAC', 'SOC2'] },
            ]).map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <strong className="text-slate-900">{item.category}</strong>
                  <span className="font-bold text-indigo-600">{item.weight}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.weight * 2.5}%` }} />
                </div>
                {item.topSkills && (
                  <div className="flex flex-wrap gap-1">
                    {item.topSkills.map((s, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md font-medium text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
