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
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>👤</div>
        <h1 style={{ color: '#c7d2fe', margin: '0 0 8px' }}>
          Welcome, {user.name}!
        </h1>
        <p style={{ color: '#94a3b8', margin: '0 0 24px' }}>
          You are logged in. Head to the blog to read and write posts.
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