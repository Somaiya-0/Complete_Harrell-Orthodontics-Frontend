import React from "react";

export default function BookCard({ title, authors, cover_image, size = "md" }) {
  const w = size === "lg" ? "w-36" : size === "sm" ? "w-24" : "w-full";
  return (
    <div className="text-center">
      <img src={cover_image} alt={title} className={`${w} mx-auto rounded-lg shadow-md mb-3`} />
      <p className={`text-ink ${size === "sm" ? "text-xs" : "text-sm"} leading-snug`}>{title}</p>
      {authors && <p className="text-[11px] text-ink/45 mt-0.5">{authors}</p>}
    </div>
  );
}
