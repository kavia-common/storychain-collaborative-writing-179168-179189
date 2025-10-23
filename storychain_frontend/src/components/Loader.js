import React from "react";

/**
 * PUBLIC_INTERFACE
 * Loader spinner for async states.
 */
export default function Loader({ text = "Loading..." }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", padding: 12 }}>
      <div className="spin" style={{
        width: 18, height: 18, borderRadius: "50%",
        border: "3px solid rgba(37,99,235,0.2)",
        borderTopColor: "#2563EB",
        animation: "spin 1s linear infinite"
      }} />
      <span style={{ color: "#6b7280", fontSize: 14 }}>{text}</span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
