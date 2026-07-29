import React, { useState } from "react";
import { submitClinicalForm } from "./submitClinicalForm.js";

// Real content, transcribed from the practice's scanned STOP-BANG
// Questionnaire (frontend/public/forms-reference/stop-bang-questionnaire.png).
const QUESTIONS = [
  { key: "snore", label: "Do you Snore loudly (louder than talking or loud enough to be heard through closed doors)?" },
  { key: "tired", label: "Do you often feel Tired, fatigued, or sleepy during daytime?" },
  { key: "observed", label: "Has anyone Observed you stop breathing during your sleep?" },
  { key: "pressure", label: "Do you have, or are you being treated for, high blood Pressure?" },
  { key: "age", label: "Age over 50 years old?" },
  { key: "neck", label: "Neck circumference greater than 16 inches (female) or 17 inches (male)?" },
  { key: "gender", label: "Gender male?" },
];

export default function StopBangForm() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({});
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [status, setStatus] = useState("idle");

  const bmi = weight && height ? (703 * Number(weight)) / (Number(height) * Number(height)) : null;
  const bmiOver35 = bmi !== null && bmi > 35;

  const yesCount =
    QUESTIONS.filter((q) => answers[q.key] === true).length + (bmiOver35 ? 1 : 0);
  const answeredCore = QUESTIONS.every((q) => typeof answers[q.key] === "boolean");
  const risk = yesCount >= 3 ? "High Risk for OSA" : "Low Risk for OSA";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitClinicalForm("stop_bang", {
        patient_name: name,
        answers: { ...answers, bmi_over_35: bmiOver35, weight_lbs: weight, height_in: height },
        computed_score: `STOP-BANG: ${yesCount}/8 \u2014 ${risk}`,
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
        <p className="text-sm text-ink/70">Your score: {yesCount}/8 \u2014 {risk}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white border border-ink/10 rounded-2xl p-6">
      <div>
        <h3 className="font-display text-lg text-ink mb-1">STOP-BANG Questionnaire</h3>
        <p className="text-sm text-ink/60">Answering "yes" to three or more of the 8 questions indicates you are at high risk for OSA.</p>
      </div>

      <label className="block max-w-xs">
        <span className="text-sm font-medium text-ink/80">Name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
      </label>

      <div className="divide-y divide-ink/10">
        {QUESTIONS.map((q) => (
          <YesNoRow key={q.key} label={q.label} value={answers[q.key]} onChange={(v) => setAnswers((a) => ({ ...a, [q.key]: v }))} />
        ))}

        <div className="py-3">
          <p className="text-sm text-ink/80 mb-2">Body Mass Index (BMI) more than 35?</p>
          <div className="flex gap-3">
            <input type="number" placeholder="Weight (lbs)" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-36 rounded-lg border border-ink/20 px-3 py-2 text-sm" />
            <input type="number" placeholder="Height (in)" value={height} onChange={(e) => setHeight(e.target.value)} className="w-36 rounded-lg border border-ink/20 px-3 py-2 text-sm" />
          </div>
          {bmi !== null && <p className="text-xs text-ink/50 mt-1">Calculated BMI: {bmi.toFixed(1)} {bmiOver35 ? "(> 35 \u2014 counts as yes)" : ""}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between bg-breathlight rounded-lg px-4 py-3">
        <span className="text-sm text-ink/70">Score</span>
        <span className="font-display text-xl text-ink">{yesCount}/8 \u2014 {risk}</span>
      </div>

      {status === "error" && <p className="text-sm text-red-500">Something went wrong submitting. Please call our office.</p>}

      <button
        type="submit"
        disabled={!answeredCore || status === "submitting"}
        className="bg-breath text-white rounded-full px-6 py-3 font-medium disabled:opacity-40"
      >
        {status === "submitting" ? "Submitting\u2026" : "Submit"}
      </button>
    </form>
  );
}

function YesNoRow({ label, value, onChange }) {
  return (
    <div className="py-3 flex items-center justify-between gap-4">
      <p className="text-sm text-ink/80 flex-1">{label}</p>
      <div className="flex gap-3 text-sm">
        <label className="flex items-center gap-1"><input type="radio" checked={value === true} onChange={() => onChange(true)} /> Yes</label>
        <label className="flex items-center gap-1"><input type="radio" checked={value === false} onChange={() => onChange(false)} /> No</label>
      </div>
    </div>
  );
}
