import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image: "/images/dr-harrell-clinical-photo.png",
    message:
      "We create beautiful smiles and focus on Airway, Breathing, and TMJ (Jaw) Disorders.",
    tag: "Our Focus",
  },
  // {
  //   image: "/images/top-doctor-writeup.png",
  //   eyebrow: "Dr. William E. Harrell, Jr., DMD",
  //   message: "Voted one of the Top 100 Orthodontists in the USA!",
  //   tag: "Recognized",
  // },
  {
    image: "/images/trio-system-equipment.jpg",
    message:
      "First in Alabama with 3D Conebeam and facial imaging, plus 3D intra-oral scanning. No messy impressions.",
    tag: "First in Alabama",
  },
  {
    image: "/images/harrell_hospital.webp",
    message:
      "We treat Sleep Disordered Breathing and CPAP intolerance, including Obstructive Sleep Apnea, Upper Airway Resistance, and snoring.",
    tag: "Sleep & Airway",
  },
  {
    image: "/images/Harrell_full.png",
    message:
      "We treat TMJ (Jaw) Disorders, including jaw pain, clicking, popping, locking, and headaches from clenching and grinding.",
    tag: "TMJ Care",
  },
];

const DURATION = 4000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const [ratios, setRatios] = useState({});
  const sectionRef = useRef(null);
  const reduceMotionRef = useRef(false);

  // Preload every slide's photo once, just to read its true width/height
  // so the frame can be shaped to match — no cropping, no letterboxing.
  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new Image();
      img.onload = () => {
        setRatios((prev) => ({
          ...prev,
          [s.image]: img.naturalWidth / img.naturalHeight,
        }));
      };
      img.src = s.image;
    });
  }, []);

  useEffect(() => {
    reduceMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
      setProgressKey((k) => k + 1);
    }, DURATION);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduceMotionRef.current) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect) {
          const progress = Math.min(Math.max(-rect.top, 0), 400);
          setScrollOffset(progress * 0.12);
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleMouseMove(e) {
    if (reduceMotionRef.current) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  function goTo(i) {
    setIndex(i);
    setProgressKey((k) => k + 1);
  }

  const slide = SLIDES[index];
  const bgX = tilt.x * 18;
  const bgY = tilt.y * 18 + scrollOffset * -1;
  const cardX = tilt.x * -10;
  const cardY = tilt.y * -10;
  // The frame's shape follows the current photo's real proportions (falls
  // back to a sane widescreen ratio for the instant before it's measured).
  const currentRatio = ratios[slide.image] || 16 / 9;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-ink overflow-hidden w-full transition-[aspect-ratio] duration-700 ease-in-out"
      style={{
        aspectRatio: currentRatio,
        minHeight: 320,
        maxHeight: 720,
      }}
    >
      {/* Photo stack — each slide is sized to exactly fill the frame once the
          frame itself has adopted that slide's own aspect ratio, so the
          active photo is always shown whole, edge-to-edge, never cropped. */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.image}
            className="absolute inset-0 transition-opacity duration-[1100ms] ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <img
              key={i === index ? `${index}-${progressKey}` : "static"}
              src={s.image}
              alt={s.tag}
              className="w-full h-full object-cover [animation:kenburns_9s_ease-in-out_infinite_alternate]"
              style={{
                transform: `translate3d(${bgX}px, ${bgY}px, 0)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Legibility gradients over the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/55 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />

      {/* Signature element: a slow "breathing" pulse behind the glass card */}
      <div
        className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block"
        aria-hidden="true"
      >
        <span className="absolute -translate-x-1/3 -translate-y-1/2 w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full border border-breath/25 [animation:breathe_5s_ease-in-out_infinite]" />
        <span className="absolute -translate-x-1/3 -translate-y-1/2 w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full border border-breath/15 [animation:breathe_5s_ease-in-out_infinite] [animation-delay:1.2s]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-6 md:px-16">
        <div
          key={`text-${index}`}
          className="w-full max-w-xl rounded-[28px] border border-white/15 bg-white/[0.08] backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] p-7 md:p-10 animate-[fadeUp_0.6s_ease] transition-transform duration-300 will-change-transform"
          style={{ transform: `translate3d(${cardX}px, ${cardY}px, 0)` }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-breath bg-breath/10 border border-breath/30 rounded-full px-3 py-1 mb-4">
            {slide.tag}
          </span>

          {slide.eyebrow && (
            <p className="text-white/70 text-sm font-medium mb-2">
              {slide.eyebrow}
            </p>
          )}

          <p
            className="text-white text-xl md:text-3xl leading-[1.3] font-display mb-7"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {slide.message}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:256-234-6353"
              className="group relative bg-breath text-white px-6 py-3 rounded-full font-semibold overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-5px_rgba(88,157,246,0.6)]"
            >
              <span className="relative z-10">Call 256-234-6353</span>
            </a>

            <Link
              to="/patient-forms"
              className="border border-white/30 text-white px-6 py-3 rounded-full font-medium backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/50"
            >
              Online Patient Form
            </Link>
          </div>
        </div>
      </div>

      {/* Progress pills */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-1.5 w-8 rounded-full bg-white/20 overflow-hidden transition-transform duration-200 hover:scale-x-125"
            aria-label={`Slide ${i + 1}`}
          >
            {i === index && (
              <span
                key={progressKey}
                className="absolute inset-y-0 left-0 bg-breath rounded-full [animation:growWidth_4s_linear]"
              />
            )}
            {i < index && (
              <span className="absolute inset-0 bg-breath/50 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-2 right-6 hidden md:flex items-center gap-2 text-white/40 text-xs z-10">
        <span>Scroll</span>
        <span className="[animation:bounceDown_1.6s_ease-in-out_infinite]">↓</span>
      </div>

      <style>{`
        @keyframes growWidth {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes kenburns {
          from { transform: scale(1); }
          to { transform: scale(1.09); }
        }
        @keyframes breathe {
          0%, 100% { transform: translate(-33%, -50%) scale(0.92); opacity: 0.5; }
          50% { transform: translate(-33%, -50%) scale(1.05); opacity: 0.9; }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(4px); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </section>
  );
}