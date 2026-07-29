import React, { useState } from "react";
import { useApiResource } from "../../api/useApiResource.js";
import { mockTeam } from "../../mockData.js";
import Modal from "../components/Modal.jsx";
import DataTable from "../components/DataTable.jsx";

const EMPTY = {
  name: "", role_title: "", credentials: "", specialty: "", bio: "",
  education: "", is_doctor: true, is_published: true,
};

export default function ManageDoctors() {
  const { items, loading, create, update, remove } = useApiResource("/team/", mockTeam);
  const [editing, setEditing] = useState(null); // null=closed, {}=new, {...}=edit
  const [photoFile, setPhotoFile] = useState(null);

  function openNew() { setEditing({ ...EMPTY }); setPhotoFile(null); }
  function openEdit(row) { setEditing({ ...row }); setPhotoFile(null); }

  async function handleSave(e) {
    e.preventDefault();
    const payload = { ...editing };
    if (photoFile) payload.photo = photoFile; // (mock mode just stores the File object's name-free ref)
    if (editing.id) await update(editing.id, payload);
    else await create(payload);
    setEditing(null);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-ink">Doctors</h1>
          <p className="text-ink/50 text-sm">Manage doctor profiles, bios, and photos shown on the public site.</p>
        </div>
        <button onClick={openNew} className="bg-breath text-white rounded-full px-5 py-2 font-medium">+ Add doctor</button>
      </div>

      {loading ? <p>Loading…</p> : (
        <DataTable
          columns={[
            { key: "photo", label: "", render: (r) => r.photo ? <img src={typeof r.photo === "string" ? r.photo : ""} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-ink/10" /> },
            { key: "name", label: "Name" },
            { key: "specialty", label: "Specialty" },
            { key: "is_published", label: "Published", render: (r) => (r.is_published ? "Yes" : "No") },
          ]}
          rows={items}
          onEdit={openEdit}
          onDelete={(row) => remove(row.id)}
        />
      )}

      {editing && (
        <Modal title={editing.id ? "Edit doctor" : "Add doctor"} onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="grid gap-3">
            <Input label="Name" value={editing.name} onChange={(v) => setEditing((f) => ({ ...f, name: v }))} />
            <Input label="Credentials (e.g. DMD, C.DSM)" value={editing.credentials} onChange={(v) => setEditing((f) => ({ ...f, credentials: v }))} />
            <Input label="Specialty" value={editing.specialty} onChange={(v) => setEditing((f) => ({ ...f, specialty: v }))} />
            <Input label="Role title" value={editing.role_title} onChange={(v) => setEditing((f) => ({ ...f, role_title: v }))} />
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Bio</span>
              <textarea rows={4} value={editing.bio} onChange={(e) => setEditing((f) => ({ ...f, bio: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Education (one per line)</span>
              <textarea rows={2} value={editing.education} onChange={(e) => setEditing((f) => ({ ...f, education: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Photo</span>
              <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
            </label>
            <label className="flex items-center gap-2 text-sm text-ink/80">
              <input type="checkbox" checked={editing.is_published} onChange={(e) => setEditing((f) => ({ ...f, is_published: e.target.checked }))} />
              Published on public site
            </label>
            <button className="bg-breath text-white rounded-full px-5 py-2 font-medium mt-2">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/80">{label}</span>
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
    </label>
  );
}
