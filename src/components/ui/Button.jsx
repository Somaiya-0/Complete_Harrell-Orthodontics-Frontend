import React from "react";
import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-breath text-white hover:bg-breath/90",
  dark: "bg-ink text-white hover:bg-ink/90",
  outline: "border border-ink/20 text-ink/80 hover:border-ink/40 hover:text-ink",
  outlineLight: "border border-white/25 text-white hover:bg-white/5",
  ghost: "text-breath hover:text-breath/80",
};

const SIZES = {
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
  sm: "px-4 py-2 text-xs",
};

/** Single source of truth for every button/CTA style in the app. Renders
 * a <Link> when `to` is given, an <a> when `href` is given, else a
 * <button>. Stops the copy-pasted "bg-breath text-white px-6 py-3
 * rounded-full font-semibold hover:bg-breath/90" from drifting out of
 * sync across a dozen files. */
export default function Button({ to, href, variant = "primary", size = "md", className = "", children, ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors duration-200 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button className={cls} {...props}>{children}</button>;
}
