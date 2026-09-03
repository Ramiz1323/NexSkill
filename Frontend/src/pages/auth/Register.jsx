import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    <Card title="Create NexSkill Account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {(validationError || error) && (
          <div className="error-banner p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {validationError || error}
          </div>
        )}

        <div className="form-group flex flex-col gap-1">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="form-group flex flex-col gap-1">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="form-group flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password (min 6 chars)"
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="form-group flex flex-col gap-1">
          <label htmlFor="role">User Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="student">Student / Job Seeker</option>
            <option value="employer">Employer / Recruiter</option>
            <option value="trainer">Trainer / Educator</option>
          </select>
        </div>

        <Button type="submit" disabled={loading} variant="primary">
          {loading ? 'Creating Account...' : 'Register'}
        </Button>

        <p className="text-sm text-center mt-2">
          Already have an account? <Link to="/login" className="text-blue-600 underline">Login here</Link>
        </p>
      </form>
    </Card>
  );
};

export default Register;
