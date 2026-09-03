import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Lock, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { registerUser, clearAuthError } from '../../redux/slices/authSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setValidationError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }

    dispatch(registerUser(formData));
  };

  return (
    <Card
      title="Create NexSkill Account"
      subtitle="Join the Next-Gen Skill Alignment Platform"
      badge="Free Access"
      className="shadow-xl bg-white border border-slate-200"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {(validationError || error) && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{validationError || error}</span>
          </div>
        )}

        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="name" className="text-xs font-bold text-slate-700">
            Full Name
          </label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Aarav Sharma"
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="email" className="text-xs font-bold text-slate-700">
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
              placeholder="e.g. aarav@college.edu.in"
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="password" className="text-xs font-bold text-slate-700">
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
              placeholder="Create a password (min 6 chars)"
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="role" className="text-xs font-bold text-slate-700">
            Select Your Primary Role
          </label>
          <div className="relative flex items-center">
            <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-900 outline-none transition-all shadow-sm cursor-pointer"
            >
              <option value="student">Student / Job Seeker</option>
              <option value="employer">Employer / Recruiter</option>
              <option value="trainer">Trainer / Academic Faculty</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          variant="primary"
          icon={Sparkles}
          className="mt-2 w-full py-2.5"
        >
          Create Candidate Profile
        </Button>

        <div className="text-center mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Register;
