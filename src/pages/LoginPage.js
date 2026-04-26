import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setFormError('Both fields are required.');
      return;
    }
    setFormError('');
    const success = login(username, password);
    if (success) navigate('/blog');
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-hint">
          Test: <strong>alice / pass123</strong> or <strong>bob / abc456</strong>
        </p>

        {(formError || error) && (
          <p className="error-msg">{formError || error}</p>
        )}

        <label className="field-label">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="field-label">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
          Login →
        </button>
      </form>
    </div>
  );
}