import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../api/client";

/**
 * PUBLIC_INTERFACE
 * AuthContext provides authentication state and helpers across the app.
 */
export const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * useAuth hook to access auth context values.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps the app and persists user/session in localStorage.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("sc_token") || null);
  const [loading, setLoading] = useState(false);

  // Attempt to fetch profile if token exists on mount
  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      if (!token) return;
      setLoading(true);
      try {
        const res = await apiClient.get("/auth/me");
        if (!cancelled) setUser(res.data);
      } catch (e) {
        // invalid token, clear it
        if (!cancelled) {
          localStorage.removeItem("sc_token");
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadProfile();
    return () => { cancelled = true; };
  }, [token]);

  // Attach token to axios instance
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common.Authorization;
    }
  }, [token]);

  // PUBLIC_INTERFACE
  async function login(email, password) {
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      const { accessToken, user: userInfo } = res.data || {};
      if (accessToken) {
        localStorage.setItem("sc_token", accessToken);
        setToken(accessToken);
      }
      setUser(userInfo || { email });
      return { success: true };
    } catch (e) {
      return { success: false, message: e?.response?.data?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  async function signup(email, password) {
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/signup", { email, password });
      const { accessToken, user: userInfo } = res.data || {};
      if (accessToken) {
        localStorage.setItem("sc_token", accessToken);
        setToken(accessToken);
      }
      setUser(userInfo || { email });
      return { success: true };
    } catch (e) {
      return { success: false, message: e?.response?.data?.message || "Signup failed" };
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  function logout() {
    localStorage.removeItem("sc_token");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    signup,
    logout
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
