// import React from "react";
// import { useApiResource } from "../api/useApiResource.js";
// import DataTable from "../staff/components/DataTable.jsx";

// export default function ManageReferrals() {
//   const { items, loading, update } = useApiResource(
//     "/referrals/submissions/",
//     []
//   );

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
//               key:"patient_name",
//               label:"Patient"
//             },

//             {
//               key:"referral_type",
//               label:"Type"
//             },

//             {
//               key:"submitted_by",
//               label:"Provider",
//               render:(r)=>(
//                 r.submitted_by_name || "Unknown"
//               )
//             },

//             {
//               key:"submitted_at",
//               label:"Date",
//               render:(r)=>
//                 new Date(r.submitted_at)
//                 .toLocaleDateString()
//             },

//             {
//               key:"office_reviewed",
//               label:"Status",
//               render:(r)=>(
//                 <button
//                   onClick={() =>
//                     update(
//                       r.id,
//                       {
//                         office_reviewed:
//                         !r.office_reviewed
//                       }
//                     )
//                   }
//                   className={
//                     r.office_reviewed
//                     ?
//                     "text-gray-400"
//                     :
//                     "text-green-600"
//                   }
//                 >
//                   {
//                     r.office_reviewed
//                     ?
//                     "Reviewed"
//                     :
//                     "Mark reviewed"
//                   }
//                 </button>
//               )
//             }
//           ]}

//           rows={items}
//         />
//       )}
//     </div>
//   );
// }



import React from "react";
import { useApiResource } from "../api/useApiResource.js";
import { api } from "../api/client.js";
import DataTable from "./components/DataTable.jsx";

export default function ManageReferrals() {
  const { items, loading, update, setItems } = useApiResource(
    "/referrals/submissions/",
    []
  );

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this referral?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/referrals/submissions/${id}/`);

      // remove deleted item from UI without refreshing
      if (setItems) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        window.location.reload();
      }

    } catch (error) {
      console.error("Failed to delete referral:", error);
      alert("Could not delete referral.");
    }
  }


  return (
    <div className="p-8">
      <h1 className="text-2xl text-ink mb-2">
        Provider Referrals
      </h1>

      <p className="text-sm text-ink/50 mb-6">
        Referrals submitted by external doctors and healthcare providers.
      </p>


      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={[
            {
              key: "patient_name",
              label: "Patient",
            },

            {
              key: "referral_type",
              label: "Type",
            },

            {
              key: "submitted_by",
              label: "Provider",
              render: (r) => (
                r.submitted_by_name || 
                r.submitted_by?.username ||
                "Unknown"
              ),
            },

            {
              key: "submitted_at",
              label: "Date",
              render: (r) =>
                new Date(r.submitted_at)
                  .toLocaleDateString(),
            },


            {
              key: "office_reviewed",
              label: "Status",
              render: (r) => (
                <button
                  onClick={() =>
                    update(
                      r.id,
                      {
                        office_reviewed:
                          !r.office_reviewed,
                      }
                    )
                  }
                  className={
                    r.office_reviewed
                      ? "text-gray-400"
                      : "text-green-600"
                  }
                >
                  {
                    r.office_reviewed
                      ? "Reviewed"
                      : "Mark reviewed"
                  }
                </button>
              ),
            },


            {
              key: "action",
              label: "Action",
              render: (r) => (
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
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