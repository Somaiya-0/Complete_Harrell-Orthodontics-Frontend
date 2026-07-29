import React from "react";
import Card from "./Card.jsx";

const CATEGORY_LABELS = {
  patient_testimonial: "Patient Testimonial",
  educational: "Educational",
  office_tour: "Office Tour",
};

export default function VideoCard({ video }) {
  return (
    <Card interactive className="overflow-hidden group">
      <div className="aspect-video bg-ink/5 flex items-center justify-center relative overflow-hidden">
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <span className="text-ink/30 text-xs">Video pending</span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/10 transition-colors">
          <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-ink shadow opacity-0 group-hover:opacity-100 transition-opacity">&#9654;</span>
        </span>
      </div>
      <div className="p-4">
        {video.category && (
          <p className="text-[10px] uppercase tracking-wide text-breath font-semibold mb-1">
            {CATEGORY_LABELS[video.category] || video.category}
          </p>
        )}
        <p className="font-medium text-ink text-sm mb-1">{video.title}</p>
        {video.production_note && <p className="text-[11px] text-ink/40 italic">{video.production_note}</p>}
      </div>
    </Card>
  );
}
