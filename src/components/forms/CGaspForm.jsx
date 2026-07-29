import React, { useState } from "react";
import { submitClinicalForm } from "./submitClinicalForm.js";

// Real content transcribed from the practice's scanned C-GASP Screener
// (Children's General Airway Screening Protocol, ages 2-12), co-developed
// by the Children's Airway Screening Taskforce (CAST) consortium.
// frontend/public/forms-reference/cgasp-screener.png
const QUESTIONS = [
  { key: "mouth_breathing", label: "Mouth Breathing or Lips Apart while awake or asleep?" },
  { key: "sleep_noises", label: "While sleeping or napping: snoring (even slightly), noisy breathing, difficulty breathing, pauses or gasping for breath during sleep?" },
  { key: "restless_sleep", label: "Neck extended upwards when sleeping, restless sleep, frequent awakenings at night, grinding or clenching teeth during sleep?" },
  { key: "morning_symptoms", label: "Upon waking: dry mouth, sore/achy jaws, headaches, stuffy nose, difficulty waking in the morning?" },
  { key: "daytime_symptoms", label: "Daytime sleepiness, tiredness, difficulty behavioral or emotional issues, difficulty paying attention, hyperactivity, or trouble at school?" },
];

const ANSWERS = ["Yes", "No", "IDK"];

export default function CGaspForm() {
  const [childName, setChildName] = useState("");
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("idle");

  const answeredAll = QUESTIONS.every((q) => answers[q.key]);
  const yesCount = Object.values(answers).filter((v) => v === "Yes").length;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitClinicalForm("cgasp", {
        patient_name: childName,
        answers,
        computed_score: `C-GASP: ${yesCount} of ${QUESTIONS.length} "Yes" responses`,
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
        <p className="text-sm text-ink/70">Thank you \u2014 our office will review your child's screening results.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white border border-ink/10 rounded-2xl p-6">
      <div>
        <h3 className="font-display text-lg text-ink mb-1">C-GASP Screener</h3>
        <p className="text-xs text-ink/50 mb-2">Children's General Airway Screening Protocol \u2014 for age 2 through 12 years old</p>
        <p className="text-sm text-ink/60">Does your child frequently have any of the following?</p>
      </div>

      <label className="block max-w-xs">
        <span className="text-sm font-medium text-ink/80">Child's name</span>
        <input value={childName} onChange={(e) => setChildName(e.target.value)} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
      </label>

      <div className="divide-y divide-ink/10">
        {QUESTIONS.map((q) => (
          <div key={q.key} className="py-3">
            <p className="text-sm text-ink/80 mb-2">{q.label}</p>
            <div className="flex gap-4">
              {ANSWERS.map((a) => (
                <label key={a} className="flex items-center gap-1 text-sm text-ink/70">
                  <input
                    type="radio"
                    name={q.key}
                    checked={answers[q.key] === a}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.key]: a }))}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {status === "error" && <p className="text-sm text-red-500">Something went wrong submitting. Please call our office.</p>}

      <button type="submit" disabled={!answeredAll || status === "submitting"} className="bg-breath text-white rounded-full px-6 py-3 font-medium disabled:opacity-40">
        {status === "submitting" ? "Submitting\u2026" : "Submit"}
      </button>
    </form>
  );
}
