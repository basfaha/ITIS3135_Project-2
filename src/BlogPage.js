import React from 'react';
import { useAuth } from './context/AuthContext';

export default function BlogPage() {
  const { user, isAuthenticated } = useAuth();
  return (
    <div style={{ padding: '20px' }}>
      <h2>Community Blog</h2>
      <div style={{ border: '1px solid #ccc', padding: '15px' }}>
        <h3>How to build a React App</h3>
        <p>This is my first post for the group project!</p>
        <hr />
        {isAuthenticated ? (
          <div>
            <textarea placeholder="Write a comment..." />
            <button>Post</button>
          </div>
        ) : (
          <p>Please log in to comment.</p>
        )}
      </div>
    </div>
  );
}