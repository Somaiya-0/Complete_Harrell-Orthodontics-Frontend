import React from "react";
import { useApiResource } from "../../api/useApiResource.js";
import DataTable from "../components/DataTable.jsx";

const LABELS = {
  epworth: "Epworth Sleepiness Scale", stop_bang: "STOP-BANG", tmj_pain_scale: "TMJ Pain Scale",
  cgasp: "C-GASP Screener", cpap_intolerance: "CPAP Intolerance Affidavit", referral: "Referral Form",
};

export default function ManageClinicalForms() {
  const { items, loading, update } = useApiResource("/clinical-forms/submissions/", []);

  return (
    <div className="p-8">
      <h1 className="text-2xl text-ink mb-1">Clinical Form Submissions</h1>
      <p className="text-ink/50 text-sm mb-6">Epworth, STOP-BANG, TMJ Pain Scale, and CPAP Intolerance forms submitted from the public site.</p>

      {loading ? <p>Loading…</p> : (
        <DataTable
          columns={[
            { key: "form_type", label: "Form", render: (r) => LABELS[r.form_type] || r.form_type },
            { key: "patient_name", label: "Patient" },
            { key: "computed_score", label: "Score" },
            { key: "submitted_at", label: "Submitted", render: (r) => new Date(r.submitted_at).toLocaleDateString() },
            {
              key: "office_reviewed", label: "Reviewed",
              render: (r) => (
                <button
                  onClick={() => update(r.id, { office_reviewed: !r.office_reviewed })}
                  className={r.office_reviewed ? "text-ink/40" : "text-breath font-medium"}
                >
                  {r.office_reviewed ? "Reviewed" : "Mark reviewed"}
                </button>
              ),
            },
          ]}
          rows={items}
        />
      )}
    </div>
  );
}
