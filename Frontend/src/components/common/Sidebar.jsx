import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
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
  ShieldCheck
} from 'lucide-react';

const Sidebar = ({ onItemClick, className = '' }) => {
  const navSections = [
    {
      title: 'COMMAND CENTER',
      items: [
        { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard, badge: 'Live' },
      ],
    },
    {
      title: 'MARKET SIGNALS',
      items: [
        { name: 'Labour Intelligence', path: '/market-intelligence', icon: TrendingUp },
        { name: 'Demand Forecasting', path: '/demand-forecasting', icon: LineChart },
      ],
    },
    {
      title: 'DIAGNOSTICS & CREDENTIALS',
      items: [
        { name: 'Live Skill Assessment', path: '/assessment', icon: Sparkles, badge: 'Live' },
        { name: 'AI Resume Analyzer', path: '/resume-analyzer', icon: FileCheck2 },
        { name: 'Credential Tracker', path: '/credential-tracker', icon: Award },
      ],
    },
    {
      title: 'ADAPTIVE CURRICULUM',
      items: [
        { name: 'Industry Curriculum', path: '/industry-curriculum', icon: BookOpenCheck },
        { name: 'Dynamic Feedback & Path', path: '/dynamic-curriculum', icon: GitMerge },
      ],
    },
    {
      title: 'WORKFORCE & PLACEMENT',
      items: [
        { name: 'Employer Discovery', path: '/employer-discovery', icon: Building2 },
        { name: 'AI Career Guidance', path: '/career-guidance', icon: Compass },
        { name: 'Trainer Development', path: '/trainer-development', icon: GraduationCap },
      ],
    },
  ];

  return (
    <aside className={`w-64 xl:w-72 p-4 flex flex-col justify-between shrink-0 bg-white ${className}`}>
      {/* Navigation Groups */}
      <div className="flex flex-col gap-5 overflow-y-auto pr-1">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-3 mb-1.5">
              {section.title}
            </h3>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (onItemClick) onItemClick();
                    }}
                    className={({ isActive }) =>
                      `group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25 font-bold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                            }`}
                          />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Ecosystem Status Card */}
      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-xs font-bold text-slate-900">
              NexSkill Engine
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-tight">
            Skill Development & Alignment Platform.
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[10px] text-indigo-600 font-semibold">
            <span>9 Ecosystem Pillars</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Active
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
