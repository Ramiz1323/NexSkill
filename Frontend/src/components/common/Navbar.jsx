import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Sparkles,
  Bell,
  Search,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  Layers,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { logoutUser } from '../../redux/slices/authSlice';
import Button from './Button';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const notifications = [];
  const userPersona = user?.role || user?.persona || 'Student';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Nex<span className="text-indigo-600">Skill</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-500 leading-none">
                Skill Alignment Engine
              </span>
            </div>
          </Link>

          {/* Quick Search */}
          <div className="hidden lg:flex items-center relative ml-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search skills, jobs, curriculums... (Ctrl+K)"
              className="pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 w-64 transition-all outline-none"
            />
          </div>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`transition-colors hover:text-indigo-600 ${
              location.pathname === '/' ? 'text-indigo-600 font-semibold' : 'text-slate-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`transition-colors hover:text-indigo-600 ${
              location.pathname.startsWith('/dashboard') ? 'text-indigo-600 font-semibold' : 'text-slate-600'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/market-intelligence"
            className={`transition-colors hover:text-indigo-600 ${
              location.pathname === '/market-intelligence' ? 'text-indigo-600 font-semibold' : 'text-slate-600'
            }`}
          >
            Market Signals
          </Link>
        </nav>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* User Specific Persona Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Persona: {userPersona}</span>
          </div>
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200/60 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Live Ecosystem Alerts</span>
                  <span className="text-[10px] text-slate-500 font-semibold">{notifications.length} New</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors">
                        <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                        <span className="text-[9px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No new alerts received from backend.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Auth state */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" /> Dashboard
              </Link>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {(user?.name || user?.email || 'User').charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user?.name || 'NexSkill Candidate'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user?.email || 'student@nexskill.gov.in'}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="w-3.5 h-3.5" /> Overview
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200/60 md:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {showMobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {showMobileNav && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg flex flex-col gap-1 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold w-fit mb-1">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Persona: {userPersona}</span>
          </div>
          <Link
            to="/"
            onClick={() => setShowMobileNav(false)}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              location.pathname === '/' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setShowMobileNav(false)}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              location.pathname.startsWith('/dashboard') ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/market-intelligence"
            onClick={() => setShowMobileNav(false)}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              location.pathname === '/market-intelligence' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Market Signals
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
