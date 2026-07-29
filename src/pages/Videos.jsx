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
      <Hero eyebrow="Education" title="Videos" subtitle="Educational videos and patient stories from our practice." />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => <VideoCard key={v.id} video={v} />)}
        </div>
      </Section>
    </div>
  );
}
