import React from "react";
import { useApiResource } from "../../api/useApiResource.js";
import DataTable from "../components/DataTable.jsx";

export default function ManageReviews() {
  const { items, loading, update, remove } = useApiResource("/reviews/manage/", []);

  return (
    <div className="p-8">
      <h1 className="text-2xl text-ink mb-1">Reviews</h1>
      <p className="text-ink/50 text-sm mb-6">Approve reviews before they appear publicly. Fix spelling by editing here first (edit support coming; delete + re-add for now).</p>

      {loading ? <p>Loading…</p> : (
        <DataTable
          columns={[
            { key: "author_name", label: "Name" },
            { key: "rating", label: "Rating", render: (r) => "\u2605".repeat(r.rating) },
            { key: "body", label: "Review", render: (r) => <span className="line-clamp-2 max-w-xs inline-block">{r.body}</span> },
            {
              key: "is_approved", label: "Status",
              render: (r) => (
                <button
                  onClick={() => update(r.id, { is_approved: !r.is_approved })}
                  className={r.is_approved ? "text-ink/40" : "text-breath font-medium"}
                >
                  {r.is_approved ? "Approved" : "Approve"}
                </button>
              ),
            },
          ]}
          rows={items}
          onDelete={(row) => remove(row.id)}
        />
      )}
    </div>
  );
}
