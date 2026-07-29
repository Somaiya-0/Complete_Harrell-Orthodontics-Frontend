import React from "react";
import { useApiResource } from "../../api/useApiResource.js";
import { mockReferralSubmissions } from "../../mockData.js";
import DataTable from "../components/DataTable.jsx";

const REFERRAL_TYPE_LABELS = {
  ortho_airway_child: "Ortho / Dento-facial / Airway (child)",
  tmj: "TMJ",
  osa_airway_adult: "OSA / Airway (adult)",
  myofunctional: "Myofunctional therapy",
  other: "Other",
};

export default function ReferralsAdmin() {
  const { items, loading, update } = useApiResource("/referrals/submissions/", mockReferralSubmissions);

  return (
    <div className="p-8">
      <h1 className="text-2xl text-ink mb-1">Referrals</h1>
      <p className="text-ink/50 text-sm mb-6">Submissions from referring providers.</p>

      {loading ? <p>Loading…</p> : (
        <DataTable
          columns={[
            { key: "patient_name", label: "Patient" },
            { key: "referral_type", label: "Type", render: (r) => REFERRAL_TYPE_LABELS[r.referral_type] || r.referral_type },
            { key: "submitted_by_name", label: "From" },
            { key: "submitted_at", label: "Submitted", render: (r) => new Date(r.submitted_at).toLocaleDateString() },
            {
              key: "attachment", label: "Attachment",
              render: (r) => r.attachment ? <a className="text-breath underline" href={r.attachment} target="_blank" rel="noreferrer">View</a> : "—",
            },
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