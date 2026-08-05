
// import React from "react";
// import { useApiResource } from "../api/useApiResource.js";
// import { api } from "../api/client.js";
// import DataTable from "./components/DataTable.jsx";

// export default function ManageReferrals() {
//   const { items, loading, update, setItems } = useApiResource(
//     "/referrals/submissions/",
//     []
//   );

//   async function handleDelete(id) {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this referral?"
//     );

//     if (!confirmed) return;

//     try {
//       await api.delete(`/referrals/submissions/${id}/`);

//       // remove deleted item from UI without refreshing
//       if (setItems) {
//         setItems((prev) => prev.filter((item) => item.id !== id));
//       } else {
//         window.location.reload();
//       }

//     } catch (error) {
//       console.error("Failed to delete referral:", error);
//       alert("Could not delete referral.");
//     }
//   }


//   return (
//     <div className="p-8">
//       <h1 className="text-2xl text-ink mb-2">
//         Provider Referrals
//       </h1>

//       <p className="text-sm text-ink/50 mb-6">
//         Referrals submitted by external doctors and healthcare providers.
//       </p>


//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <DataTable
//           columns={[
//             {
//               key: "patient_name",
//               label: "Patient",
//             },

//             {
//               key: "referral_type",
//               label: "Type",
//             },

//             {
//               key: "submitted_by",
//               label: "Provider",
//               render: (r) => (
//                 r.submitted_by_name || 
//                 r.submitted_by?.username ||
//                 "Unknown"
//               ),
//             },

//             {
//               key: "submitted_at",
//               label: "Date",
//               render: (r) =>
//                 new Date(r.submitted_at)
//                   .toLocaleDateString(),
//             },


//             {
//               key: "office_reviewed",
//               label: "Status",
//               render: (r) => (
//                 <button
//                   onClick={() =>
//                     update(
//                       r.id,
//                       {
//                         office_reviewed:
//                           !r.office_reviewed,
//                       }
//                     )
//                   }
//                   className={
//                     r.office_reviewed
//                       ? "text-gray-400"
//                       : "text-green-600"
//                   }
//                 >
//                   {
//                     r.office_reviewed
//                       ? "Reviewed"
//                       : "Mark reviewed"
//                   }
//                 </button>
//               ),
//             },


//             {
//               key: "action",
//               label: "Action",
//               render: (r) => (
//                 <button
//                   onClick={() => handleDelete(r.id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   Delete
//                 </button>
//               ),
//             },

//           ]}

//           rows={items}
//         />
//       )}
//     </div>
//   );
// }






import React, { useState } from "react";
import { useApiResource } from "../api/useApiResource.js";
import { api } from "../api/client.js";
import DataTable from "./components/DataTable.jsx";

export default function ManageReferrals() {
  const { items, loading, update, setItems } = useApiResource(
    "/referrals/submissions/",
    []
  );
  const [expandedNotes, setExpandedNotes] = useState(null);

  async function handleDelete(row) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this referral?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/referrals/submissions/${row.id}/`);
      if (setItems) {
        setItems((prev) => prev.filter((item) => item.id !== row.id));
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to delete referral:", error);
      alert("Could not delete referral.");
    }
  }

  const columns = [
    {
      key: "patient_name",
      label: "Patient",
    },
    // {
    //   key: "patient_dob",
    //   label: "DOB",
    //   render: function (r) {
    //     return r.patient_dob
    //       ? new Date(r.patient_dob).toLocaleDateString()
    //       : "N/A";
    //   },
    // },
    {
      key: "referral_type",
      label: "Type",
    },
    {
      key: "notes",
      label: "Notes",
      render: function (r) {
        if (!r.notes) {
          return <span className="text-ink/30">N/A</span>;
        }
        return (
          <button
            onClick={function () {
              setExpandedNotes(r.id);
            }}
            className="text-left text-ink/80 hover:underline max-w-[220px] truncate block"
            title={r.notes}
          >
            {r.notes}
          </button>
        );
      },
    },
    {
      key: "attachment",
      label: "Attachment",
      render: function (r) {
        if (!r.attachment) {
          return <span className="text-ink/30">N/A</span>;
        }
        return (
          <a
            href={r.attachment}
            target="_blank"
            rel="noreferrer"
            className="text-breath hover:underline"
          >
            View file
          </a>
        );
      },
    },
    {
      key: "submitted_by",
      label: "Provider",
      render: function (r) {
        return r.submitted_by_name || (r.submitted_by && r.submitted_by.username) || "Unknown";
      },
    },
    {
      key: "submitted_at",
      label: "Date",
      render: function (r) {
        return new Date(r.submitted_at).toLocaleDateString();
      },
    },
    {
      key: "office_reviewed",
      label: "Status",
      render: function (r) {
        return (
          <button
            onClick={function () {
              update(r.id, { office_reviewed: !r.office_reviewed });
            }}
            className={r.office_reviewed ? "text-gray-400" : "text-green-600"}
          >
            {r.office_reviewed ? "Reviewed" : "Mark reviewed"}
          </button>
        );
      },
    },
  ];

  const activeNote = expandedNotes
    ? items.find(function (i) {
        return i.id === expandedNotes;
      })
    : null;

  return (
    <div className="p-8">
      <h1 className="text-2xl text-ink mb-2">Provider Referrals</h1>

      <p className="text-sm text-ink/50 mb-6">
        Referrals submitted by external doctors and healthcare providers.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable columns={columns} rows={items} onDelete={handleDelete} />

          {activeNote && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
              onClick={function () {
                setExpandedNotes(null);
              }}
            >
              <div
                className="bg-white rounded-xl p-6 max-w-lg w-full"
                onClick={function (e) {
                  e.stopPropagation();
                }}
              >
                <h3 className="font-medium text-ink mb-2">Notes</h3>
                <p className="text-sm text-ink/80 whitespace-pre-wrap">
                  {activeNote.notes}
                </p>
                <button
                  onClick={function () {
                    setExpandedNotes(null);
                  }}
                  className="mt-4 text-sm text-ink/50 hover:text-ink"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}