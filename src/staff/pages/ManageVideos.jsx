import React, { useState } from "react";
import { useApiResource } from "../../api/useApiResource.js";
import { mockVideos } from "../../mockData.js";
import Modal from "../components/Modal.jsx";
import DataTable from "../components/DataTable.jsx";

const CATEGORIES = [
  { value: "patient_testimonial", label: "Patient Testimonial" },
  { value: "educational", label: "Educational" },
  { value: "office_tour", label: "Office Tour" },
];

const EMPTY = { title: "", category: "educational", video_url: "", caption_text: "", is_published: true };

export default function ManageVideos() {
  const { items, loading, create, update, remove } = useApiResource("/videos/", mockVideos);
  const [editing, setEditing] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);

  function openNew() { setEditing({ ...EMPTY }); setVideoFile(null); setThumbFile(null); }
  function openEdit(row) { setEditing({ ...row }); setVideoFile(null); setThumbFile(null); }

  async function handleSave(e) {
    e.preventDefault();
    const payload = { ...editing };
    if (videoFile) payload.video_file = videoFile;
    if (thumbFile) payload.thumbnail = thumbFile;
    if (editing.id) await update(editing.id, payload);
    else await create(payload);
    setEditing(null);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-ink">Videos</h1>
          {/* <p className="text-ink/50 text-sm">Upload, edit, or remove videos shown on the public site (Home preview + full Videos page).</p> */}
        </div>
        <button onClick={openNew} className="bg-breath text-white rounded-full px-5 py-2 font-medium">+ Add video</button>
      </div>

      {loading ? <p>Loading…</p> : (
        <DataTable
          columns={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category", render: (r) => CATEGORIES.find((c) => c.value === r.category)?.label || r.category },
            { key: "is_published", label: "Published", render: (r) => (r.is_published ? "Yes" : "No") },
          ]}
          rows={items}
          onEdit={openEdit}
          onDelete={(row) => remove(row.id)}
        />
      )}

      {editing && (
        <Modal title={editing.id ? "Edit video" : "Add video"} onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="grid gap-3">
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Title</span>
              <input value={editing.title} onChange={(e) => setEditing((f) => ({ ...f, title: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Category</span>
              <select value={editing.category} onChange={(e) => setEditing((f) => ({ ...f, category: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2">
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Hosted video URL (YouTube/Vimeo) -- optional if uploading a file</span>
              <input value={editing.video_url || ""} onChange={(e) => setEditing((f) => ({ ...f, video_url: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" placeholder="https://..." />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Or upload a video file</span>
              <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Thumbnail image</span>
              <input type="file" accept="image/*" onChange={(e) => setThumbFile(e.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/80">Caption / transcript text</span>
              <textarea rows={3} value={editing.caption_text || ""} onChange={(e) => setEditing((f) => ({ ...f, caption_text: e.target.value }))} className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" />
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
