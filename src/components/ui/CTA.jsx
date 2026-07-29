import React from "react";
import Button from "./Button.jsx";

/** Full-width call-to-action banner, reused at the bottom of content
 * pages instead of every page hand-building its own. */
export default function CTA({
  eyebrow = "Ready When You Are",
  title = "Let's start your treatment journey.",
  subtitle,
  primaryLabel = "New Patient Form",
  primaryTo = "/patient-forms",
  secondaryLabel = "Call 256-234-6353",
  secondaryHref = "tel:2562346353",
}) {
  return (
    <div className="bg-ink rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" preserveAspectRatio="none" viewBox="0 0 800 200">
        <path d="M0 100 Q50 30 100 100 T200 100 T300 100 T400 100 T500 100 T600 100 T700 100 T800 100" stroke="white" strokeWidth="2" fill="none" />
      </svg>
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-breath mb-3">{eyebrow}</p>
        <h2 className="font-display text-2xl md:text-3xl text-white mb-3 max-w-xl mx-auto">{title}</h2>
        {subtitle && <p className="text-white/60 max-w-lg mx-auto mb-8">{subtitle}</p>}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to={primaryTo} variant="primary" size="lg">{primaryLabel}</Button>
          <Button href={secondaryHref} variant="outlineLight" size="lg">{secondaryLabel}</Button>
        </div>
      </div>
    </div>
  );
}
