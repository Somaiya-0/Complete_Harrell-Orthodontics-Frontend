import React from "react";

export default function Eyebrow({ children, dark = false }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 ${dark ? "text-breath" : "text-breath"}`}>
      {children}
    </p>
  );
}
