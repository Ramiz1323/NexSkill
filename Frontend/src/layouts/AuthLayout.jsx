import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';

const AuthLayout = () => {
  return (
    <div className="auth-layout flex flex-col min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md my-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
