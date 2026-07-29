import React from "react";
import { useApiResource } from "../../api/useApiResource.js";
import { mockIntakeSubmissions } from "../../mockData.js";
import DataTable from "../components/DataTable.jsx";

const REASON_LABELS = {
  orthodontic: "Orthodontic", tmj: "TMJ", sleep_airway: "Sleep/Airway",
  second_opinion: "Second opinion", other: "Other",
};

export default function IntakeForms() {
  const { items, loading, update } = useApiResource("/patients/submissions/", mockIntakeSubmissions);

  return (
    <div className="p-8">
      <h1 className="text-2xl text-ink mb-1">New Patient Intake Forms</h1>
      <p className="text-ink/50 text-sm mb-6">Submissions from the public "New Patient Online Form."</p>

      {loading ? <p>Loading…</p> : (
        <DataTable
          columns={[
            { key: "name", label: "Name", render: (r) => `${r.first_name} ${r.last_name}` },
            { key: "date_of_birth", label: "DOB", render: (r) => r.date_of_birth ? new Date(r.date_of_birth + "T00:00:00").toLocaleDateString("en-US") : "" },
            { key: "phone", label: "Phone" },
            { key: "reason_for_visit", label: "Reason", render: (r) => REASON_LABELS[r.reason_for_visit] || r.reason_for_visit },
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
