import React from "react";

export default function Eyebrow({ children, dark = false }) {
  // On dark backgrounds this is the "subscript" the client asked to have
  // "highlighted in blue" (review 8-10-2026 #12) -- rendered as a blue
  // highlighted pill instead of plain small text so it actually stands out.
  return (
    <p
      className={
        dark
          ? "inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-blue-100 bg-blue-500/25 border border-blue-400/40 rounded-full px-3 py-1 mb-3"
          : "text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 text-breath"
      }
    >
      {children}
    </p>
  );
}
