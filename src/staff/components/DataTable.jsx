import React from "react";

export default function DataTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-ink/40 border-b border-ink/10 bg-ink/[0.02]">
              {columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium whitespace-nowrap">{c.label}</th>)}
              {(onEdit || onDelete) && <th className="px-4 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td className="px-4 py-8 text-center text-ink/40" colSpan={columns.length + 1}>No records yet.</td></tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-ink/5 hover:bg-breathlight/40">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-ink/80">{c.render ? c.render(row) : row[c.key]}</td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {onEdit && <button onClick={() => onEdit(row)} className="text-breath mr-3">Edit</button>}
                    {onDelete && <button onClick={() => onDelete(row)} className="text-red-500">Delete</button>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
