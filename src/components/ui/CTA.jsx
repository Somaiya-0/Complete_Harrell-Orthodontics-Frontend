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
      {/* Text made larger and higher-contrast per client review 8-10-2026
          (#12: "heading in Yellow, wording in white and the subscript
          highlighted in blue... make these easier to read. Do this on all
          the ones like this") -- this component is reused across every
          content page's closing CTA. */}
      <div className="relative">
        <p className="inline-block text-xs font-bold uppercase tracking-[0.14em] text-blue-100 bg-blue-500/25 border border-blue-400/40 rounded-full px-3 py-1 mb-4">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4 max-w-xl mx-auto">{title}</h2>
        {subtitle && <p className="text-yellow-300 text-base max-w-lg mx-auto mb-8">{subtitle}</p>}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to={primaryTo} variant="primary" size="lg">{primaryLabel}</Button>
          <Button href={secondaryHref} variant="outlineLight" size="lg">{secondaryLabel}</Button>
        </div>
      </div>
    </div>
  ); 
}
