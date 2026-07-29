import { useEffect, useState, useCallback } from "react";
import { api } from "./client.js";

/**
 * Backs a "Manage X" dashboard screen. Tries the real staff API first;
 * if the backend isn't reachable/seeded, falls back to the given mock
 * array and performs create/update/delete purely in local state so the
 * screen is still fully usable for demoing/building the UI against.
 */
export function useApiResource(listUrl, mockArray) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .get(listUrl)
      .then((res) => {
        const data = res.data;
        setItems(Array.isArray(data.results) ? data.results : data);
        setUsingMock(false);
      })
      .catch(() => {
        setItems(mockArray);
        setUsingMock(true);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUrl]);

  useEffect(() => {
    load();
  }, [load]);

  // Builds multipart/form-data automatically when the payload contains a
  // File (e.g. a doctor photo upload) -- otherwise sends plain JSON.
  function toRequestBody(payload) {
    const hasFile = Object.values(payload).some((v) => v instanceof File);
    if (!hasFile) return { body: payload, headers: undefined };
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== null && v !== undefined) form.append(k, v);
    });
    return { body: form, headers: { "Content-Type": "multipart/form-data" } };
  }

  async function create(payload) {
    if (usingMock) {
      const withId = {
        ...payload,
        id: Date.now(),
        photo: payload.photo instanceof File ? URL.createObjectURL(payload.photo) : payload.photo,
      };
      setItems((prev) => [withId, ...prev]);
      return withId;
    }
    const { body, headers } = toRequestBody(payload);
    const res = await api.post(listUrl, body, headers ? { headers } : undefined);
    setItems((prev) => [res.data, ...prev]);
    return res.data;
  }

  async function update(id, payload) {
    if (usingMock) {
      const patched = {
        ...payload,
        photo: payload.photo instanceof File ? URL.createObjectURL(payload.photo) : payload.photo,
      };
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patched } : it)));
      return { id, ...patched };
    }
    const { body, headers } = toRequestBody(payload);
    const res = await api.patch(`${listUrl}${id}/`, body, headers ? { headers } : undefined);
    setItems((prev) => prev.map((it) => (it.id === id ? res.data : it)));
    return res.data;
  }

  async function remove(id) {
    if (usingMock) {
      setItems((prev) => prev.filter((it) => it.id !== id));
      return;
    }
    await api.delete(`${listUrl}${id}/`);
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return { items, setItems, loading, usingMock, create, update, remove, reload: load };
}
