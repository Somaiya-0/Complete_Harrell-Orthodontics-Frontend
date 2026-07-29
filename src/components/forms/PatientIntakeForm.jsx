import React, { useState } from "react";
import { api, mmddyyyyToISO, isValidMMDDYYYY } from "../../api/client.js";
import DateInput from "./DateInput.jsx";

const REASONS = [
  { value: "orthodontic", label: "Orthodontic / Braces evaluation" },
  { value: "tmj", label: "TMJ / Jaw pain" },
  { value: "sleep_airway", label: "Sleep / Airway / Snoring" },
  { value: "second_opinion", label: "Second opinion" },
  { value: "other", label: "Other" },
];

const initial = {
  first_name: "", last_name: "", dob: "", email: "", phone: "",
  reason_for_visit: "orthodontic", referred_by: "", notes: "",
};

export default function PatientIntakeForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.first_name) e.first_name = "Required";
    if (!form.last_name) e.last_name = "Required";
    if (!isValidMMDDYYYY(form.dob)) e.dob = "Enter a valid date as MM/DD/YYYY";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await api.post("/patients/submit/", {
        first_name: form.first_name,
        last_name: form.last_name,
        date_of_birth: mmddyyyyToISO(form.dob),
        email: form.email,
        phone: form.phone,
        reason_for_visit: form.reason_for_visit,
        referred_by: form.referred_by,
        notes: form.notes,
      });
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-breathlight border border-breath/30 rounded-xl p-6 text-ink">
        <p className="font-display text-lg mb-1">Form received.</p>
        <p className="text-sm text-ink/70">Our office will reach out to schedule your visit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white border border-ink/10 rounded-2xl p-6 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="First name" value={form.first_name} onChange={(v) => set("first_name", v)} error={errors.first_name} />
        <Field label="Last name" value={form.last_name} onChange={(v) => set("last_name", v)} error={errors.last_name} />
      </div>
      <DateInput label="Date of birth" value={form.dob} onChange={(v) => set("dob", v)} error={errors.dob} required />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} />
        <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
      </div>
      <label className="block">
        <span className="text-sm font-medium text-ink/80">Reason for visit</span>
        <select
          value={form.reason_for_visit}
          onChange={(e) => set("reason_for_visit", e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2"
        >
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </label>
      <Field label="Referred by (optional)" value={form.referred_by} onChange={(v) => set("referred_by", v)} />
      <label className="block">
        <span className="text-sm font-medium text-ink/80">Notes (optional)</span>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2"
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong submitting the form. Please call our office at 256-234-6353.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-breath text-white rounded-full px-6 py-3 font-medium hover:bg-breath/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit form"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, error, type = "text" }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-lg border px-3 py-2 ${error ? "border-red-400" : "border-ink/20"} focus:border-breath`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}
