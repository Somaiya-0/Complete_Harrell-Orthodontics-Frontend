import React, { useState } from "react";
import { submitClinicalForm } from "./submitClinicalForm.js";

// Exact wording transcribed from the practice's scanned CPAP Intolerance
// Affidavit (frontend/public/forms-reference/cpap-intolerance-affidavit.png).
const REASONS = [
  "Mask Leaks",
  "An Inability to get the mask to fit properly",
  "Discomfort caused by the straps and headgear",
  "Disturbed or interrupted sleep caused by the presence of the device",
  "Noise from the device disturbing sleep or bed partner's sleep",
  "CPAP restricted movements during sleep",
  "CPAP does not seem to be effective",
  "Pressure on the upper lip causes tooth related problems",
  "Latex allergy",
  "Claustrophobic associations",
  "An unconscious need to remove the CPAP apparatus at night",
];

export default function CpapIntoleranceForm() {
  const [name, setName] = useState("");
  const [reasons, setReasons] = useState([]);
  const [other, setOther] = useState("");
  const [status, setStatus] = useState("idle");

  function toggle(r) {
    setReasons((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitClinicalForm("cpap_intolerance", {
        patient_name: name,
        answers: { reasons, other },
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
        <p className="text-sm text-ink/70">Thank you \u2014 our office will follow up about Oral Appliance Therapy options.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white border border-ink/10 rounded-2xl p-6">
      <div>
        <h3 className="font-display text-lg text-ink mb-1">Affidavit for Intolerance or Non-Compliance to CPAP</h3>
        <p className="text-sm text-ink/60 leading-relaxed">
          I have attempted to use CPAP (Continuous Positive Airway Pressure) to manage my sleep related
          breathing disorder (OSA \u2014 Obstructive Sleep Apnea) and find it intolerable to use on a regular
          basis for the following reason(s):
        </p>
      </div>

      <label className="block max-w-xs">
        <span className="text-sm font-medium text-ink/80">Name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
      </label>

      <div className="grid gap-2">
        {REASONS.map((r) => (
          <label key={r} className="flex items-center gap-2 text-sm text-ink/80">
            <input type="checkbox" checked={reasons.includes(r)} onChange={() => toggle(r)} /> {r}
          </label>
        ))}
        <label className="flex items-center gap-2 text-sm text-ink/80">
          <input type="checkbox" checked={reasons.includes("Other")} onChange={() => toggle("Other")} /> Other:
          <input value={other} onChange={(e) => setOther(e.target.value)} className="flex-1 rounded-lg border border-ink/20 px-2 py-1 text-sm" />
        </label>
      </div>

      <p className="text-xs text-ink/50 italic border-t border-ink/10 pt-4">
        Because of my intolerance / inability to use the CPAP, I wish to have my OSA treated by Oral Appliance
        Therapy utilizing a custom fitted Mandibular Advancement Device.
      </p>

      {status === "error" && <p className="text-sm text-red-500">Something went wrong submitting. Please call our office.</p>}

      <button type="submit" disabled={status === "submitting"} className="bg-breath text-white rounded-full px-6 py-3 font-medium disabled:opacity-60">
        {status === "submitting" ? "Submitting\u2026" : "Sign & Submit"}
      </button>
    </form>
  );
}
