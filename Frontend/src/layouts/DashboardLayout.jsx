import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import { Menu, X, LayoutGrid } from 'lucide-react';

const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative z-10 w-72 max-w-[82vw] bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">Ecosystem Pillars</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar onItemClick={() => setMobileSidebarOpen(false)} className="w-full min-h-full border-r-0" />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        {/* Desktop Sticky Sidebar */}
        <div className="hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
          <Sidebar className="border-r border-slate-200 h-full overflow-y-auto" />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {/* Mobile Quick Bar for opening Sidebar */}
          <div className="lg:hidden flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl px-4 py-2.5 mb-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">9 Solution Pillars</span>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 hover:bg-indigo-100 transition-colors"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Pillars</span>
            </button>
          </div>

          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
