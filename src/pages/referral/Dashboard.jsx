import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import { withFallback } from "../../api/withFallback.js";
import { useAuth } from "../../api/AuthContext.jsx";
import { mockProviders } from "../../mockData.js";

const REFERRAL_TYPES = [
  { value: "ortho_airway_child", label: "Ortho / Dento-facial / Airway (child)" },
  { value: "tmj", label: "TMJ" },
  { value: "osa_airway_adult", label: "OSA / Airway (adult)" },
  { value: "myofunctional", label: "Myofunctional therapy" },
  { value: "other", label: "Other" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [providers, setProviders] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({ referral_type: "ortho_airway_child", patient_name: "", notes: "" });
  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    withFallback(() => api.get("/referrals/providers/"), mockProviders).then(setProviders);
    api.get("/referrals/submissions/").then((res) => setSubmissions(res.data.results || res.data)).catch(() => setSubmissions([]));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      let res;
      if (attachment) {
        const body = new FormData();
        Object.entries(form).forEach(([k, v]) => body.append(k, v));
        body.append("attachment", attachment);
        res = await api.post("/referrals/submissions/", body, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        res = await api.post("/referrals/submissions/", form);
      }
      setSubmissions((s) => [res.data, ...s]);
      setForm({ referral_type: "ortho_airway_child", patient_name: "", notes: "" });
      setAttachment(null);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  const relatedForms = {
    ortho_airway_child: "Related digital forms: C-GASP Screener, Common Signs & Symptoms.",
    tmj: "Related digital forms: TMJ Pain Scale.",
    osa_airway_adult: "Related digital forms: Epworth Sleepiness Scale, STOP-BANG Questionnaire, CPAP Intolerance Affidavit, Physician Written Order for OAT.",
    myofunctional: "Related digital forms: none required \u2014 notes and images/attachments only.",
    other: "",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl text-ink">Referring Provider Portal</h1>
          <p className="text-ink/60 text-sm">Welcome, {user?.first_name || user?.username}</p>
        </div>
        <button onClick={logout} className="text-sm text-ink/50 hover:text-ink">Log out</button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg mb-3 text-ink">Send a referral</h2>
          <form onSubmit={handleSubmit} className="grid gap-3 bg-white border border-ink/10 rounded-2xl p-5">
            <select
              value={form.referral_type}
              onChange={(e) => setForm((f) => ({ ...f, referral_type: e.target.value }))}
              className="rounded-lg border border-ink/20 px-3 py-2"
            >
              {REFERRAL_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <input
              placeholder="Patient name"
              value={form.patient_name}
              onChange={(e) => setForm((f) => ({ ...f, patient_name: e.target.value }))}
              className="rounded-lg border border-ink/20 px-3 py-2"
            />
            {/* <input
              type="date"
              value={form.patient_dob || ""}
              onChange={(e) => setForm((f) => ({ ...f, patient_dob: e.target.value }))}
              className="rounded-lg border border-ink/20 px-3 py-2"
            /> */}
            <textarea
              placeholder="Notes"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="rounded-lg border border-ink/20 px-3 py-2"
            />
            {relatedForms[form.referral_type] && (
              <p className="text-xs text-ink/50">{relatedForms[form.referral_type]}</p>
            )}
            <label className="block">
              <span className="text-xs font-medium text-ink/70">Attach notes/images (JPG, DICOM, ZIP)</span>
              <input type="file" accept=".jpg,.jpeg,.png,.dcm,.zip" onChange={(e) => setAttachment(e.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
            </label>
            <button disabled={status === "submitting"} className="bg-breath text-white rounded-full px-5 py-2 font-medium">
              {status === "submitting" ? "Sending…" : "Send referral"}
            </button>
          </form>

          <h3 className="text-sm font-medium text-ink/70 mt-6 mb-2">Your recent referrals</h3>
          <ul className="space-y-2 text-sm">
            {submissions.map((s) => (
              <li key={s.id} className="border-b border-ink/10 pb-2">
                {s.patient_name} — {s.referral_type}
              </li>
            ))}
          </ul>
        </div>

        {/* <div>
          <h2 className="text-lg mb-3 text-ink">Provider directory</h2>
          <ul className="space-y-3">
            {providers.map((p) => (
              <li key={p.id} className="bg-white border border-ink/10 rounded-xl p-4">
                <p className="font-medium text-ink">{p.name}</p>
                <p className="text-xs text-ink/50">{p.specialty} {p.location && `· ${p.location}`}</p>
              </li>
            ))} 
          </ul>
        </div> */}
      </div>
    </div>
  );
}
