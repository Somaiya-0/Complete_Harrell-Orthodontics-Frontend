import React, { useState } from "react";
import { submitClinicalForm } from "./submitClinicalForm.js";

// Real content, transcribed from the practice's own scanned Epworth
// Sleepiness Scale form (frontend/public/forms-reference/epworth-sleepiness-scale.png).
const SITUATIONS = [
  "Sitting and reading",
  "Watching TV",
  "Sitting inactive in a public place (e.g. a theater or a meeting)",
  "As a passenger in a car for an hour without a break",
  "Lying down to rest in the afternoon when circumstances permit",
  "Sitting and talking to someone",
  "Sitting quietly after a lunch without alcohol",
  "In a car, while stopped for a few minutes in traffic",
];

export default function EpworthForm() {
  const [name, setName] = useState("");
  const [scores, setScores] = useState(Array(SITUATIONS.length).fill(null));
  const [status, setStatus] = useState("idle");

  const total = scores.reduce((sum, s) => sum + (s ?? 0), 0);
  const allAnswered = scores.every((s) => s !== null);

  function guidance(t) {
    if (t <= 5) return "Congratulations, you are getting enough sleep!";
    if (t <= 7) return "Your score is average.";
    return "We suggest you seek the advice of a sleep specialist.";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitClinicalForm("epworth", {
        patient_name: name,
        answers: SITUATIONS.reduce((acc, s, i) => ({ ...acc, [s]: scores[i] }), {}),
        computed_score: `Epworth: ${total}/24 \u2014 ${guidance(total)}`,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-breathlight border border-breath/30 rounded-xl p-6">
        <p className="font-display text-lg text-ink mb-1">Submitted.</p>
        <p className="text-sm text-ink/70">Your score: {total}/24 \u2014 {guidance(total)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white border border-ink/10 rounded-2xl p-6">
      <div>
        <h3 className="font-display text-lg text-ink mb-1">The Epworth Sleepiness Scale</h3>
        <p className="text-sm text-ink/60">
          How likely are you to doze off or fall asleep in the following situations, in contrast to feeling
          just tired? This refers to your usual way of life in recent times. Even if you haven't done some
          of these things recently, try to work out how they would have affected you.
        </p>
        <p className="text-xs text-ink/50 mt-2">0 = no chance &nbsp; 1 = slight chance &nbsp; 2 = moderate chance &nbsp; 3 = high chance of dozing</p>
      </div>

      <label className="block max-w-xs">
        <span className="text-sm font-medium text-ink/80">Name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
      </label>

      <div className="divide-y divide-ink/10">
        {SITUATIONS.map((s, i) => (
          <div key={s} className="py-3">
            <p className="text-sm text-ink/80 mb-2">{s}</p>
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((v) => (
                <label key={v} className="flex items-center gap-1 text-sm text-ink/70">
                  <input
                    type="radio"
                    name={`situation-${i}`}
                    checked={scores[i] === v}
                    onChange={() => setScores((prev) => prev.map((val, idx) => (idx === i ? v : val)))}
                  />
                  {v}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-breathlight rounded-lg px-4 py-3">
        <span className="text-sm text-ink/70">Running total</span>
        <span className="font-display text-xl text-ink">{total}/24</span>
      </div>

      {status === "error" && <p className="text-sm text-red-500">Something went wrong submitting. Please call our office.</p>}

      <button
        type="submit"
        disabled={!allAnswered || status === "submitting"}
        className="bg-breath text-white rounded-full px-6 py-3 font-medium disabled:opacity-40"
      >
        {status === "submitting" ? "Submitting\u2026" : "Submit"}
      </button>
    </form>
  );
}
