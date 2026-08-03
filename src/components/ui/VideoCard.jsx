import React, { useState } from "react";
import Card from "./Card.jsx";

const CATEGORY_LABELS = {
  patient_testimonial: "Patient Testimonial",
  educational: "Educational",
  office_tour: "Office Tour",
};

// Pulls a YouTube video ID out of watch/embed/short/youtu.be style URLs.
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
  );
  return match ? match[1] : null;
}

export default function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  const youTubeId = getYouTubeId(video.video_url);
  const thumbnail = video.thumbnail || (youTubeId ? `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg` : null);
  const canPlay = Boolean(youTubeId);

  return (
    <Card interactive className="overflow-hidden group">
      <div className="aspect-video bg-ink/5 flex items-center justify-center relative overflow-hidden">
        {playing && youTubeId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            {thumbnail ? (
              <img src={thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <span className="text-ink/30 text-xs">Video pending</span>
            )}
            {canPlay ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${video.title}`}
                className="absolute inset-0 flex items-center justify-center bg-ink/0 hover:bg-ink/10 transition-colors"
              >
                <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-ink shadow group-hover:opacity-100 opacity-90 transition-opacity">&#9654;</span>
              </button>
            ) : (
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/10 transition-colors">
                <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-ink shadow opacity-0 group-hover:opacity-100 transition-opacity">&#9654;</span>
              </span>
            )}
          </>
        )}
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
