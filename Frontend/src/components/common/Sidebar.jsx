import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar w-64 p-4 border-r min-h-screen">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'font-bold' : '')}>
          Dashboard Overview
        </NavLink>
        <NavLink to="/resume-analyzer" className={({ isActive }) => (isActive ? 'font-bold' : '')}>
          ATS Resume Analyzer
        </NavLink>
        <NavLink to="/credential-tracker" className={({ isActive }) => (isActive ? 'font-bold' : '')}>
          Credential Tracker
        </NavLink>
        <NavLink to="/employer-discovery" className={({ isActive }) => (isActive ? 'font-bold' : '')}>
          Employer Discovery
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
