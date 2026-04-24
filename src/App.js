import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';

const BlogContent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [nameInput, setNameInput] = useState("");

  return (
    <div>
      <nav className="navbar">
        <h2>MyDevBlog</h2>
        {isAuthenticated && <button onClick={logout}>Logout {user.name}</button>}
      </nav>

      {!isAuthenticated ? (
        <div className="hero-section">
          <h1>Write. Share. Connect.</h1>
          <div className="card">
            <h3>Login to Join the Community</h3>
            <input 
              placeholder="Enter your name" 
              onChange={(e) => setNameInput(e.target.value)} 
            />
            <button onClick={() => login(nameInput)}>Enter Blog</button>
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <div className="card">
            <h2>React Context is powerful!</h2>
            <p>By using useContext, we can track login state across the whole app.</p>
            <hr style={{ borderColor: '#334155' }} />
            
            {/* REQUIREMENT: Conditional Rendering */}
            {isAuthenticated ? (
              <div>
                <h4>Leave a Comment</h4>
                <textarea placeholder="What's on your mind?" rows="3" />
                <button>Post Comment</button>
              </div>
            ) : (
              <p style={{ color: '#94a3b8' }}>Please log in to comment.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BlogContent />
    </AuthProvider>
  );
}