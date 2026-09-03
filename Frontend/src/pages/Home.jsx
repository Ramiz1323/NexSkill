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
  ArrowUpRight,
  Star,
  Users,
  Clock,
  Briefcase,
  Check
} from 'lucide-react';
import Button from '../components/common/Button';

const Home = () => {
  const navigate = useNavigate();

  const ecosystemPillars = [
    {
      id: 'M1',
      title: 'Labour-Market Intelligence',
      desc: 'Aggregates real-time hiring demand, regional skill trends, and industry urgency scores.',
      icon: TrendingUp,
      path: '/market-intelligence',
      iconBg: 'bg-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'Demand Engine',
    },
    {
      id: 'M2',
      title: 'Industry-Aligned Curriculum',
      desc: 'Standardized modules co-designed with top employers ensuring job-ready training.',
      icon: BookOpenCheck,
      path: '/industry-curriculum',
      iconBg: 'bg-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      badge: 'Curriculum Core',
    },
    {
      id: 'M3',
      title: 'AI ATS Resume Analyzer',
      desc: 'Scans resumes against real job descriptions to calculate match scores and missing keywords.',
      icon: FileCheck2,
      path: '/resume-analyzer',
      iconBg: 'bg-cyan-600',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      badge: 'Diagnostic AI',
    },
    {
      id: 'M4',
      title: 'Progress & Credential Tracker',
      desc: 'Verifiable digital micro-credentials and domain-wise skill progression tracking.',
      icon: Award,
      path: '/credential-tracker',
      iconBg: 'bg-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Credential Wallet',
    },
    {
      id: 'M5',
      title: 'Employer Discovery Panel',
      desc: 'Matches vetted candidates directly with hiring partners based on verified skill proficiencies.',
      icon: Building2,
      path: '/employer-discovery',
      iconBg: 'bg-amber-600',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      badge: 'Workforce Match',
    },
    {
      id: 'M6',
      title: 'Dynamic Adaptive Curriculum',
      desc: 'Transforms detected individual skill gaps into personalized remedial learning roadmaps.',
      icon: GitMerge,
      path: '/dynamic-curriculum',
      iconBg: 'bg-purple-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      badge: 'Adaptive Path',
    },
    {
      id: 'M7',
      title: 'Future Demand Forecasting',
      desc: 'AI predictive models projecting 1Y to 5Y technological shifts and automation impact.',
      icon: LineChart,
      path: '/demand-forecasting',
      iconBg: 'bg-sky-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      badge: 'AI Projections',
    },
    {
      id: 'M8',
      title: 'AI Career Guidance',
      desc: 'Personalized career pathway simulation with step-by-step role progression recommendations.',
      icon: Compass,
      path: '/career-guidance',
      iconBg: 'bg-rose-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      badge: 'Career AI',
    },
    {
      id: 'M9',
      title: 'Industry-Driven Trainer Dev',
      desc: 'Train-the-trainer upskilling programs to ensure faculty pedagogy aligns with modern tech.',
      icon: GraduationCap,
      path: '/trainer-development',
      iconBg: 'bg-teal-600',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      badge: 'Faculty Upskill',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Market Demand Signal',
      desc: 'Real-time hiring trends and regional macroeconomic skill telemetry are continuously ingested.',
      tag: 'Live Telemetry',
    },
    {
      step: '02',
      title: 'AI Diagnostic Scan',
      desc: 'Candidates run ATS resume evaluations & psychometric benchmarks to uncover precise gap areas.',
      tag: 'Gap Detection',
    },
    {
      step: '03',
      title: 'Adaptive Mastery Path',
      desc: 'AI auto-assembles personalized micro-modules co-designed with top tier technology employers.',
      tag: 'Co-Designed',
    },
    {
      step: '04',
      title: 'Direct Placement Match',
      desc: 'Validated skill credentials unlock instant matching pipelines with corporate hiring partners.',
      tag: 'Verified Hire',
    },
  ];

  const featuredTracks = [
    {
      title: 'Cloud Architecture & Kubernetes',
      role: 'Cloud Solutions Architect',
      level: 'Advanced',
      duration: '8 Weeks',
      students: '4,280',
      rating: '4.9',
      skills: ['AWS / GCP', 'Kubernetes', 'Terraform', 'Microservices'],
      matchRate: '96% Hiring Match',
      bgGradient: 'from-blue-600 to-indigo-700',
    },
    {
      title: 'Full-Stack GenAI & LLM Systems',
      role: 'AI Software Engineer',
      level: 'Intermediate',
      duration: '10 Weeks',
      students: '6,150',
      rating: '4.95',
      skills: ['LangChain', 'Python', 'Vector DBs', 'React 19'],
      matchRate: '98% Hiring Match',
      bgGradient: 'from-indigo-600 to-purple-700',
    },
    {
      title: 'DevSecOps & Platform Engineering',
      role: 'Site Reliability Engineer',
      level: 'Advanced',
      duration: '6 Weeks',
      students: '3,890',
      rating: '4.88',
      skills: ['CI/CD Pipelines', 'Docker', 'Prometheus', 'Linux Security'],
      matchRate: '94% Hiring Match',
      bgGradient: 'from-teal-600 to-emerald-700',
    },
  ];

  const placementPartners = [
    { name: 'Google Cloud', role: 'Solutions Eng.', salary: '+160% Hike' },
    { name: 'Microsoft', role: 'Full Stack AI', salary: '+145% Hike' },
    { name: 'Amazon AWS', role: 'DevOps Lead', salary: '+150% Hike' },
    { name: 'Atlassian', role: 'Backend Eng.', salary: '+135% Hike' },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-14 bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Ambient Light Blooms */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[22rem] bg-gradient-to-tr from-indigo-200/50 via-cyan-100/40 to-emerald-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Header Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI-Powered Skill Alignment Platform</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-5xl leading-tight">
          Intelligent Skill-to-Career{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Acceleration Platform
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          <strong>NexSkill</strong> is an AI-powered closed-loop platform that bridges higher education with real-time industry demands—transforming labor signals into dynamic curriculum, verified skill credentials, and automated employer placements.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link to="/dashboard">
            <Button size="lg" variant="primary" icon={Sparkles}>
              Launch Executive Dashboard
            </Button>
          </Link>
          <Link to="/resume-analyzer">
            <Button size="lg" variant="secondary" icon={FileCheck2}>
              Scan ATS Resume
            </Button>
          </Link>
          <Link to="/market-intelligence">
            <Button size="lg" variant="outline" icon={TrendingUp}>
              View Market Signals
            </Button>
          </Link>
        </div>

        {/* Impact Metric Chips Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-8 sm:mt-10 w-full max-w-4xl">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
            <div className="text-lg sm:text-2xl font-black text-indigo-600">98.4%</div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">ATS Diagnostic Precision</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
            <div className="text-lg sm:text-2xl font-black text-emerald-600">40+</div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">Industry Co-Designed Tracks</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
            <div className="text-lg sm:text-2xl font-black text-cyan-600">5-Year</div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">Predictive AI Forecasting</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
            <div className="text-lg sm:text-2xl font-black text-amber-600">100%</div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">Closed-Loop Alignment</div>
          </div>
        </div>

        {/* Live Closed-Loop Ecosystem Architecture */}
        <div className="mt-12 w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 text-left gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Core Closed-Loop Architecture
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                From Real-Time Market Demand to Verified Corporate Placement
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live System Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-indigo-600 font-mono">
                      {ws.step}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                      {ws.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {ws.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ws.desc}
                  </p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:flex justify-end mt-3 text-slate-300">
                    <ArrowRight className="w-4 h-4 text-indigo-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 Ecosystem Modules Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Comprehensive Solution Matrix
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            9 Connected Ecosystem Pillars
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Every module addresses key workforce bottlenecks with real-time data & AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ecosystemPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => navigate(pillar.path)}
                className="group cursor-pointer bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl ${pillar.iconBg} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                    {pillar.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className={`px-2 py-0.5 rounded-md border text-[11px] font-bold ${pillar.badgeBg}`}>
                    {pillar.badge}
                  </span>
                  <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Industry Skill Tracks Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              High-Growth Specializations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Featured Co-Designed Learning Tracks
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Curricula built directly alongside tier-1 hiring partners to ensure guaranteed job readiness.
            </p>
          </div>
          <Link to="/industry-curriculum">
            <Button variant="secondary" size="sm" icon={BookOpenCheck}>
              View All 40+ Tracks
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTracks.map((track, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {track.level}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {track.rating}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {track.title}
                </h3>
                <p className="text-xs font-semibold text-indigo-600 mb-4">
                  Target Role: {track.role}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {track.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {track.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> {track.students} Enrolled
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    {track.matchRate}
                  </span>
                  <Link to="/dynamic-curriculum">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                      Enroll Track <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Placement Telemetry */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Outcome Telemetry
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Bridging Graduates into High-Yield Technology Roles
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Our automated credential verifier guarantees that candidate proficiencies reflect real-world problem-solving, resulting in accelerated hiring cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
            {placementPartners.map((partner, pIdx) => (
              <div
                key={pIdx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div className="text-sm font-bold text-slate-900">{partner.name}</div>
                <div className="text-xs text-slate-500">{partner.role}</div>
                <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block w-fit">
                  {partner.salary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center w-full">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Accelerate Skill-to-Career Alignment?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-indigo-100 max-w-xl leading-relaxed">
            Evaluate all 9 interconnected modules live with real-time data ingestion, diagnostic engines, and adaptive curriculum builders.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard">
              <button className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm sm:text-base shadow-md hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Enter Executive Command Center
              </button>
            </Link>
            <Link to="/resume-analyzer">
              <button className="px-6 py-3 rounded-xl bg-indigo-800/80 border border-indigo-400/40 text-white font-semibold text-sm sm:text-base hover:bg-indigo-800 active:scale-95 transition-all flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-cyan-300" />
                Try AI ATS Resume Scan
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
