import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../api/AuthContext.jsx";

const LINKS = [
  { to: "/office-portal/dashboard", label: "Overview", end: true },
  { to: "/office-portal/dashboard/doctors", label: "Doctors" },
  { to: "/office-portal/dashboard/patients", label: "Patients" },
  { to: "/office-portal/dashboard/appointments", label: "Appointments" },
  { to: "/office-portal/dashboard/videos", label: "Videos" },
  { to: "/office-portal/dashboard/referrals", label: "Referrals" },
  { to: "/office-portal/dashboard/reviews", label: "Reviews" },
  { to: "/office-portal/dashboard/intake", label: "Intake Forms" },

];

function SidebarNav({ onNavigate, user, logout }) {
  return (
    <>
      <div className="px-5 py-5 border-b border-white/10">
        <p className="font-display text-lg">Practice Dashboard</p>
        <p className="text-xs text-paper/50">Harrell Orthodontics</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 text-sm overflow-y-auto">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${isActive ? "bg-breath text-white" : "text-paper/70 hover:bg-white/5"}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/10 text-xs text-paper/50">
        <p className="mb-2">{user?.first_name || user?.username}</p>
        <button onClick={logout} className="text-paper/70 hover:text-white">Log out</button>
      </div>
    </>
  );
}

export default function StaffLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-paper">
      {/* Mobile top bar -- the fixed-width sidebar below is desktop-only
          (lg:flex), so small screens get a header + slide-out drawer
          instead of a permanently cramped layout. */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14 bg-ink text-paper shrink-0 sticky top-0 z-40">
        <p className="font-display text-base">Practice Dashboard</p>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -mr-2 text-paper/80 hover:text-white"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[80%] max-w-xs bg-ink text-paper shadow-2xl flex flex-col">
            <div className="flex items-center justify-end px-3 pt-3">
              <button onClick={() => setMobileOpen(false)} className="p-2 text-paper/70 hover:text-white" aria-label="Close menu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} user={user} logout={logout} />
          </div>
        </div>
      )}

      <aside className="hidden lg:flex w-60 bg-ink text-paper flex-col shrink-0">
        <SidebarNav user={user} logout={logout} />
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
