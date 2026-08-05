import React from "react";
import { api } from "../../api/client.js";
import { useApiResource } from "../../api/useApiResource.js";
import { mockIntakeSubmissions } from "../../mockData.js";
import DataTable from "../components/DataTable.jsx";

const REASON_LABELS = {
  orthodontic: "Orthodontic",
  tmj: "TMJ",
  sleep_airway: "Sleep/Airway",
  second_opinion: "Second opinion",
  other: "Other",
};

export default function IntakeForms() {
  const { items, loading, update, setItems } = useApiResource("/patients/submissions/", mockIntakeSubmissions);

  async function handleDelete(row) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this intake form submission?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/patients/submissions/${row.id}/`);
      if (setItems) {
        setItems(function (prev) {
          return prev.filter(function (item) {
            return item.id !== row.id;
          });
        });
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to delete intake form:", error);
      alert("Could not delete intake form.");
    }
  }

  const columns = [
    {
      key: "name",
      label: "Name",
      render: function (r) {
        return r.first_name + " " + r.last_name;
      },
    },
    {
      key: "date_of_birth",
      label: "DOB",
      render: function (r) {
        return r.date_of_birth
          ? new Date(r.date_of_birth + "T00:00:00").toLocaleDateString("en-US")
          : "";
      },
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "reason_for_visit",
      label: "Reason",
      render: function (r) {
        return REASON_LABELS[r.reason_for_visit] || r.reason_for_visit;
      },
    },
    {
      key: "referred_by",
      label: "Referred By",
      render: function (r) {
        return r.referred_by ? r.referred_by : <span className="text-ink/30">N/A</span>;
      },
    },
    {
      key: "submitted_at",
      label: "Submitted",
      render: function (r) {
        return new Date(r.submitted_at).toLocaleDateString();
      },
    },
    {
      key: "office_reviewed",
      label: "Reviewed",
      render: function (r) {
        return (
          <button
            onClick={function () {
              update(r.id, { office_reviewed: !r.office_reviewed });
            }}
            className={r.office_reviewed ? "text-ink/40" : "text-breath font-medium"}
          >
            {r.office_reviewed ? "Reviewed" : "Mark reviewed"}
          </button>
        );
      },
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl text-ink mb-1">New Patient Intake Forms</h1>
      <p className="text-ink/50 text-sm mb-6">Submissions from the public "New Patient Online Form."</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} rows={items} onDelete={handleDelete} />
      )}
    </div>
  );
}