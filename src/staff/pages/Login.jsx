import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../api/AuthContext.jsx";

export default function StaffLogin() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user && (user.role === "staff" || user.is_superuser)) {
    return <Navigate to="/office-portal/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(username, password);
    } catch {
      setError("Incorrect username or password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8">
        <p className="text-xs uppercase tracking-widest text-breath font-semibold mb-1">Staff Only</p>
        <h1 className="text-2xl font-display text-ink mb-6">Practice Dashboard Login</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="block">
            <span className="text-sm font-medium text-ink/80">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink/80">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2"
            />
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button disabled={busy} className="bg-breath text-white rounded-full px-6 py-3 font-medium disabled:opacity-60">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-xs text-ink/40 mt-5">
          This is separate from Django Admin, which is reserved for the developer / super-admin account.
        </p>
      </div>
    </div>
  );
}
