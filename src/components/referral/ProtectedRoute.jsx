import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../api/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="max-w-3xl mx-auto px-4 py-20">Loading…</div>;
  if (!user) return <Navigate to="/referral-portal" replace />;
  return children;
}
