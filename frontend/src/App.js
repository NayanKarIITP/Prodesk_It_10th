import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API}/users`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
        if (data.length > 0 && !selectedAuthor) setSelectedAuthor(data[0]._id);
      }
    } catch (e) { console.error(e); }
  }, [API, selectedAuthor]);

  const fetchPosts = useCallback(() => 
    fetch(`${API}/posts`).then(res => res.json()).then(setPosts).catch(console.error), [API]);

  const fetchTopPosts = useCallback(() => 
    fetch(`${API}/posts/top3`).then(res => res.json()).then(setTopPosts).catch(console.error), [API]);

  const refreshData = useCallback(() => {
    fetchPosts();
    fetchUsers();
    fetchTopPosts();
  }, [fetchPosts, fetchUsers, fetchTopPosts]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, email: userEmail }),
    });
    if (res.ok) {
      const newUser = await res.json();
      setUserName(""); setUserEmail("");
      await fetchUsers();
      setSelectedAuthor(newUser._id);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!selectedAuthor) return alert("Select an Author!");
    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("authorId", selectedAuthor);
    formData.append("image", image);

    try {
      const res = await fetch(`${API}/posts`, { method: "POST", body: formData });
      if (res.ok) {
        setTitle(""); setContent("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        refreshData();
      }
    } catch (err) { alert("Upload failed"); } 
    finally { setIsUploading(false); }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const res = await fetch(`${API}/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter(p => p._id !== id));
        fetchTopPosts();
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="app-container">
      <header className="glass-header">
        <h1>MERN <span>Cloud</span> Blog</h1>
        <button onClick={refreshData} className="refresh-pill">🔄 Sync Feed</button>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="glass-card">
            <h3>👤 Add Author</h3>
            <form onSubmit={handleCreateUser} className="stack-form">
              <input placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} required />
              <input placeholder="Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} required />
              <button type="submit" className="btn-secondary">Join</button>
            </form>
          </div>

          <div className="glass-card">
            <h3>📝 New Post</h3>
            <form onSubmit={handleCreatePost} className="stack-form">
              <select value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)} required>
                <option value="">Select Author...</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
              </select>
              <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <textarea placeholder="Content..." value={content} onChange={e => setContent(e.target.value)} required />
              <input type="file" ref={fileInputRef} onChange={e => setImage(e.target.files[0])} required />
              <button type="submit" className="btn-primary" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Publish"}
              </button>
            </form>
          </div>
        </aside>

        <main className="content-area">
          <section className="trending-bar">
            <h3>🔥 Trending (Top 3 Recent)</h3>
            <div className="trending-scroll">
              {topPosts.map(p => (
                <div key={p._id} className="mini-trend-card">
                  <strong>{p.title} </strong>
                  <small>by {p.author?.name || "Member"}</small>
                </div>
              ))}
            </div>
          </section>

          <div className="posts-grid">
            {posts.map((post) => (
              <article className="post-card" key={post._id}>
                <div className="img-wrapper">
                  {post.image && <img src={post.image} alt="post" />}
                  <button className="delete-btn" onClick={() => handleDeletePost(post._id)}>🗑️</button>
                </div>
                <div className="post-details">
                  <span className="author-pill">{post.authorId?.name || "Anonymous"}</span>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;