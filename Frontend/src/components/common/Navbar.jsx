import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { logoutUser } from '../../redux/slices/authSlice';
import Button from './Button';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="navbar flex justify-between items-center p-4 border-b">
      <div className="navbar-brand font-bold text-xl">
        <Link to="/">NexSkill</Link>
      </div>

      <div className="navbar-links flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/resume-analyzer">ATS Analyzer</Link>
            <Link to="/credential-tracker">Credentials</Link>
            <span>{user?.name || user?.email || 'User'}</span>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <Button onClick={toggleTheme} variant="secondary">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
