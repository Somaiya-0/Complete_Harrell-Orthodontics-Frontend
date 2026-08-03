import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "./client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    // If the access token has expired, client.js's response interceptor
    // will transparently refresh it and retry this call -- so a 401 here
    // now only means the refresh token itself is gone/invalid, i.e. a
    // genuine logout, not just a stale access token.
    api
      .get("/auth/me/")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      })
      .finally(() => setLoading(false));
  }, []);

  // Fired by client.js when a token refresh attempt genuinely fails
  // (refresh token missing/expired/revoked) -- clears the logged-in state
  // everywhere the app is showing it, not just wherever the failed request
  // happened to originate.
  useEffect(() => {
    function handleForcedLogout() {
      setUser(null);
    }
    window.addEventListener("auth:logout", handleForcedLogout);
    return () => window.removeEventListener("auth:logout", handleForcedLogout);
  }, []);

  async function login(username, password) {
    const res = await api.post("/auth/login/", { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    const me = await api.get("/auth/me/");
    setUser(me.data);
    return me.data;
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
