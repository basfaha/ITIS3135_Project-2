import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NewPostForm() {
  const { addPost } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setFormError('Both title and body are required.');
      return;
    }
    addPost(title, body);
    setTitle('');
    setBody('');
    setFormError('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="card" style={{ marginBottom: '32px' }}>
      <h2 style={{ color: '#c7d2fe', margin: '0 0 20px' }}>✍️ Write a Post</h2>

      {formError && <p className="error-msg">{formError}</p>}

      {success && (
        <p style={{
          background: 'rgba(34,197,94,0.15)',
          border: '1px solid #22c55e',
          color: '#86efac',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '0.9rem',
        }}>
          ✅ Post published successfully!
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="field-label">Title</label>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="field-label" style={{ marginTop: '12px' }}>Body</label>
        <textarea
          rows={5}
          placeholder="Write your post here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ marginTop: '4px' }}
        />

        <button
          type="submit"
          className="btn-primary"
          style={{ marginTop: '16px', width: '100%' }}
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}

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
  const { isAuthenticated, posts } = useAuth();

  return (
    <div className="blog-page">
      <h1 className="blog-heading">Blog Posts</h1>

      {/* Write a post — only visible when logged in */}
      {isAuthenticated && <NewPostForm />}

      {/* Posts list */}
      {posts.map((post) => (
        <div key={post.id} className="card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-meta">By {post.author} · {post.date}</p>
          <p className="post-body">{post.body}</p>
          {isAuthenticated ? (
            <CommentBox />
          ) : (
            <p className="login-prompt">
              🔒 <Link to="/login">Log in</Link> to comment and write posts.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}