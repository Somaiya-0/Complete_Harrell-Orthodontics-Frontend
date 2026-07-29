import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_BASE || "https://longest-neighborhood-port-sustained.trycloudflare.com/api";

export const api = axios.create({ baseURL: API_BASE });


api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("access_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

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
