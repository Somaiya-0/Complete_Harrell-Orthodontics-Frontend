import React from "react";

export default function Badge({ children, tone = "breath" }) {
  const tones = {
    breath: "bg-breath/10 text-breath border-breath/30",
    ink: "bg-ink/5 text-ink/70 border-ink/15",
    clay: "bg-clay/10 text-clay border-clay/30",
  };
  return (
    <span className={`inline-block text-[11px] font-semibold uppercase tracking-[0.1em] border rounded-full px-3 py-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}
