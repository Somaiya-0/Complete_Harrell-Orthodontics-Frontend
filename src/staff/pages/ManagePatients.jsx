import React, { useEffect, useState } from "react";
import { useApiResource } from "../../api/useApiResource.js";
import { mockPatients } from "../../mockData.js";
import Modal from "../components/Modal.jsx";
import DataTable from "../components/DataTable.jsx";
import { api } from "../../api/client.js";


// const SERVICES = [
//   "Early Orthodontics, Ages 4-6",
//   "Orthodontics, Ages 7-11",
//   "Teen Orthodontics",
//   "Adult Orthodontics",
//   "TMJ Disorders",
//   "Sleep, Breathing & Airway Disorders",
//   "Myofunctional Therapy",
//   "Airway Diagnostics",
// ];



const SERVICES = [
  {
    value: "early_ortho_4_6",
    label: "Early Orthodontics, Ages 4-6",
  },
  {
    value: "ortho_7_11",
    label: "Orthodontics, Ages 7-11",
  },
  {
    value: "teen_ortho",
    label: "Teen Orthodontics",
  },
  {
    value: "adult_ortho",
    label: "Adult Orthodontics",
  },
  {
    value: "tmj",
    label: "TMJ Disorders",
  },
  {
    value: "sleep_airway",
    label: "Sleep, Breathing & Airway Disorders",
  },
  {
    value: "myofunctional",
    label: "Myofunctional Therapy",
  },
  {
    value: "airway_diagnostics",
    label: "Airway Diagnostics",
  },
];


const EMPTY = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  phone: "",
  email: "",
  service: "",
  assigned_doctor: "",
  status: "active",
  notes: "",
};


export default function ManagePatients() {



  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
  api.get("/team/")
    .then((res) => {
      console.log("TEAM API:", res.data);
      setDoctors(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  const {
    items,
    loading,
    create,
    update,
    remove,
  } = useApiResource("/patients/records/");


  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");


  async function handleSave(e) {
    e.preventDefault();

    setError("");

    if (!editing.first_name || !editing.last_name) {
      setError("Please enter patient's first and last name.");
      return;
    }

    if (!editing.service) {
      setError("Please select a service.");
      return;
    }


    try {

      const payload = {
        ...editing,
        assigned_doctor:
          editing.assigned_doctor
            ? Number(editing.assigned_doctor)
            : null,
      };


      if (editing.id) {
        await update(editing.id, payload);
      } else {
        await create(payload);
      }


      setEditing(null);

    } catch (err) {

  console.log("Backend error:", err.response?.data);

  setError(
    JSON.stringify(err.response?.data)
  );

}
  }


  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl text-ink">
            Patients
          </h1>

          <p className="text-ink/50 text-sm">
            Patient records, assigned doctor, and treatment service.
          </p>
        </div>


        <button
          onClick={() =>
            setEditing({ ...EMPTY })
          }
          className="
            bg-breath
            text-white
            rounded-full
            px-5
            py-2
            font-medium
          "
        >
          + Add patient
        </button>

      </div>



      {
        loading ? (
          <p>Loading...</p>
        ) : (

          <DataTable

            columns={[

              {
                key: "name",
                label: "Name",
                render: (r) =>
                  `${r.first_name} ${r.last_name}`,
              },


              {
                key: "service",
                label: "Service",
              },


              {
                key: "assigned_doctor_name",
                label: "Doctor",
              },


              {
                key: "phone",
                label: "Phone",
              },


              {
                key: "status",
                label: "Status",
                render: (r) => (
                  <span className="capitalize">
                    {r.status}
                  </span>
                ),
              },

            ]}


            rows={items}

            onEdit={setEditing}

            onDelete={(row) =>
              remove(row.id)
            }

          />

        )
      }



      {
        editing && (

          <Modal

            title={
              editing.id
              ? "Edit patient"
              : "Add patient"
            }

            onClose={() =>
              setEditing(null)
            }

          >


            <form
              onSubmit={handleSave}
              className="grid gap-3"
            >


              {
                error && (

                  <div
                    className="
                      bg-red-50
                      text-red-600
                      text-sm
                      rounded-lg
                      px-3
                      py-2
                    "
                  >
                    {error}
                  </div>

                )
              }



              <div className="grid grid-cols-2 gap-3">

                <Input
                  label="First name"
                  value={editing.first_name}
                  onChange={(v)=>
                    setEditing(f=>({
                      ...f,
                      first_name:v
                    }))
                  }
                />


                <Input
                  label="Last name"
                  value={editing.last_name}
                  onChange={(v)=>
                    setEditing(f=>({
                      ...f,
                      last_name:v
                    }))
                  }
                />

              </div>



              <div className="grid grid-cols-2 gap-3">


                <label>

                  <span className="text-sm font-medium text-ink/80">
                    Date of birth
                  </span>

                  <input
                    type="date"
                    value={
                      editing.date_of_birth || ""
                    }

                    onChange={(e)=>
                      setEditing(f=>({
                        ...f,
                        date_of_birth:e.target.value
                      }))
                    }

                    className="
                      mt-1
                      w-full
                      rounded-lg
                      border
                      border-ink/20
                      px-3
                      py-2
                    "
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

                    className="
                      mt-1
                      w-full
                      rounded-lg
                      border
                      border-ink/20
                      px-3
                      py-2
                    "
                  >

                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>

                    <option value="completed">
                      Treatment completed
                    </option>

                  </select>

                </label>


              </div>





              <div className="grid grid-cols-2 gap-3">


                <Input
                  label="Phone"
                  value={editing.phone}
                  onChange={(v)=>
                    setEditing(f=>({
                      ...f,
                      phone:v
                    }))
                  }
                />


                <Input
                  label="Email"
                  value={editing.email}
                  onChange={(v)=>
                    setEditing(f=>({
                      ...f,
                      email:v
                    }))
                  }
                />


              </div>





              <div className="grid grid-cols-2 gap-3">


                <label>

                  <span className="text-sm font-medium text-ink/80">
                    Service
                  </span>


                  <select

                    value={editing.service}

                    onChange={(e)=>
                      setEditing(f=>({
                        ...f,
                        service:e.target.value
                      }))
                    }

                    className="
                      mt-1
                      w-full
                      rounded-lg
                      border
                      border-ink/20
                      px-3
                      py-2
                    "
                  >

                    <option value="">
                      Select service...
                    </option>


                    {
                    SERVICES.map(service => (
                      <option
                        key={service.value}
                        value={service.value}
                      >
                        {service.label}
                      </option>
                    ))
                  }


                  </select>

                </label>





                <label>

                  <span className="text-sm font-medium text-ink/80">
                    Assigned doctor
                  </span>


                  <select

                    value={
                      editing.assigned_doctor || ""
                    }


                    onChange={(e)=>
                      setEditing(f=>({
                        ...f,
                        assigned_doctor:e.target.value
                      }))
                    }


                    className="
                      mt-1
                      w-full
                      rounded-lg
                      border
                      border-ink/20
                      px-3
                      py-2
                    "
                  >

                    <option value="">
                      Select doctor...
                    </option>


                    {
  doctors
    .filter(d => d.is_doctor)
    .map(d => (
      <option
        key={d.id}
        value={d.id}
      >
        {d.name}
      </option>
    ))
}


                  </select>

                </label>


              </div>





              <label>

                <span className="text-sm font-medium text-ink/80">
                  Notes
                </span>


                <textarea

                  rows={3}

                  value={
                    editing.notes || ""
                  }

                  onChange={(e)=>
                    setEditing(f=>({
                      ...f,
                      notes:e.target.value
                    }))
                  }


                  placeholder="Patient history, concerns, treatment notes..."

                  className="
                    mt-1
                    w-full
                    rounded-lg
                    border
                    border-ink/20
                    px-3
                    py-2
                    resize-none
                  "

                />

              </label>




              <button

                className="
                  bg-breath
                  text-white
                  rounded-full
                  px-5
                  py-2
                  font-medium
                "

              >
                Save Patient
              </button>



            </form>


          </Modal>

        )
      }



    </div>

  );

}





function Input({
  label,
  value,
  onChange
}) {

  return (

    <label>

      <span className="text-sm font-medium text-ink/80">
        {label}
      </span>


      <input

        value={value || ""}

        onChange={(e)=>
          onChange(e.target.value)
        }


        className="
          mt-1
          w-full
          rounded-lg
          border
          border-ink/20
          px-3
          py-2
        "

      />

    </label>

  );

}