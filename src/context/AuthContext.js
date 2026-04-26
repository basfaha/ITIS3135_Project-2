import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const USERS = [
  { username: 'Alice', password: 'pass123' },
  { username: 'Bob',   password: 'abc456'  },
];

const INITIAL_POSTS = [
  {
    id: 1,
    title: 'Getting Started with React',
    author: 'Alice',
    date: 'April 10, 2026',
    body: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.',
  },
  {
    id: 2,
    title: 'Understanding useContext',
    author: 'Bob',
    date: 'April 15, 2026',
    body: 'Context provides a way to pass data through the component tree without having to pass props down manually at every level — perfect for auth state.',
  },
  {
    id: 3,
    title: 'React Router Basics',
    author: 'Alice',
    date: 'April 18, 2026',
    body: 'React Router keeps your UI in sync with the URL and lets you build single-page applications with clean navigation between pages.',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState(INITIAL_POSTS);

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

  const addPost = (title, body) => {
    const newPost = {
      id: posts.length + 1,
      title,
      author: user.name,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      body,
    };
    setPosts((prev) => [newPost, ...prev]); // adds to top of list
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, isAuthenticated: !!user, posts, addPost }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);