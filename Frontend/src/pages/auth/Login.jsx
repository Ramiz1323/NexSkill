import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, LogIn } from 'lucide-react';
import { loginUser, clearAuthError } from '../../redux/slices/authSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (validationError) setValidationError('');
    if (error) dispatch(clearAuthError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setValidationError('Please enter both email and password.');
      return;
    }

    dispatch(loginUser(formData));
  };

  return (
    <Card
      title="Welcome to NexSkill"
      subtitle="Sign in to access your customized skill alignment dashboard"
      badge="SIH 2026"
      className="shadow-2xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {(validationError || error) && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{validationError || error}</span>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. student@nexskill.gov.in"
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          variant="primary"
          icon={LogIn}
          className="mt-2 w-full py-2.5"
        >
          Sign In to Ecosystem
        </Button>

        <div className="text-center mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          New to NexSkill?{' '}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Register for SIH Demo
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Login;

