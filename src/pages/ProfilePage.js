import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="blog-page">
      <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>👤</div>
        <h1 style={{ color: '#c7d2fe', marginBottom: '8px' }}>
          Welcome, {user.name}!
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
          You are logged in and viewing your profile.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => navigate('/blog')}>
            Go to Blog
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
