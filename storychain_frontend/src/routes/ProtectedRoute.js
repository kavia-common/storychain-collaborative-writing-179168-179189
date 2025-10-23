import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * ProtectedRoute guards authenticated views; redirects to /login when unauthenticated.
 */
export default function ProtectedRoute() {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!user && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
