import React from "react";

/**
 * PUBLIC_INTERFACE
 * TextArea with consistent styling.
 */
export default function TextArea({ value, onChange, placeholder, rows = 5 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid rgba(17,24,39,0.12)",
        outline: "none",
        resize: "vertical",
        fontSize: 14,
        lineHeight: 1.5,
        background: "#fff",
        boxShadow: "0 1px 2px rgba(17,24,39,0.04)"
      }}
      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.15)")}
      onBlur={(e) => (e.currentTarget.style.boxShadow = "0 1px 2px rgba(17,24,39,0.04)")}
    />
  );
}
