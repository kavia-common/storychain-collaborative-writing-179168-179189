import React from "react";

/**
 * PUBLIC_INTERFACE
 * Alert component to display contextual messages with consistent styling.
 * Variants: "error" | "success" | "info" | "warning"
 */
export default function Alert({ variant = "info", title, children }) {
  const stylesByVariant = {
    error: {
      bg: "rgba(239, 68, 68, 0.08)",
      border: "rgba(239, 68, 68, 0.35)",
      color: "#b91c1c",
      icon: "⚠️"
    },
    success: {
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.35)",
      color: "#92400e",
      icon: "✅"
    },
    info: {
      bg: "rgba(37, 99, 235, 0.08)",
      border: "rgba(37, 99, 235, 0.35)",
      color: "#1e40af",
      icon: "ℹ️"
    },
    warning: {
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.35)",
      color: "#92400e",
      icon: "⚠️"
    }
  };

  const s = stylesByVariant[variant] || stylesByVariant.info;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        padding: "8px 10px",
        borderRadius: 8,
        color: s.color,
        fontSize: 13,
        display: "flex",
        alignItems: "flex-start",
        gap: 8
      }}
    >
      <span aria-hidden="true" style={{ lineHeight: 1.2 }}>{s.icon}</span>
      <div>
        {title && <div style={{ fontWeight: 700, marginBottom: 2 }}>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}
