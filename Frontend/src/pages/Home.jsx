import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Target,
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  const navigate = useNavigate();

  const ecosystemPillars = [
    {
      id: 'M1',
      title: 'Labour-Market Intelligence',
      desc: 'Aggregates real-time hiring demand, regional skill trends, and industry urgency scores.',
      icon: TrendingUp,
      path: '/market-intelligence',
      color: 'from-blue-500 to-indigo-600',
      badge: 'Demand Engine',
    },
    {
      id: 'M2',
      title: 'Industry-Aligned Curriculum',
      desc: 'Standardized modules co-designed with top employers ensuring job-ready training.',
      icon: BookOpenCheck,
      path: '/industry-curriculum',
      color: 'from-indigo-500 to-purple-600',
      badge: 'Curriculum Core',
    },
    {
      id: 'M3',
      title: 'AI ATS Resume Analyzer',
      desc: 'Scans resumes against real job descriptions to calculate match scores and missing keywords.',
      icon: FileCheck2,
      path: '/resume-analyzer',
      color: 'from-cyan-500 to-blue-600',
      badge: 'Diagnostic AI',
    },
    {
      id: 'M4',
      title: 'Progress & Credential Tracker',
      desc: 'Verifiable digital micro-credentials and domain-wise skill progression tracking.',
      icon: Award,
      path: '/credential-tracker',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Credential Wallet',
    },
    {
      id: 'M5',
      title: 'Employer Discovery Panel',
      desc: 'Matches vetted candidates directly with hiring partners based on verified skill proficiencies.',
      icon: Building2,
      path: '/employer-discovery',
      color: 'from-amber-500 to-orange-600',
      badge: 'Workforce Match',
    },
    {
      id: 'M6',
      title: 'Dynamic Adaptive Curriculum',
      desc: 'Transforms detected individual skill gaps into personalized remedial learning roadmaps.',
      icon: GitMerge,
      path: '/dynamic-curriculum',
      color: 'from-violet-500 to-fuchsia-600',
      badge: 'Adaptive Path',
    },
    {
      id: 'M7',
      title: 'Future Demand Forecasting',
      desc: 'AI predictive models projecting 1Y to 5Y technological shifts and automation impact.',
      icon: LineChart,
      path: '/demand-forecasting',
      color: 'from-sky-500 to-cyan-600',
      badge: 'AI Projections',
    },
    {
      id: 'M8',
      title: 'AI Career Guidance',
      desc: 'Personalized career pathway simulation with step-by-step role progression recommendations.',
      icon: Compass,
      path: '/career-guidance',
      color: 'from-pink-500 to-rose-600',
      badge: 'Career AI',
    },
    {
      id: 'M9',
      title: 'Industry-Driven Trainer Dev',
      desc: 'Train-the-trainer upskilling programs to ensure faculty pedagogy aligns with modern tech.',
      icon: GraduationCap,
      path: '/trainer-development',
      color: 'from-teal-500 to-emerald-600',
      badge: 'Faculty Upskill',
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'Market Demand Signal', desc: 'Real-time industry hiring signals and skill demand data are tracked.' },
    { step: '02', title: 'Skill Assessment & Scan', desc: 'Students scan resumes and undergo AI diagnostic tests.' },
    { step: '03', title: 'Adaptive Dynamic Path', desc: 'Instant skill gap detection triggers co-designed modular learning.' },
    { step: '04', title: 'Direct Employer Placement', desc: 'Verified candidates are matched with partner employers.' },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 py-6 md:py-12">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[20rem] bg-gradient-to-tr from-indigo-500/20 via-cyan-500/15 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

        {/* SIH 2026 Header Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Smart India Hackathon 2026</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span>Problem Statement 26134</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl leading-tight">
          Aligning Higher Education with{' '}
          <span className="gradient-text-primary">Real-Time Industry Demands</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          <strong>NexSkill</strong> is an AI-powered closed-loop platform that connects macroeconomic labor signals, automated skill gap diagnostics, adaptive curriculum modules, and direct employer placement.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link to="/dashboard">
            <Button size="lg" variant="primary" icon={Sparkles}>
              Launch Interactive Prototype
            </Button>
          </Link>
          <Link to="/resume-analyzer">
            <Button size="lg" variant="secondary" icon={FileCheck2}>
              Scan ATS Resume
            </Button>
          </Link>
          <Link to="/market-intelligence">
            <Button size="lg" variant="ghost" icon={TrendingUp}>
              View Market Signals
            </Button>
          </Link>
        </div>

        {/* Live Closed-Loop Ecosystem Diagram */}
        <div className="mt-14 w-full max-w-5xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Core Closed-Loop Architecture
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                From Market Demand Signal to Verified Job Placement
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold badge-emerald">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Loop
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover-lift relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black text-indigo-600/30 dark:text-indigo-400/30 font-mono">
                    {ws.step}
                  </span>
                  {i < 3 && (
                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 hidden lg:block" />
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {ws.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {ws.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 Ecosystem Modules Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Comprehensive Solution Matrix
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            9 Connected Ecosystem Pillars
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Every module addresses a specific bottleneck identified in SIH Problem Statement 26134.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ecosystemPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => navigate(pillar.path)}
                className="group cursor-pointer app-card app-card-hover p-6 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {pillar.id}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                    {pillar.title}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>{pillar.badge}</span>
                  <span className="group-hover:translate-x-1 transition-transform">Explore →</span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Impact Metrics Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center relative z-10">
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-cyan-400 mb-1">98.4%</div>
              <p className="text-xs sm:text-sm text-slate-300">ATS Keyword Match Precision</p>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-indigo-300 mb-1">40+</div>
              <p className="text-xs sm:text-sm text-slate-300">Industry Co-Designed Curricula</p>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 mb-1">5-Year</div>
              <p className="text-xs sm:text-sm text-slate-300">Predictive Demand Projections</p>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-amber-300 mb-1">100%</div>
              <p className="text-xs sm:text-sm text-slate-300">Decoupled REST Ecosystem</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center w-full">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Ready to Evaluate the NexSkill Demonstration?
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Experience all 9 interconnected modules running live with preloaded SIH demonstration data and interactive analysis tools.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="primary" icon={Sparkles}>
                Enter Executive Command Center
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

