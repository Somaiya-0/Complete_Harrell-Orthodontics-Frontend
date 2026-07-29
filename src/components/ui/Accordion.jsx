import React, { useState } from "react";

/** Simple single/multi-open accordion for FAQ-style and symptom/treatment
 * lists (e.g. TMJ Symptoms, Diagnosis, Treatment Options). */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-ink/10 border border-ink/10 rounded-2xl bg-white overflow-hidden">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="w-full flex items-center justify-between text-left px-6 py-4 hover:bg-breathlight/30 transition-colors"
            >
              <span className="font-medium text-ink text-sm">{item.title}</span>
              <span className={`text-breath transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
            </button>
            {open && (
              <div className="px-6 pb-5 text-sm text-ink/65 leading-relaxed animate-[fadeIn_0.25s_ease]">
                {item.body}
              </div>
            )}
          </div>
        );
      })}
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
