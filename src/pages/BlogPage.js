import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const POSTS = [
  {
    id: 1,
    title: 'Getting Started with React',
    author: 'alice',
    date: 'April 10, 2025',
    body: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.',
  },
  {
    id: 2,
    title: 'Understanding useContext',
    author: 'bob',
    date: 'April 15, 2025',
    body: 'Context provides a way to pass data through the component tree without having to pass props down manually at every level.',
  },
  {
    id: 3,
    title: 'React Router Basics',
    author: 'alice',
    date: 'April 18, 2025',
    body: 'React Router keeps your UI in sync with the URL and lets you build single-page applications with clean navigation.',
  },
];

function CommentBox() {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  const handlePost = () => {
    if (!text.trim()) return;
    setComments((prev) => [...prev, text]);
    setText('');
  };

  return (
    <div className="comment-box">
      <h4 className="comment-title">Leave a Comment</h4>
      <textarea
        rows={3}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handlePost}>Post Comment</button>
      {comments.map((c, i) => (
        <p key={i} className="comment-item">💬 {c}</p>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="blog-page">
      <h1 className="blog-heading">Blog Posts</h1>
      {POSTS.map((post) => (
        <div key={post.id} className="card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-meta">By {post.author} · {post.date}</p>
          <p className="post-body">{post.body}</p>
          {isAuthenticated ? (
            <CommentBox />
          ) : (
            <p className="login-prompt">
              🔒 <Link to="/login">Log in</Link> to leave a comment.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}