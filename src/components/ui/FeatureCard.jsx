import React from "react";
import Card from "./Card.jsx";

/** Icon + title + description card -- used for "Technology", "Why Choose
 * Us", and similar benefit/feature grids. */
export default function FeatureCard({ icon, title, children }) {
  return (
    <Card className="p-6">
      {icon && (
        <div className="w-11 h-11 rounded-xl bg-breathlight text-breath flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-display text-lg text-ink mb-2">{title}</h3>
      <p className="text-[13px] text-ink/60 leading-relaxed">{children}</p>
    </Card>
  );
}
