import React from "react";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Profile page showing basic user info.
 */
export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="page">
      <div className="page-inner">
        <h2>Profile</h2>
        <div className="card">
          <div><strong>Email:</strong> {user?.email}</div>
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
.page{background:#f9fafb;min-height:calc(100vh - 60px);}
.page-inner{max-width:840px;margin:0 auto;padding:20px 16px}
.card{background:#fff;border:1px solid rgba(17,24,39,.06);border-radius:14px;padding:14px;box-shadow:0 6px 18px rgba(17,24,39,.04)}
`;
