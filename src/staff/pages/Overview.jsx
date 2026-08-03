import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import { withFallback } from "../../api/withFallback.js";
import { mockDashboardStats, mockAppointments } from "../../mockData.js";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [reloading, setReloading] = useState(false);

  const loadData = () => {
    withFallback(() => api.get("/dashboard/stats/"), mockDashboardStats).then(setStats);
    withFallback(() => api.get("/appointments/"), mockAppointments).then(setAppointments);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReload = async () => {
    setReloading(true);
    await Promise.all([
      withFallback(() => api.get("/dashboard/stats/"), mockDashboardStats).then(setStats),
      withFallback(() => api.get("/appointments/"), mockAppointments).then(setAppointments),
    ]);
    setReloading(false);
  };

  if (!stats) return <div className="p-10">Loading…</div>;


  console.log(stats);
  
  const cards = [
    { label: "Doctors", value: stats.total_doctors },
    { label: "Total Patients", value: stats.total_patients },
    { label: "Active Patients", value: stats.active_patients },
    { label: "Appointments Today", value: stats.appointments_today },
    { label: "New Intake Forms (7d)", value: stats.new_intake_forms_week },
    { label: "Unreviewed Intake Forms", value: stats.unreviewed_intake_forms },
    { label: "Pending Referrals", value: stats.pending_referrals },
  ];

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl text-ink mb-1">Overview</h1>
          <p className="text-ink/50 text-sm">A snapshot of the practice today.</p>
        </div>
        <button
          onClick={handleReload}
          disabled={reloading}
          className="bg-breath text-white rounded-full px-5 py-2 font-medium disabled:opacity-50 flex items-center gap-2"
        >
          <span className={reloading ? "animate-spin" : ""}>⟳</span>
          {reloading ? "Reloading…" : "Reload"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-ink/10 rounded-2xl p-5">
            <p className="text-3xl font-display text-ink">{c.value}</p>
            <p className="text-xs text-ink/50 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl p-6">
        <h2 className="text-lg text-ink mb-4">Today's schedule</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink/40 border-b border-ink/10">
              <th className="pb-2">Time</th>
              <th className="pb-2">Patient</th>
              <th className="pb-2">Doctor</th>
              <th className="pb-2">Reason</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-ink/5">
                <td className="py-2">{new Date(a.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                <td className="py-2">{a.patient_name}</td>
                <td className="py-2">{a.doctor_name}</td>
                <td className="py-2">{a.reason}</td>
                <td className="py-2 capitalize">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
