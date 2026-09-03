import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    <Card title="Login to NexSkill">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {(validationError || error) && (
          <div className="error-banner p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {validationError || error}
          </div>
        )}

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
            placeholder="Enter your password"
            className="border p-2 rounded"
            required
          />
        </div>

        <Button type="submit" disabled={loading} variant="primary">
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <p className="text-sm text-center mt-2">
          Don't have an account? <Link to="/register" className="text-blue-600 underline">Register here</Link>
        </p>
      </form>
    </Card>
  );
};

export default Login;
