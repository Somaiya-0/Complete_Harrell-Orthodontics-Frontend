import React, { useState } from "react";
import { useApiResource } from "../../api/useApiResource.js";
import { mockPagesList } from "../../mockData.js";
import Modal from "../components/Modal.jsx";
import DataTable from "../components/DataTable.jsx";

const EMPTY = { title: "", slug: "", short_description: "", is_published: true };

export default function ManageContent() {
  const { items, loading, create, update, remove } = useApiResource("/pages/", mockPagesList);
  const [editing, setEditing] = useState(null);

  async function handleSave(e) {
    e.preventDefault();
    if (editing.id) await update(editing.id, editing);
    else await create(editing);
    setEditing(null);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-ink">Content Pages</h1>
          <p className="text-ink/50 text-sm">
            Every service page on the public site (ortho age groups, TMJ, sleep/airway, etc.) is managed here.
          </p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="bg-breath text-white rounded-full px-5 py-2 font-medium">+ New page</button>
      </div>

      {loading ? <p>Loading…</p> : (
        <DataTable
          columns={[
            { key: "title", label: "Title" },
            { key: "slug", label: "Slug" },
            { key: "is_published", label: "Published", render: (r) => (r.is_published ? "Yes" : "No") },
          ]}
          rows={items}
          onEdit={setEditing}
          onDelete={(row) => remove(row.id)}
        />
      )}

      {editing && (
        <Modal title={editing.id ? "Edit page" : "New page"} onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="grid gap-3">
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Title</span>
              <input value={editing.title} onChange={(e) => setEditing((f) => ({ ...f, title: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Slug (URL)</span>
              <input value={editing.slug} onChange={(e) => setEditing((f) => ({ ...f, slug: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Short description</span>
              <textarea rows={2} value={editing.short_description} onChange={(e) => setEditing((f) => ({ ...f, short_description: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
            </label>
            <label className="flex items-center gap-2 text-sm text-ink/80">
              <input type="checkbox" checked={editing.is_published} onChange={(e) => setEditing((f) => ({ ...f, is_published: e.target.checked }))} />
              Published
            </label>
            <p className="text-xs text-ink/40">
              Section-by-section body content (rich text blocks, images, stat callouts) is edited via the
              page's detail screen in a future pass — for now use Django Admin's inline editor for section bodies.
            </p>
            <button className="bg-breath text-white rounded-full px-5 py-2 font-medium mt-2">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
