import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../api/AuthContext.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/referral-portal/dashboard" replace />;

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
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="text-2xl mb-1 text-ink">Referring Provider Portal</h1>
      <p className="text-sm text-ink/60 mb-8">
        Password-protected area for referring doctors &amp; practices.
      </p>
      <form onSubmit={handleSubmit} className="grid gap-4 bg-white border border-ink/10 rounded-2xl p-6">
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
        <button
          disabled={busy}
          className="bg-ink text-white rounded-full px-6 py-3 font-medium disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="text-xs text-ink/40 mt-4">
        Need portal access? Contact our office to be set up as a referring provider.
      </p>
    </div>
  );
}
