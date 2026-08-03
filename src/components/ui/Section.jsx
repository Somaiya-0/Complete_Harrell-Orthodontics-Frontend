import React from "react";
import { motion } from "framer-motion";
import Container from "./Container.jsx";

/** Standard vertical section rhythm. `tone` picks a background so pages
 * don't hand-roll bg-white/bg-ink combinations inconsistently. */
const TONES = {
  paper: "bg-paper",
  white: "bg-white",
  ink: "bg-ink",
  mist: "bg-mist/40",
};

// Every section fades/slides gently into view as the user scrolls to it.
// `once: true` means it only plays the first time, so re-scrolling up and
// down the page doesn't feel jumpy or repetitive.
const REVEAL = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function Section({ tone = "paper", tight = false, className = "", containerClassName = "", children }) {
  return (
    <section className={`${TONES[tone] || ""} ${tight ? "py-10" : "py-16 md:py-20"} ${className}`}>
      <Container className={containerClassName}>
        <motion.div {...REVEAL}>{children}</motion.div>
      </Container>
    </section>
  );
}
