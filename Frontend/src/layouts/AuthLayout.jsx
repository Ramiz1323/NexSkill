import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import Footer from '../components/common/Footer';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Auth Header Logo */}
      <header className="p-6 flex justify-center z-10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Layers className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
              Nex<span className="text-indigo-600">Skill</span>
            </span>
            <span className="text-[10px] text-slate-500">SIH 2026 Prototype • PS 26134</span>
          </div>
        </Link>
      </header>

      {/* Main Form Body */}
      <main className="flex-1 flex items-center justify-center p-4 z-10 w-full max-w-md mx-auto">
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
