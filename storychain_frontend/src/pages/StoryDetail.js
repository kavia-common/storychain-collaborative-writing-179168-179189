import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../api/client";
import Loader from "../components/Loader";
import TextArea from "../components/TextArea";

/**
 * PUBLIC_INTERFACE
 * StoryDetail displays a story thread; lets users post paragraphs and request AI suggestions/edits.
 */
export default function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [input, setInput] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [sRes, pRes] = await Promise.all([
        apiClient.get(`/stories/${id}`),
        apiClient.get(`/stories/${id}/paragraphs`)
      ]);
      setStory(sRes.data || { id, title: "Story" });
      setParagraphs(pRes.data || []);
    } catch (e) {
      setStory({ id, title: "Story" });
      setParagraphs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const addParagraph = async () => {
    if (!input.trim()) return;
    setSaving(true);
    try {
      const res = await apiClient.post(`/stories/${id}/paragraphs`, { text: input });
      const newPara = res.data || { id: Date.now(), text: input, createdAt: new Date().toISOString() };
      setParagraphs((prev) => [...prev, newPara]);
      setInput("");
    } catch (e) {
      // no-op
    } finally {
      setSaving(false);
    }
  };

  const askAiSuggestion = async () => {
    setAiLoading(true);
    setAiSuggestion("");
    try {
      // Placeholder AI endpoint; backend should implement
      const res = await apiClient.post(`/stories/${id}/ai/suggest`, { context: paragraphs.map(p => p.text).join("\n\n") });
      setAiSuggestion(res.data?.suggestion || "AI: Here's a suggested next paragraph based on the current narrative...");
    } catch (e) {
      setAiSuggestion("AI: Here's a suggested next paragraph based on the current narrative...");
    } finally {
      setAiLoading(false);
    }
  };

  const askAiEdit = async () => {
    setAiLoading(true);
    setAiSuggestion("");
    try {
      const res = await apiClient.post(`/stories/${id}/ai/edit`, { text: input });
      setAiSuggestion(res.data?.edited || "AI: Here's a refined version of your paragraph...");
    } catch (e) {
      setAiSuggestion("AI: Here's a refined version of your paragraph...");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="page"><div className="page-inner"><Loader text="Loading story" /></div></div>;

  return (
    <div className="page">
      <div className="page-inner">
        <div className="head">
          <h2>{story?.title}</h2>
          <p className="muted">{paragraphs.length} paragraphs</p>
        </div>

        <div className="thread">
          {paragraphs.map((p, i) => (
            <div key={p.id || i} className="para">
              <div className="index">#{i+1}</div>
              <div className="text">{p.text}</div>
            </div>
          ))}
          {paragraphs.length === 0 && <p className="muted">No paragraphs yet. Add the opening!</p>}
        </div>

        <div className="composer">
          <h4>Add your paragraph</h4>
          <TextArea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Write the next paragraph..." rows={6} />
          <div className="actions">
            <button className="btn-primary" onClick={addParagraph} disabled={saving}>{saving ? "Posting..." : "Post Paragraph"}</button>
            <button className="btn-outline" onClick={askAiSuggestion} disabled={aiLoading}>{aiLoading ? "Thinking..." : "AI Suggestion"}</button>
            <button className="btn-outline" onClick={askAiEdit} disabled={aiLoading || !input.trim()}>{aiLoading ? "Thinking..." : "AI Edit"}</button>
          </div>
          {aiSuggestion && <div className="ai-box">
            <strong>AI Suggestion</strong>
            <p>{aiSuggestion}</p>
          </div>}
        </div>
      </div>
      <style>{detailStyles}</style>
    </div>
  );
}

const detailStyles = `
.page{background:#f9fafb;min-height:calc(100vh - 60px);}
.page-inner{max-width:840px;margin:0 auto;padding:20px 16px}
.head{margin:0 0 10px 0}
.muted{color:#6b7280}
.thread{display:grid;gap:12px;margin:12px 0 20px 0}
.para{display:grid;grid-template-columns:auto 1fr;gap:10px;background:#fff;border:1px solid rgba(17,24,39,.06);border-radius:14px;padding:12px;box-shadow:0 6px 18px rgba(17,24,39,.04)}
.index{font-weight:700;color:#2563EB}
.text{color:#111827;line-height:1.6}
.composer{background:#fff;border:1px solid rgba(17,24,39,.06);border-radius:14px;padding:14px;box-shadow:0 6px 18px rgba(17,24,39,.04)}
.actions{display:flex;gap:10px;margin-top:10px;flex-wrap:wrap}
.btn-primary{background:linear-gradient(135deg,rgba(37,99,235,.95),rgba(37,99,235,.85));color:#fff;border:1px solid transparent;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
.btn-outline{background:#fff;color:#2563EB;border:1px solid rgba(37,99,235,.35);border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
.ai-box{margin-top:12px;background:linear-gradient(180deg,rgba(245,158,11,.08),rgba(249,250,251,1));border:1px dashed rgba(245,158,11,.6);padding:12px;border-radius:12px}
`;
