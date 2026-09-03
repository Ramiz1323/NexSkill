import React from 'react';
import { Layers, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/90 backdrop-blur-md py-6 px-4 md:px-8 text-xs text-slate-500 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Context */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">NexSkill</span>
            <span className="mx-2 text-slate-300">|</span>
            <span className="text-indigo-600 font-semibold">Smart India Hackathon 2026</span>
            <span className="hidden sm:inline text-slate-500 ml-1.5">(PS 26134)</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Ecosystem AI Engine: Active</span>
        </div>

        {/* Quick Links / Copyright */}
        <div className="flex items-center gap-4 text-slate-600">
          <Link to="/" className="hover:text-indigo-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-indigo-600 font-medium transition-colors">
            Dashboard
          </Link>
          <Link to="/market-intelligence" className="hover:text-indigo-600 font-medium transition-colors">
            Market Signals
          </Link>
          <span className="text-slate-400">&copy; {new Date().getFullYear()} NexSkill</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
