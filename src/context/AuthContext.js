import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

/**
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    if(username.trim()) setUser({ name: username });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
*/

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Default is dark

  const login = (username) => {
    if(username.trim()) setUser({ name: username });
  };

  const logout = () => setUser(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, darkMode, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);