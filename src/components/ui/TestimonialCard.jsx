import React from "react";

export default function TestimonialCard({ review }) {
  return (
    <div className="bg-white border border-ink/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-ink">{review.author_name}</p>
        <span className="text-breath text-sm">
          {"\u2605".repeat(review.rating)}{"\u2606".repeat(5 - review.rating)}
        </span>
      </div>
      <p className="text-sm text-ink/70 leading-relaxed">{review.body}</p>
    </div>
  );
}
