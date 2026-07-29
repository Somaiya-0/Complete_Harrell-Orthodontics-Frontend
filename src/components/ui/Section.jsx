import React from "react";
import Container from "./Container.jsx";

/** Standard vertical section rhythm. `tone` picks a background so pages
 * don't hand-roll bg-white/bg-ink combinations inconsistently. */
const TONES = {
  paper: "bg-paper",
  white: "bg-white",
  ink: "bg-ink",
  mist: "bg-mist/40",
};

export default function Section({ tone = "paper", tight = false, className = "", containerClassName = "", children }) {
  return (
    <section className={`${TONES[tone] || ""} ${tight ? "py-10" : "py-16 md:py-20"} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
