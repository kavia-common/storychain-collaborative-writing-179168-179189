import React from "react";
import { Link } from "react-router-dom";
import "./storycard.css";

/**
 * PUBLIC_INTERFACE
 * StoryCard displays a story summary in the feed.
 */
export default function StoryCard({ story }) {
  const lastUpdated = story.updatedAt ? new Date(story.updatedAt).toLocaleString() : "";
  return (
    <article className="sc-card">
      <div className="sc-card-body">
        <h3 className="sc-card-title">{story.title}</h3>
        <p className="sc-card-desc">{story.summary || story.description || "A collaborative story."}</p>
      </div>
      <div className="sc-card-foot">
        <div className="meta">
          <span>🕒 {lastUpdated}</span>
          <span>🧩 {story.paragraphCount ?? 0} parts</span>
        </div>
        <Link to={`/stories/${story.id}`} className="btn-primary">Open</Link>
      </div>
    </article>
  );
}
