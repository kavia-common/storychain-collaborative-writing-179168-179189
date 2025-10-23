import React, { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import StoryCard from "../components/StoryCard";
import Loader from "../components/Loader";

/**
 * PUBLIC_INTERFACE
 * StoryFeed lists stories and allows creating a new story.
 */
export default function StoryFeed() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      // Placeholder API; adjust to backend endpoint shape
      const res = await apiClient.get("/stories");
      setStories(res.data || []);
    } catch (e) {
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const createStory = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setCreating(true);
    try {
      const res = await apiClient.post("/stories", { title });
      const newStory = res.data || { id: Date.now(), title };
      setStories((prev) => [newStory, ...prev]);
      setTitle("");
    } catch (e) {
      // no-op basic error handling
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-head">
          <h2>Ongoing Stories</h2>
          <form onSubmit={createStory} className="new-story">
            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Start a new story title..."
            />
            <button className="btn-primary" type="submit" disabled={creating}>
              {creating ? "Creating..." : "Create"}
            </button>
          </form>
        </div>

        {loading ? (
          <Loader text="Fetching stories" />
        ) : (
          <div className="grid">
            {stories.map((s) => <StoryCard key={s.id} story={s} />)}
            {stories.length === 0 && <p className="muted">No stories yet. Be the first to start one!</p>}
          </div>
        )}
      </div>
      <style>{pageStyles}</style>
    </div>
  );
}

const pageStyles = `
.page{background:#f9fafb;min-height:calc(100vh - 60px);}
.page-inner{max-width:1040px;margin:0 auto;padding:20px 16px}
.page-head{display:grid;gap:10px;margin-bottom:12px}
.new-story{display:flex;gap:10px;align-items:center}
.new-story input{flex:1;padding:10px 12px;border-radius:10px;border:1px solid rgba(17,24,39,.12);outline:none}
.new-story input:focus{box-shadow:0 0 0 4px rgba(37,99,235,.15)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;margin-top:12px}
.muted{color:#6b7280}
.btn-primary{background:linear-gradient(135deg,rgba(37,99,235,.95),rgba(37,99,235,.85));color:#fff;border:1px solid transparent;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
`;
