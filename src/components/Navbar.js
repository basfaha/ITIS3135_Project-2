import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
const { user, logout, isAuthenticated, darkMode, toggleTheme } = useAuth();  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Dev Blogger</Link>
      <div className="nav-links">
        <button
          onClick={toggleTheme}
          className="btn-logout"
          style={{ fontSize: '0.85rem' }}
        >
          {darkMode ? '🔆 Light Mode' : '☾ Dark Mode'}
        </button>
        {isAuthenticated ? (
          <>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <span className="nav-user">Hi, {user.name}!</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}