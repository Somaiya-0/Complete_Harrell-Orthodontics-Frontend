import axios from "axios";

//export const API_BASE = import.meta.env.VITE_API_BASE || "https://adapted-nor-unlike-photographs.trycloudflare.com/api";

export const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

export const api = axios.create({ baseURL: API_BASE });


api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("access_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// --- Silent token refresh --------------------------------------------------
// Access tokens are short-lived by design. Without this, the FIRST request
// made after the access token expires (including the /auth/me/ check that
// runs on every page load in AuthContext) fails with a 401 -- and previously
// that immediately wiped both tokens and logged the user out, even though a
// still-valid refresh token was sitting right there unused. This is what
// shows up as "randomly logged out." Now we try the refresh token first and
// only actually log the user out if the refresh itself is rejected.
let refreshPromise = null;

function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return Promise.reject(new Error("No refresh token available"));

  // If several requests 401 at the same moment, only hit the refresh
  // endpoint once and let them all share the result.
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_BASE}/auth/refresh/`, { refresh })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        // Some backends rotate the refresh token on every use -- store the
        // new one if it's returned, otherwise keep the existing one.
        if (res.data.refresh) localStorage.setItem("refresh_token", res.data.refresh);
        return res.data.access;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;
    const isAuthCall =
      config?.url?.includes("/auth/login/") || config?.url?.includes("/auth/refresh/");

    if (response?.status === 401 && config && !config._retry && !isAuthCall) {
      config._retry = true; // prevent infinite retry loops
      try {
        const newAccess = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccess}`;
        return api(config);
      } catch (refreshErr) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // AuthContext listens for this to clear its user state everywhere,
        // without client.js needing to import AuthContext directly.
        window.dispatchEvent(new Event("auth:logout"));
      }
    }
    return Promise.reject(error);
  }
);

// Converts a typed MM/DD/YYYY string into the ISO date the API expects.
// The user only ever sees/types MM/DD/YYYY -- this is the one place that
// translates it, per the client's explicit "no calendar scroll" request.
export function mmddyyyyToISO(value) {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
  if (!m) return null;
  const [, mm, dd, yyyy] = m;
  const month = mm.padStart(2, "0");
  const day = dd.padStart(2, "0");
  return `${yyyy}-${month}-${day}`;
}

export function isValidMMDDYYYY(value) {
  const iso = mmddyyyyToISO(value);
  if (!iso) return false;
  const d = new Date(iso + "T00:00:00");
  return !Number.isNaN(d.getTime());
}
