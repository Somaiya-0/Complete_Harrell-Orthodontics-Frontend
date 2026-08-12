import React from "react";
import Eyebrow from "./Eyebrow.jsx";

/** Eyebrow + title + optional subtitle, reused across every page instead
 * of duplicating the same three lines of markup everywhere. */
export default function SectionHeader({ eyebrow, title, subtitle, align = "left", dark = false, className = "" }) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      {/* Dark-background heading/wording contrast improved per client
          review 8-10-2026 (#12: heading in yellow, wording in white,
          subscript highlighted in blue -- see Eyebrow.jsx for the
          subscript). */}
      <h2 className={`font-display text-3xl md:text-4xl mb-3 ${dark ? "text-yellow-300" : "text-ink"}`}>{title}</h2>
      {subtitle && <p className={`${dark ? "text-white" : "text-ink/60"} leading-relaxed`}>{subtitle}</p>}
    </div>
  );
}
