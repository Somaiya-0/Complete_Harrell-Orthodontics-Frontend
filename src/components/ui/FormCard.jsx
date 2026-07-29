import React from "react";
import { Link } from "react-router-dom";

/** A single named form in a Patient Resources list. If `to` is given it
 * links to a working digital version of the form; otherwise it's shown
 * as a named reference item with no link, since not every form mentioned
 * in the client's materials has an actual file/digital version yet --
 * we never fabricate a download that doesn't exist. */
export default function FormCard({ name, to, note }) {
  const body = (
    <>
      <span className="w-8 h-8 rounded-lg bg-breathlight text-breath flex items-center justify-center text-xs font-bold shrink-0">
        {to ? "\u2192" : "\u2013"}
      </span>
      <span>
        <span className={`block text-sm font-medium ${to ? "text-ink" : "text-ink/60"}`}>{name}</span>
        {note && <span className="block text-[11px] text-ink/40">{note}</span>}
      </span>
    </>
  );
  const cls = "flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3";
  return to ? (
    <Link to={to} className={`${cls} hover:border-breath/40 hover:bg-breathlight/40 transition-colors`}>{body}</Link>
  ) : (
    <div className={`${cls} opacity-70`}>{body}</div>
  );
}
