import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StoryFeed from "./pages/StoryFeed";
import StoryDetail from "./pages/StoryDetail";
import Profile from "./pages/Profile";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * App component: defines routes and theme toggle.
 */
function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <Routes>
          <Route path="/" element={<Navigate to="/stories" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/stories" element={<StoryFeed />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

// PUBLIC_INTERFACE
function NotFound() {
  return (
    <div className="page" style={{ padding: 24 }}>
      <h2>Not Found</h2>
      <p className="muted">The page you requested does not exist.</p>
    </div>
  );
}

export default App;
