import React from "react";

/** Consistent card shell: white surface, hairline border, soft shadow,
 * lift-on-hover. `interactive` adds the hover-lift; use for links/buttons,
 * omit for static info cards. */
export default function Card({ as: Tag = "div", interactive = false, className = "", children, ...props }) {
  return (
    <Tag
      className={`bg-white border border-ink/10 rounded-card shadow-soft ${
        interactive ? "transition-all duration-300 ease-smooth hover:shadow-card hover:-translate-y-1 hover:border-breath/30" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
