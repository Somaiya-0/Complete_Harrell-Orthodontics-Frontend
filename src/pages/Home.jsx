import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";
import { withFallback } from "../api/withFallback.js";
import { mockFinancing, mockVideos } from "../mockData.js";
import HeroCarousel from "../components/home/HeroCarousel.jsx";
import Section from "../components/ui/Section.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import ServiceCard from "../components/ui/ServiceCard.jsx";
import VideoCard from "../components/ui/VideoCard.jsx";
import Button from "../components/ui/Button.jsx";

const SERVICES = [
  { slug: "orthodontics-ages-4-6", title: "Early Orthodontics, Ages 4-6", blurb: "\"Fix before 6\" -- early evaluation while facial growth is still happening." },
  { slug: "orthodontics-ages-7-11", title: "Orthodontics, Ages 7-11", blurb: "Guided growth before the last baby teeth are gone." },
  { slug: "orthodontics-teens", title: "Teen Orthodontics", blurb: "Comprehensive treatment, focused on non-extraction where possible." },
  { slug: "orthodontics-adult", title: "Adult Orthodontics", blurb: "Invisible Clear Aligner Therapy and braces, at any age." },
  { slug: "tmj-disorders", title: "TMJ Disorders", blurb: "Splint therapy, InvisaTMJ\u00A9, and coordinated surgical care." },
  { slug: "sleep-airway-disorders", title: "Sleep, Breathing & Airway Disorders", blurb: "Coordinated care for children and adults with sleep-disordered breathing." },
  { slug: "myofunctional-therapy", title: "Myofunctional Therapy", blurb: "Retraining the muscles of the face, mouth, and tongue for proper function." },
  { slug: "airway-diagnostics", title: "Airway Diagnostics", blurb: "CBCT, 3D facial imaging, 3D intraoral scanning, and nasal airflow testing -- \"The Anatomic Truth.\"" },
];

export default function Home() {
  const [financing, setFinancing] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
  withFallback(() => api.get("/financing/options/"), mockFinancing)
    .then((data) => {
      setFinancing(data.length ? data : mockFinancing);
    });

  withFallback(() => api.get("/videos/"), mockVideos)
    .then((data) => {
      setVideos(data.length ? data : mockVideos);
    });
}, []);

  const primaryFinancing = financing.find((f) => f.is_primary) || financing[0];
  // Client review 8-10-2026 (#09): show all 4 videos here, matching the
  // Videos page -- previously this was cut down to 3.
  const homeVideos = videos.filter((v) => v.category !== "office_tour");

  return (
    <div>
      <HeroCarousel />

      <Section>
        <SectionHeader eyebrow="What We Treat" title="Services" className="mb-10" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} to={`/learn/${s.slug}`} title={s.title} blurb={s.blurb} />
          ))}
        </div>
      </Section>

      {/* Airway Breathing Academy -- real client copy + real banner asset */}
      <Section tight>
        <div className="bg-ink rounded-3xl overflow-hidden relative">
          <svg className="absolute -right-10 -bottom-10 w-56 h-56 opacity-10" viewBox="0 0 100 100">
            <path d="M0 50 Q12 15 25 50 T50 50 T75 50 T100 50" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <div className="grid md:grid-cols-2 relative items-stretch">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <SectionHeader
                eyebrow="Educational Website"
                title="Airway Breathing Academy"
                subtitle="Created with Dr. David McIntosh, a Pediatric ENT in Australia, for parents, patients, and professionals to gain knowledge on airway and sleep-disordered breathing -- so you can recognize the signs in minutes, not months."
                dark
              />
              <div className="grid grid-cols-3 gap-2 my-6 max-w-sm">
                {["Patients", "Parents", "Professionals"].map((who) => (
                  <div key={who} className="bg-white/[0.06] border border-white/10 rounded-xl px-2 py-3 text-center">
                    <p className="text-xs font-medium text-white">{who}</p>
                  </div>
                ))}
              </div>
              <Button href="https://training.airwaybreathingacademy.com" variant="primary" className="w-fit">
                Join the Academy
              </Button>
            </div>
            <div className="flex items-center justify-center md:justify-end p-5 md:p-8 pr-6 md:pr-10">
  <div className="rounded-[36px] overflow-hidden w-full max-w-md shadow-lg border border-white/10 bg-black p-3">
    <img
      src="/images/airway-breathing-academy-banner.jpg"
      alt="Airway Breathing Academy"
      className="w-full h-64 md:h-[330px] object-contain rounded-[24px]"
    />
  </div>
</div>
          </div>
        </div>
      </Section>

      <Section tight>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white border border-ink/10 rounded-3xl p-8 md:p-10">

          {/* Book Cover */}
          <div className="shrink-0">
            <img
              src="/images/book-cover-harrell-textbook.jpeg"
              alt="Sleep, Craniofacial Form, and Airway Function Disorders book cover"
              className="w-40 md:w-48 rounded-xl shadow-lg border border-ink/10"
            />
          </div>

          {/* Book Information */}
          <div className="flex-1">
            <SectionHeader
              eyebrow="Dr. Harrell Publications"
              title="Sleep, Craniofacial Form, and Airway Function Disorders"
              subtitle="Springer Publishing · Expected 2026 · 34 co-authors · 44 chapters"
              className="max-w-xl"
            />
          </div>

          {/* Button */}
          <Button
            to="/publications"
            variant="dark"
            className="shrink-0"
          >
            See All Publications
          </Button>

        </div>
      </Section>

      {primaryFinancing && (
        <Section tight>
          <div className="rounded-3xl border-2 border-breath bg-breathlight p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <SectionHeader eyebrow="Our Primary Financing Partner" title={primaryFinancing.display_name} subtitle={primaryFinancing.tagline} />
            <Button to="/financing" variant="dark" size="lg" className="shrink-0">Learn More</Button>
          </div>
        </Section>
      )}

      {homeVideos.length > 0 && (
        <Section>
          <div className="flex items-center justify-between mb-10">
            {/* "Videos" renamed to "Video Testimonials" per client review 8-10-2026 (#10/#18) */}
            <SectionHeader eyebrow="See For Yourself" title="Video Testimonials" />
            <Link to="/videos" className="text-breath text-sm font-semibold shrink-0">See all videos &rarr;</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeVideos.map((v) => <VideoCard key={v.id} video={v} />)}
          </div>
        </Section>
      )}
    </div>
  );
}
