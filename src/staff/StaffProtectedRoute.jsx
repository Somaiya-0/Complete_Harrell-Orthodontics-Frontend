import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext.jsx";

export default function StaffProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10">Loading…</div>;
  if (!user || (user.role !== "staff" && !user.is_superuser)) {
    return <Navigate to="/office-portal/login" replace />;
  }
  return children;
}
