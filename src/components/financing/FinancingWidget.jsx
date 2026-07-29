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

  const primary = options.find((o) => o.is_primary) || options[0];
  const rest = options.filter((o) => o !== primary);

  return (
    <div className="grid gap-6">
      {primary && (
        <div className="rounded-3xl border-2 border-breath bg-breathlight p-10 text-center relative overflow-hidden">
          <svg className="absolute -left-8 -top-8 w-40 h-40 opacity-10" viewBox="0 0 100 100">
            <path d="M0 50 Q12 15 25 50 T50 50 T75 50 T100 50" stroke="#2F7A78" strokeWidth="2" fill="none" />
          </svg>
          <p className="text-xs uppercase tracking-widest text-breath font-semibold mb-2 relative">
            Our Primary Financing Partner
          </p>
          <h3 className="font-display text-4xl text-ink mb-2 relative">{primary.display_name}</h3>
          {primary.tagline && <p className="text-ink/70 mb-8 relative">{primary.tagline}</p>}
          <Button href={primary.learn_more_url || primary.widget_script_url || "#"} variant="dark" size="lg" className="relative">
            Learn More
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
