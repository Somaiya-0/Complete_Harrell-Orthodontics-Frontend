import React from "react";

/** Consistent page-content width/padding used everywhere instead of
 * ad-hoc "max-w-6xl mx-auto px-4" copies scattered across pages. */
export default function Container({ as: Tag = "div", className = "", children }) {
  return <Tag className={`max-w-7xl mx-auto px-6 lg:px-10 ${className}`}>{children}</Tag>;
}
