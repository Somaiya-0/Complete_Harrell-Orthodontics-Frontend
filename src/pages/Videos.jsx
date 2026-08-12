import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { withFallback } from "../api/withFallback.js";
import { mockVideos } from "../mockData.js";
import Hero from "../components/ui/Hero.jsx";
import Section from "../components/ui/Section.jsx";
import VideoCard from "../components/ui/VideoCard.jsx";

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    withFallback(() => api.get("/videos/"), mockVideos).then(setVideos);
  }, []);

  return (
    <div>
      {/* "Videos" renamed to "Video Testimonials" per client review 8-10-2026 (#18) */}
      <Hero eyebrow="Education" title="Video Testimonials" subtitle="Patient testimonials and experiences from our practice."/>
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {videos.map((v) => <VideoCard key={v.id} video={v} />)}
        </div>
      </Section>
    </div>
  );
}
