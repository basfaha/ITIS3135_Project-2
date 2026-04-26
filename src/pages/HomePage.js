import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Write. Share. Connect.</h1>
        <p className="hero-subtitle">
          A community blog for developers to share ideas, tutorials, and stories.
          {isAuthenticated
            ? ' Welcome back — jump right in.'
            : ' Log in to join the conversation.'}
        </p>
        <div className="hero-buttons">
          {isAuthenticated ? (
            <button className="btn-primary" onClick={() => navigate('/blog')}>
              Explore Blog →
            </button>
          ) : (
            <>
              <button className="btn-primary" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="btn-secondary" onClick={() => navigate('/blog')}>
                Explore Blog
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}