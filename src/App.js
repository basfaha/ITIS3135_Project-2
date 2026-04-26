import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';
<<<<<<< HEAD
=======
import { AuthProvider, useAuth } from './context/AuthContext';

const BlogContent = () => {
  const { user, login, logout, isAuthenticated, darkMode, toggleTheme } = useAuth();
  const [nameInput, setNameInput] = useState("");
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const handlePostComment = () => {
    if (comment.trim()) {
      // Add the new comment to the list
      setCommentsList([...commentsList, { text: comment, author: user.name }]);
      setComment(""); // Clear the textarea after posting
    }
  };

  return (
    <div className={darkMode ? "" : "light-theme"} style={{ minHeight: '100vh', transition: 'all 0.3s' }}>
      <nav className="navbar">
        <h2>MyDevBlog</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          {/* THEME TOGGLE BUTTON */}
          <button 
            onClick={toggleTheme} 
            style={{ background: '#334155', color: 'white', padding: '8px 12px', fontSize: '0.8rem' }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {isAuthenticated ? (
            <button onClick={logout}>Logout {user.name}</button>
          ) : (
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Please Login to post</span>
          )}
        </div>
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
          {/* REQUIREMENT: Landing page relevant content */}
          <div className="card">
            <h1>Welcome back, {user.name}!</h1>
            <p>Explore the latest insights in web development, React patterns, and modern UI design.</p>
            
            <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
              <h3>Latest Post: React Context API</h3>
              <p>Context provides a way to pass data through the component tree without having to pass props down manually at every level.</p>
            </div>

            <hr style={{ borderColor: '#334155', margin: '30px 0' }} />
            
            {/* REQUIREMENT: Comment box only if logged in + Auto-get name */}
            <div>
              <h4>Leave a Comment</h4>
              <p style={{ fontSize: '0.8rem', color: '#fbbf24' }}>
                Posting publicly as: <strong>{user.name}</strong>
              </p>
              
              {/* CONNECTED: value and onChange added here */}
              <textarea 
                placeholder="What's on your mind?" 
                rows="3" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              
              {/* CONNECTED: onClick added here */}
              <button onClick={handlePostComment}>Post Comment</button>

              {/* NEW: This section displays your comments after you click Post */}
              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                {commentsList.map((c, index) => (
                  <div key={index} style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    marginBottom: '10px',
                    borderLeft: '4px solid #fbbf24' 
                  }}>
                    <strong style={{ color: '#fbbf24' }}>{c.author}</strong>
                    <p style={{ margin: '5px 0 0 0' }}>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
>>>>>>> JadenA-part2

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}