import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import { withFallback } from "../../api/withFallback.js";
import { mockFinancing } from "../../mockData.js";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";

export default function FinancingWidget() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    withFallback(
  () => api.get("/financing/options/"),
  mockFinancing
).then((data) => {
  setOptions(data.length ? data : mockFinancing);
});
  }, []);

  // Sunbit = first, big banner. Cherry = second, about half the size.
  // If the live API doesn't return Sunbit yet, fall back to the mock entry.
  const all = options.some((o) => o.kind === "sunbit")
    ? options
    : [...options, ...mockFinancing.filter((o) => o.kind === "sunbit")];
  const sunbit = all.find((o) => o.kind === "sunbit");
  const cherry = all.find((o) => o.kind === "cherry");
  const rest = all.filter((o) => o !== sunbit && o !== cherry);

  return (
    <div className="grid gap-6">
      {sunbit && (
        <div className="rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-700 p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-xl">
          <svg className="absolute -right-8 -bottom-8 w-52 h-52 opacity-15" viewBox="0 0 100 100">
            <path d="M0 50 Q12 15 25 50 T50 50 T75 50 T100 50" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <p className="text-xs uppercase tracking-widest text-white/80 font-semibold mb-3 relative">
            Our Primary Financing Partner
          </p>
          <h3 className="relative mb-5 flex justify-center">
            <span className="sr-only">{sunbit.display_name}</span>
            <span className="bg-white rounded-full px-8 py-4 sm:px-10 sm:py-5 shadow-md inline-flex">
              <img src="/images/Sunbit_logo.svg" alt="" className="h-14 sm:h-20 md:h-24 w-auto" />
            </span>
          </h3>
          {sunbit.tagline && <p className="text-white/90 text-lg mb-10 relative">{sunbit.tagline}</p>}
          <Button href={sunbit.learn_more_url || "#"} variant="light" size="lg" className="relative">
            Apply with Sunbit
          </Button>
        </div>
      )}

      {cherry && (
        <div className="rounded-3xl bg-gradient-to-br from-breath to-blue-700 p-5 sm:p-7 md:p-8 text-center relative overflow-hidden shadow-lg">
          <h3 className="font-display text-2xl sm:text-3xl text-white mb-1.5 relative break-words">{cherry.display_name}</h3>
          {cherry.tagline && <p className="text-white/90 text-sm mb-5 relative">{cherry.tagline}</p>}
          <Button href={cherry.learn_more_url || "#"} variant="light" className="relative">
            Apply with Cherry
          </Button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {rest.map((o) => (
          <Card key={o.id} interactive className="p-6 text-center">
            <p className="font-medium text-ink mb-1">{o.display_name}</p>
            {o.tagline && <p className="text-xs text-ink/60 mb-3">{o.tagline}</p>}
            {o.learn_more_url && (
              <a href={o.learn_more_url} target="_blank" rel="noreferrer" className="text-sm text-breath font-medium">
                Learn more &rarr;
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
