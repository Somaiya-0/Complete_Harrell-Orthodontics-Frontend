import React, { useState } from "react";
import { submitClinicalForm } from "./submitClinicalForm.js";

// Real checklist transcribed from the scanned "Common Signs & Symptoms of
// Sleep Disordered Breathing" chart (credited to Audrey Yoon, DDS, MS on
// the original). frontend/public/forms-reference/common-signs-symptoms-yoon.png
const SIGNS = [
  "Teeth Grinding", "Mouth Breathing", "Tongue-tie", "Eye Shiners / Dark Circles",
  "Learning Difficulties", "Snoring", "ADD / ADHD", "Bed Wetting", "Allergies",
  "Asthma", "Delayed Speech", "Night Sweats", "Aggression / Defiance / Bullying",
  "Receding Chin", "Chronic Fatigue", "Restless Sleep", "Nightmares",
  "Anxiety Attacks", "Crooked Bite / Crowded Teeth", "Swollen Tonsils", "Stunted Growth",
];

export default function CommonSignsSymptomsForm() {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState([]);
  const [status, setStatus] = useState("idle");

  function toggle(s) {
    setChecked((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitClinicalForm("cgasp", {
        patient_name: name,
        answers: { checklist: "common_signs_symptoms", checked },
        computed_score: `${checked.length} of ${SIGNS.length} signs checked`,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-breathlight border border-breath/30 rounded-2xl p-6">
        <p className="font-display text-lg text-ink mb-1">Submitted.</p>
        <p className="text-sm text-ink/70">Thank you \u2014 our office will review these with you at your visit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white border border-ink/10 rounded-2xl p-6">
      <div>
        <h3 className="font-display text-lg text-ink mb-1">Common Signs &amp; Symptoms of Sleep Disordered Breathing</h3>
        <p className="text-sm text-ink/60">Check all that apply to your child.</p>
      </div>

      <label className="block max-w-xs">
        <span className="text-sm font-medium text-ink/80">Child's name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
      </label>

      <div className="grid sm:grid-cols-3 gap-2">
        {SIGNS.map((s) => (
          <label
            key={s}
            className={`flex items-center gap-2 text-sm rounded-lg border px-3 py-2 cursor-pointer transition-colors ${
              checked.includes(s) ? "border-breath bg-breathlight text-ink" : "border-ink/15 text-ink/70 hover:border-ink/30"
            }`}
          >
            <input type="checkbox" checked={checked.includes(s)} onChange={() => toggle(s)} className="accent-breath" />
            {s}
          </label>
        ))}
      </div>

      {status === "error" && <p className="text-sm text-red-500">Something went wrong submitting. Please call our office.</p>}

      <button type="submit" disabled={status === "submitting"} className="bg-breath text-white rounded-full px-6 py-3 font-medium disabled:opacity-60">
        {status === "submitting" ? "Submitting\u2026" : "Submit"}
      </button>
    </form>
  );
}
