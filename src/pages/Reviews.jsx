import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ author_name: "", rating: 5, body: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    api.get("/reviews/").then((res) => setReviews(res.data.results || res.data)).catch(() => setReviews([]));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await api.post("/reviews/submit/", form);
      setStatus("success");
      setForm({ author_name: "", rating: 5, body: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl mb-2 text-ink">Reviews</h1>
      <p className="text-ink/60 mb-8">What our patients are saying.</p>

      <div className="grid gap-4 mb-14">
        {reviews.length === 0 && <p className="text-ink/40 text-sm">No published reviews yet.</p>}
        {reviews.map((r) => (
          <div key={r.id} className="bg-white border border-ink/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-ink">{r.author_name}</p>
              <span className="text-breath text-sm">{"\u2605".repeat(r.rating)}{"\u2606".repeat(5 - r.rating)}</span>
            </div>
            <p className="text-sm text-ink/70">{r.body}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl p-6 max-w-lg">
        <h2 className="text-lg text-ink mb-1">Leave a review</h2>
        <p className="text-xs text-ink/50 mb-4">Reviews are checked by our office before publishing.</p>
        {status === "success" ? (
          <p className="text-sm text-breath">Thank you! Your review has been submitted for approval.</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              placeholder="Your name"
              value={form.author_name}
              onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
              className="rounded-lg border border-ink/20 px-3 py-2"
              required
            />
            <select
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
              className="rounded-lg border border-ink/20 px-3 py-2"
            >
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
            </select>
            <textarea
              placeholder="Your review"
              rows={4}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              className="rounded-lg border border-ink/20 px-3 py-2"
              required
            />
            {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
            <button disabled={status === "submitting"} className="bg-breath text-white rounded-full px-5 py-2 font-medium">
              {status === "submitting" ? "Submitting\u2026" : "Submit review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
