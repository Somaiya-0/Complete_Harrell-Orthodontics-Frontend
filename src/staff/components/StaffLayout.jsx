import React from "react";
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

export default function StaffLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-paper">
      <aside className="w-60 bg-ink text-paper flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="font-display text-lg">Practice Dashboard</p>
          <p className="text-xs text-paper/50">Harrell Orthodontics</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
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
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
