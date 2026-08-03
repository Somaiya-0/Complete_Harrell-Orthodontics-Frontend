import React from "react";
import { motion } from "framer-motion";
import Container from "./Container.jsx";
import Eyebrow from "./Eyebrow.jsx";

/**
 * Reusable inner-page hero.
 *
 * Default:
 * - Text-only hero banner (used for About, Team, Orthodontics, TMJ, Airway, etc.)
 *
 * With showImage={true}:
 * - Displays image beside the hero content (only for Home page if needed)
 */
export default function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
  showImage = false,
}) {
  return (
    <section className="relative bg-ink overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        preserveAspectRatio="none"
        viewBox="0 0 800 200"
      >
        <path
          d="M0 100 Q50 30 100 100 T200 100 T300 100 T400 100 T500 100 T600 100 T700 100 T800 100"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <Container
        className={`relative py-16 md:py-20 ${
          showImage && image
            ? "grid md:grid-cols-2 gap-12 items-center"
            : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}

          <h1 className="font-display text-3xl md:text-4xl text-white mb-4 max-w-xl">
            {title}
          </h1>

          {subtitle && (
            <p className="text-white/65 max-w-lg leading-relaxed">
              {subtitle}
            </p>
          )}

          {children}
        </motion.div>

        {showImage && image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto md:mx-0 w-full max-w-md"
          >
            <div className="absolute -inset-3 border border-breath/40 rounded-[28px]" />

            <img
              src={image}
              alt={title || "Hero image"}
              className="relative rounded-3xl shadow-lifted w-full h-64 md:h-72 object-cover"
            />
          </motion.div>
        )}
      </Container>
    </section>
  );
}