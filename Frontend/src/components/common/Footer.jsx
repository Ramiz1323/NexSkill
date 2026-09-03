import React from 'react';
import { Layers, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-6 px-4 md:px-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Context */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm tracking-tight">NexSkill</span>
            <span className="mx-2 text-slate-300 dark:text-slate-700">|</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Smart India Hackathon 2026</span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500 ml-1.5">(PS 26134)</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-medium">Ecosystem AI Engine: Active</span>
        </div>

        {/* Quick Links / Copyright */}
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/market-intelligence" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Market Signals
          </Link>
          <span>&copy; {new Date().getFullYear()} NexSkill</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

