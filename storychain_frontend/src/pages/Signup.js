import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

/**
 * PUBLIC_INTERFACE
 * Signup page with email/password.
 */
export default function Signup() {
  const { signup, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const res = await signup(email, password);
    if (res.success) {
      navigate("/stories", { replace: true });
    } else {
      setErr(res.message || "Signup failed");
    }
  };

  return (
    <div className="page-wrap">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p className="muted">Join StoryChain and start writing together.</p>
        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="you@example.com"/>
          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="••••••••"/>
          {err && <div className="error">{err}</div>}
          <button className="btn-primary" type="submit" disabled={loading}>{loading ? <Loader text="Creating account"/> : "Sign Up"}</button>
        </form>
        <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
      <style>{authStyles}</style>
    </div>
  );
}

const authStyles = `
.page-wrap{min-height:calc(100vh - 60px);display:flex;align-items:center;justify-content:center;background:#f9fafb;padding:24px}
.auth-card{background:#fff;border:1px solid rgba(17,24,39,.06);border-radius:16px;box-shadow:0 10px 30px rgba(17,24,39,.06);padding:28px;max-width:400px;width:100%}
h2{margin:0 0 6px 0}
.muted{color:#6b7280;font-size:14px;margin:0 0 16px 0}
.form{display:grid;gap:8px}
label{font-size:12px;color:#6b7280}
input{padding:10px 12px;border-radius:10px;border:1px solid rgba(17,24,39,.12);outline:none}
input:focus{box-shadow:0 0 0 4px rgba(37,99,235,.15)}
.error{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.35);padding:8px 10px;border-radius:8px;color:#b91c1c;font-size:13px}
.btn-primary{margin-top:8px;background:linear-gradient(135deg,rgba(37,99,235,.95),rgba(37,99,235,.85));color:#fff;border:1px solid transparent;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
`;
