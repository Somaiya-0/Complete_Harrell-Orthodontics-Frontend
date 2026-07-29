
import React, { useEffect, useState } from "react";
import { useApiResource } from "../../api/useApiResource.js";
import { mockAppointments } from "../../mockData.js";
import Modal from "../components/Modal.jsx";
import DataTable from "../components/DataTable.jsx";
import { api } from "../../api/client.js";

const STATUSES = [
  "requested",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
];

const EMPTY = {
  patient: "",
  doctor: "",
  scheduled_at: "",
  reason: "",
  status: "requested",
  notes: "",
};

export default function ManageAppointments() {
  const { items, loading, create, update, remove } = useApiResource(
    "/appointments/",
    mockAppointments
  );

  const [editing, setEditing] = useState(null);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [error, setError] = useState("");

  // Load real backend data
  useEffect(() => {
    async function loadData() {
      try {
        const patientRes = await api.get("/patients/records/");
        const teamRes = await api.get("/team/");

        setPatients(patientRes.data.results || patientRes.data);

        setDoctors(
          (teamRes.data.results || teamRes.data).filter(
            (d) => d.is_doctor
          )
        );

      } catch (err) {
        console.error("Loading dropdown data failed", err);
      }
    }

    loadData();
  }, []);


  async function handleSave(e) {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...editing,
        patient: Number(editing.patient),
        doctor: Number(editing.doctor),
      };

      if (editing.id) {
        await update(editing.id, payload);
      } else {
        await create(payload);
      }

      setEditing(null);

    } catch (err) {

      console.log(err.response?.data);

      const message =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {})
          .flat()
          .join(" ") ||
        "Please complete all required fields correctly.";

      setError(message);
    }
  }


  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-ink">
            Appointments
          </h1>

          <p className="text-ink/50 text-sm">
            Schedule and track patient visits.
          </p>
        </div>

        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="bg-breath text-white rounded-full px-5 py-2 font-medium"
        >
          + New appointment
        </button>
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : (

        <DataTable

          columns={[
            {
              key: "scheduled_at",
              label: "When",
              render: (r)=>
                new Date(r.scheduled_at).toLocaleString()
            },

            {
              key:"patient_name",
              label:"Patient"
            },

            {
              key:"doctor_name",
              label:"Doctor"
            },

            {
              key:"reason",
              label:"Reason"
            },

            {
              key:"status",
              label:"Status",
              render:(r)=>
                <span className="capitalize">
                  {r.status.replace("_"," ")}
                </span>
            }

          ]}

          rows={items}

          onEdit={setEditing}

          onDelete={(row)=>remove(row.id)}

        />

      )}



      {editing && (

        <Modal
          title={editing.id ? "Edit appointment":"New appointment"}
          onClose={()=>setEditing(null)}
        >

          <form
            onSubmit={handleSave}
            className="grid gap-4"
          >


            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}



            <Select
              label="Patient"
              value={editing.patient}
              options={patients.map(p=>({
                id:p.id,
                name:`${p.first_name} ${p.last_name}`
              }))}
              onChange={(v)=>
                setEditing(f=>({...f,patient:v}))
              }
            />



            <Select
              label="Doctor"
              value={editing.doctor}
              options={doctors.map(d=>({
                id:d.id,
                name:d.name
              }))}
              onChange={(v)=>
                setEditing(f=>({...f,doctor:v}))
              }
            />



            <label>
              <span className="text-sm font-medium text-ink/80">
                Date & time
              </span>

              <input
                type="datetime-local"
                value={
                  editing.scheduled_at?.slice(0,16) || ""
                }

                onChange={(e)=>
                  setEditing(f=>({
                    ...f,
                    scheduled_at:e.target.value
                  }))
                }

                className="mt-1 w-full rounded-lg border px-3 py-2"
              />

            </label>



            <label>
              <span className="text-sm font-medium text-ink/80">
                Reason
              </span>

              <input
                value={editing.reason || ""}
                onChange={(e)=>
                  setEditing(f=>({
                    ...f,
                    reason:e.target.value
                  }))
                }

                className="mt-1 w-full rounded-lg border px-3 py-2"
              />

            </label>



            <label>
              <span className="text-sm font-medium text-ink/80">
                Status
              </span>

              <select
                value={editing.status}
                onChange={(e)=>
                  setEditing(f=>({
                    ...f,
                    status:e.target.value
                  }))
                }

                className="mt-1 w-full rounded-lg border px-3 py-2"
              >

                {STATUSES.map(s=>(
                  <option key={s} value={s}>
                    {s.replace("_"," ")}
                  </option>
                ))}

              </select>

            </label>



            <label>
              <span className="text-sm font-medium text-ink/80">
                Notes
              </span>

              <textarea
                rows="3"
                value={editing.notes || ""}
                onChange={(e)=>
                  setEditing(f=>({
                    ...f,
                    notes:e.target.value
                  }))
                }

                className="mt-1 w-full rounded-lg border px-3 py-2"
              />

            </label>



            <button
              className="bg-breath text-white rounded-full px-5 py-2 font-medium"
            >
              Save Appointment
            </button>


          </form>

        </Modal>

      )}

    </div>
  );
}



function Select({
  label,
  value,
  options,
  onChange
}){

  return (

    <label>

      <span className="text-sm font-medium text-ink/80">
        {label}
      </span>


      <select

        value={value || ""}

        onChange={(e)=>onChange(e.target.value)}

        className="mt-1 w-full rounded-lg border px-3 py-2"

      >

        <option value="">
          Select {label.toLowerCase()}...
        </option>


        {options.map(o=>(

          <option
            key={o.id}
            value={o.id}
          >
            {o.name}
          </option>

        ))}

      </select>


    </label>

  );
}