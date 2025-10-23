import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

/**
 * PUBLIC_INTERFACE
 * Navbar with brand, navigation and auth controls.
 */
export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sc-nav">
      <div className="sc-nav-inner">
        <Link to="/stories" className="sc-brand">
          <span className="brand-icon">📚</span>
          StoryChain
        </Link>
        <nav className="sc-links">
          <NavLink to="/stories" className={({isActive}) => isActive ? "active" : ""}>Feed</NavLink>
          {user && <NavLink to="/profile" className={({isActive}) => isActive ? "active" : ""}>Profile</NavLink>}
        </nav>
        <div className="sc-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn-outline">Log in</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </>
          ) : (
            <>
              <span className="sc-user">{user.email || "User"}</span>
              <button onClick={logout} className="btn-danger">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
