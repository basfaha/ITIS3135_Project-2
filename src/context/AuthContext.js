import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const USERS = [
  { username: 'alice', password: 'pass123' },
  { username: 'bob',   password: 'abc456'  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [error, setError] = useState('');

  const login = (username, password) => {
    if (!username.trim() || !password.trim()) {
      setError('Both fields are required.');
      return false;
    }
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ name: found.username });
      setError('');
      return true;
    }
    setError('Invalid username or password.');
    return false;
  };

  const logout = () => {
    setUser(null);
    setError('');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);