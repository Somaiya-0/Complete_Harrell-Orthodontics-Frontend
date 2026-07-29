import React from "react";

/** Compact staff card used for non-doctor team members. Falls back to an
 * initial avatar when no photo has been provided yet, and shows a
 * pending-note instead of inventing a bio. */
export default function TeamCard({ member }) {
  return (
    <div className="bg-white border border-ink/10 rounded-2xl p-6 text-center hover:shadow-card transition-shadow duration-300">
      {member.photo ? (
        <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-full object-cover object-top mx-auto mb-4 ring-4 ring-breathlight" />
      ) : (
        <div className="w-24 h-24 rounded-full bg-breathlight mx-auto mb-4 flex items-center justify-center text-breath text-2xl font-display ring-4 ring-breathlight/50">
          {member.name.charAt(0)}
        </div>
      )}
      <p className="font-display text-base text-ink">{member.name}</p>
      {member.role_title && <p className="text-xs text-breath font-medium mb-1">{member.role_title}</p>}
      {member.bio && <p className="text-xs text-ink/60">{member.bio}</p>}
      {member.pending_note && <p className="text-[11px] text-ink/30 italic mt-2">{member.pending_note}</p>}
    </div>
  );
}
