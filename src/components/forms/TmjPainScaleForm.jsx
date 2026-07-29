import React, { useState } from "react";
import { submitClinicalForm } from "./submitClinicalForm.js";

// Real content, transcribed from the practice's scanned TMJ Pain Scale
// form (frontend/public/forms-reference/tmj-pain-scale.png).
export default function TmjPainScaleForm() {
  const [form, setForm] = useState({
    name: "", date: "", note: "",
    maxOpen: "", rightLat: "", leftLat: "", protrusion: "",
    noises: [], painLevel: 0,
  });
  const [status, setStatus] = useState("idle");

  function toggleNoise(n) {
    setForm((f) => ({
      ...f,
      noises: f.noises.includes(n) ? f.noises.filter((x) => x !== n) : [...f.noises, n],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitClinicalForm("tmj_pain_scale", {
        patient_name: form.name,
        answers: form,
        computed_score: `TMJ Pain Scale: ${form.painLevel}/10`,
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
        <p className="text-sm text-ink/70">Pain level recorded: {form.painLevel}/10</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white border border-ink/10 rounded-2xl p-6">
      <h3 className="font-display text-lg text-ink">TMJ Pain Scale</h3>

      <div className="grid sm:grid-cols-3 gap-3">
        <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <Field label="Date" placeholder="MM/DD/YYYY" value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} />
        <Field label="Note" value={form.note} onChange={(v) => setForm((f) => ({ ...f, note: v }))} />
      </div>

      <div>
        <p className="text-sm font-medium text-ink/80 mb-2">Range of Motion (ROM)</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="Max Open (mm)" value={form.maxOpen} onChange={(v) => setForm((f) => ({ ...f, maxOpen: v }))} />
          <Field label="Right Lat (mm)" value={form.rightLat} onChange={(v) => setForm((f) => ({ ...f, rightLat: v }))} />
          <Field label="Left Lat (mm)" value={form.leftLat} onChange={(v) => setForm((f) => ({ ...f, leftLat: v }))} />
          <Field label="Protrusion (mm)" value={form.protrusion} onChange={(v) => setForm((f) => ({ ...f, protrusion: v }))} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink/80 mb-2">Noises</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {["Click", "Pop", "Crepitus", "Other"].map((n) => (
            <label key={n} className="flex items-center gap-1">
              <input type="checkbox" checked={form.noises.includes(n)} onChange={() => toggleNoise(n)} /> {n}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink/80 mb-2">0-10 Numeric Pain Rating Scale</p>
        <input
          type="range" min={0} max={10} value={form.painLevel}
          onChange={(e) => setForm((f) => ({ ...f, painLevel: Number(e.target.value) }))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-ink/50 mt-1">
          <span>0 &middot; No Pain</span>
          <span className="font-display text-base text-ink">{form.painLevel}</span>
          <span>10 &middot; Worst Pain</span>
        </div>
      </div>

      {status === "error" && <p className="text-sm text-red-500">Something went wrong submitting. Please call our office.</p>}

      <button type="submit" disabled={status === "submitting"} className="bg-breath text-white rounded-full px-6 py-3 font-medium disabled:opacity-60">
        {status === "submitting" ? "Submitting\u2026" : "Submit"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink/70">{label}</span>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm" />
    </label>
  );
}
