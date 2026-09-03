import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  TrendingUp,
  LineChart,
  FileCheck2,
  Award,
  BookOpenCheck,
  GitMerge,
  Building2,
  Compass,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Zap,
  Target,
  Clock
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { fetchMarketSummary } from '../../redux/slices/marketSlice';
import { fetchProgress } from '../../redux/slices/progressSlice';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // RTK State Selectors
  const { user } = useSelector((state) => state.auth);
  const { atsScore, skillGaps, loading: resumeLoading } = useSelector((state) => state.resume);
  const {
    credentials = [],
    overallProgress = 0,
    skillProgress = [],
    loading: progressLoading,
  } = useSelector((state) => state.progress);
  const { summary = {}, loading: marketLoading } = useSelector((state) => state.market);

  useEffect(() => {
    dispatch(fetchMarketSummary());
    dispatch(fetchProgress());
  }, [dispatch]);

  const quickLaunchPillars = [
    { title: 'Labour Intelligence', path: '/market-intelligence', icon: TrendingUp, mod: 'M1', status: 'Live Analytics' },
    { title: 'Industry Curriculum', path: '/industry-curriculum', icon: BookOpenCheck, mod: 'M2', status: 'Co-Designed' },
    { title: 'ATS Resume Scanner', path: '/resume-analyzer', icon: FileCheck2, mod: 'M3', status: 'AI Diagnostics' },
    { title: 'Credential Tracker', path: '/credential-tracker', icon: Award, mod: 'M4', status: 'Verifiable' },
    { title: 'Employer Discovery', path: '/employer-discovery', icon: Building2, mod: 'M5', status: 'Recruitment' },
    { title: 'Dynamic Learning Path', path: '/dynamic-curriculum', icon: GitMerge, mod: 'M6', status: 'Adaptive' },
    { title: 'Demand Forecasting', path: '/demand-forecasting', icon: LineChart, mod: 'M7', status: 'Predictive' },
    { title: 'AI Career Guidance', path: '/career-guidance', icon: Compass, mod: 'M8', status: 'Roadmap' },
    { title: 'Trainer Development', path: '/trainer-development', icon: GraduationCap, mod: 'M9', status: 'Faculty Upskill' },
  ];

  const isLoading = resumeLoading || progressLoading || marketLoading;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Executive Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>SIH 2026 Problem Statement 26134 Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || user?.email || 'Candidate'}!
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Unified command center connected directly to backend REST endpoints for macroeconomic signals, automated diagnostics, and placement outcomes.
            </p>
          </div>

          {/* Overall Readiness Gauge */}
          <div className="shrink-0 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-xl text-white shadow-lg">
              {overallProgress !== undefined && overallProgress !== null ? `${overallProgress}%` : '0%'}
            </div>
            <div>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold block">
                Job Readiness Index
              </span>
              <span className="text-sm font-bold text-emerald-300 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4" /> Live Metric
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Primary Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: ATS Resume Score */}
        <Card
          title="ATS Resume Match"
          badge="Diagnostic"
          action={
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/resume-analyzer')}
            >
              Scan
            </Button>
          }
        >
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {atsScore !== null && atsScore !== undefined ? `${atsScore}%` : 'N/A'}
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {atsScore !== null ? 'Evaluated' : 'Pending Scan'}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
              style={{ width: `${atsScore || 0}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {atsScore !== null ? 'Score computed from resume analysis' : 'Upload resume to compute match score'}
          </p>
        </Card>

        {/* Metric 2: Active Market Demand */}
        <Card
          title="Market Demand"
          badge="Live Feed"
          action={
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/market-intelligence')}
            >
              Trends
            </Button>
          }
        >
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {summary?.totalPostings !== undefined ? summary.totalPostings.toLocaleString() : '—'}
            </div>
            <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              Active Postings
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            <TrendingUp className="w-4 h-4" /> Top Skill: {summary?.topEmergingSkill || 'Awaiting API'}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Growth Rate: {summary?.growthRate ? `${summary.growthRate}% YoY` : 'Synchronizing...'}
          </p>
        </Card>

        {/* Metric 3: Detected Skill Gaps */}
        <Card
          title="Detected Skill Gaps"
          badge="Priority"
          action={
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/dynamic-curriculum')}
            >
              Bridge
            </Button>
          }
        >
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {skillGaps?.length || 0}
            </div>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {skillGaps?.length ? 'Needs Attention' : 'Clear'}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 min-h-[26px]">
            {skillGaps && skillGaps.length > 0 ? (
              skillGaps.map((gap, i) => (
                <span
                  key={gap.skillName || gap || i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium badge-amber"
                >
                  {gap.skillName || gap}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">No skill gaps identified yet.</span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Mapped into adaptive remedial path
          </p>
        </Card>

        {/* Metric 4: Verified Credentials */}
        <Card
          title="Verified Credentials"
          badge="Wallet"
          action={
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/credential-tracker')}
            >
              View
            </Button>
          }
        >
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {credentials?.length || 0}
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Accredited
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              style={{ width: `${Math.min(((credentials?.length || 0) / 5) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {credentials?.length ? `${credentials.length} credentials earned` : 'No credentials logged yet'}
          </p>
        </Card>
      </section>

      {/* 9-Pillar Interactive Ecosystem Launchpad */}
      <section className="glass-panel rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Complete SIH 2026 Ecosystem
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              9 Connected Solution Pillars Launchpad
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
            REST API Synchronized
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {quickLaunchPillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.path}
                onClick={() => navigate(p.path)}
                className="group cursor-pointer p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover-lift transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-slate-400">{p.mod}</span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {p.title}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {p.status}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Two-Column Intelligence Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Skill Progress Breakdown */}
        <Card
          title="Skill Progress & Mastery"
          subtitle="Tracked from completed curriculum modules and assessments"
          badge="Live Status"
          action={
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate('/credential-tracker')}
            >
              Manage
            </Button>
          }
        >
          <div className="flex flex-col gap-3">
            {skillProgress && skillProgress.length > 0 ? (
              skillProgress.map((sp, idx) => (
                <div
                  key={sp.id || sp.skillName || idx}
                  className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {sp.skillName}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {sp.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${sp.proficiency}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">
                No skill progress records received from backend yet.
              </div>
            )}
          </div>
        </Card>

        {/* Right: Verified Credentials List */}
        <Card
          title="Accredited Credentials"
          subtitle="Verified digital certifications"
          badge="Wallet"
        >
          <div className="flex flex-col gap-3">
            {credentials && credentials.length > 0 ? (
              credentials.map((cred, i) => (
                <div
                  key={cred.id || cred._id || i}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800"
                >
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {cred.title || cred.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {cred.issuer || cred.organization || 'Accredited Partner'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{cred.issueDate || cred.date || 'Verified'}</span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">
                No credential records received from backend yet.
              </div>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default DashboardOverview;


