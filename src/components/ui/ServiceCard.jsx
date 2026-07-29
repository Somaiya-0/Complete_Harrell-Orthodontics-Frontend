import React from "react";
import Card from "./Card.jsx";

/** Clickable service/treatment card linking to a content page. */
export default function ServiceCard({ to, title, blurb }) {
  return (
    <Card as="a" href={to} interactive className="group relative block p-6">
      <span className="absolute top-0 left-6 right-6 h-[3px] bg-breath scale-x-0 group-hover:scale-x-100 origin-left transition-transform rounded-full" />
      <h3 className="text-[15px] font-semibold mb-2 text-ink leading-snug">{title}</h3>
      <p className="text-[13px] text-ink/55 leading-relaxed">{blurb}</p>
    </Card>
  );
}
