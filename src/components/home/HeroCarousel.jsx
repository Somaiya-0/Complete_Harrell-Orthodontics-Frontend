import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image: "/images/dr-harrell-clinical-photo.png",
    message:
      "We create beautiful smiles and focus on Airway, Breathing, and TMJ (Jaw) Disorders.",
    tag: "Our Focus",
  },
  {
    image: "/images/top-doctor-writeup.png",
    eyebrow: "Dr. William E. Harrell, Jr., DMD",
    message: "Voted one of the Top 100 Orthodontists in the USA!",
    tag: "Recognized",
  },
  
  {
    image: "/images/trio-system-equipment.jpg",
    message:
      "We are the FIRST IN ALABAMA to have 3D CONEBEAM imaging along with 3D facial imaging and 3D intra-oral scanning of the teeth. YES, NO MESSY IMPRESSIONS!",
    tag: "First in Alabama",
  },
  {
    image: "/images/scanner-patient-3600.png",
    message:
      "We treat patients who have Sleep Disordered Breathing issues and are CPAP intolerant. This includes Obstructive Sleep Apnea, Upper Airway Resistance, Snoring, etc.",
    tag: "Sleep & Airway",
  },
  {
    image: "/images/dr-harrell-headshot.png",
    message:
      "We treat patients with TMJ (Jaw) Disorders including jaw pain, clicking/popping, locking, headaches associated with clenching and grinding.",
    tag: "TMJ Care",
  },
  
];

const DURATION = 4000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
      setProgressKey((k) => k + 1);
    }, DURATION);

    return () => clearInterval(id);
  }, []);

  function goTo(i) {
    setIndex(i);
    setProgressKey((k) => k + 1);
  }

  const slide = SLIDES[index];

  return (
    <section className="relative bg-ink overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        preserveAspectRatio="none"
        viewBox="0 0 800 300"
      >
        <path
          d="M0 150 Q50 60 100 150 T200 150 T300 150 T400 150 T500 150 T600 150 T700 150 T800 150"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-center min-h-[480px]">
        
        <div key={`text-${index}`} className="animate-[fadeUp_0.5s_ease]">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-breath bg-breath/10 border border-breath/30 rounded-full px-3 py-1 mb-5">
            {slide.tag}
          </span>

          {slide.eyebrow && (
            <p className="text-white/60 text-sm font-medium mb-2">
              {slide.eyebrow}
            </p>
          )}

          <p className="text-white text-2xl md:[font-size:2rem] leading-[1.25] font-display mb-8 max-w-lg">
            {slide.message}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:256-234-6353"
              className="bg-breath text-white px-6 py-3 rounded-full font-semibold hover:bg-breath/90 transition-colors"
            >
              Call 256-234-6353
            </a>

            <Link
              to="/patient-forms"
              className="border border-white/25 text-white px-6 py-3 rounded-full font-medium hover:bg-white/5 transition-colors"
            >
              Online Patient Form
            </Link>
          </div>
        </div>


        <div className="relative mx-auto md:mx-0 w-full max-w-md">
          <div className="absolute -inset-3 border border-breath/40 rounded-[28px]" />

          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-breath/20 rounded-2xl -z-0" />

          <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-gradient-to-br from-white/[0.08] to-white/[0.02] h-72 md:h-80">

            <img
              key={slide.image}
              src={slide.image}
              alt={slide.tag}
              className="w-full h-full object-cover animate-[fadeIn_0.6s_ease]"
            />

          </div>
        </div>
      </div>


      <div className="relative flex justify-center gap-2 pb-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-1.5 w-8 rounded-full bg-white/15 overflow-hidden"
            aria-label={`Slide ${i + 1}`}
          >
            {i === index && (
              <span
                key={progressKey}
                className="absolute inset-y-0 left-0 bg-breath rounded-full animate-[growWidth_4s_linear]"
              />
            )}

            {i < index && (
              <span className="absolute inset-0 bg-breath/50 rounded-full" />
            )}
          </button>
        ))}
      </div>


      <div className="relative text-center pb-4 text-white/40 text-xs">
        Scroll down for more ↓
      </div>


      <style>{`
        @keyframes growWidth {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}