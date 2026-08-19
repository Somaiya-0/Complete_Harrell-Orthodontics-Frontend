import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client.js";
import { withFallback } from "../../api/withFallback.js";
import { mockDashboardStats, mockAppointments, mockIntakeSubmissions } from "../../mockData.js";

// How often to re-poll for new intake/review submissions so staff get a
// "new" notice without having to hit Reload themselves.
const POLL_INTERVAL_MS = 60000;

export default function Overview() {
  const navigate = useNavigate();

  // -- Intake Form + Reviews notices (the only things Overview shows now) --
  const [intakeNotices, setIntakeNotices] = useState([]);
  const [reviewNotices, setReviewNotices] = useState([]);
  const [reloading, setReloading] = useState(false);

  // Everything below (stats, today's schedule) is kept fully intact and
  // functional -- it's just not rendered anymore. See "hide all other
  // Overview content" -- commented out further down, not deleted.
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const loadNotices = () => {
    withFallback(() => api.get("/patients/submissions/"), mockIntakeSubmissions).then((rows) => {
      setIntakeNotices((Array.isArray(rows) ? rows : []).filter((r) => !r.office_reviewed));
    });
    withFallback(() => api.get("/reviews/manage/"), []).then((rows) => {
      setReviewNotices((Array.isArray(rows) ? rows : []).filter((r) => !r.is_approved));
    });
  };

  const loadHiddenWidgetsData = () => {
    withFallback(() => api.get("/dashboard/stats/"), mockDashboardStats).then(setStats);
    withFallback(() => api.get("/appointments/"), mockAppointments).then(setAppointments);
  };

  useEffect(() => {
    loadNotices();
    loadHiddenWidgetsData();

    const id = setInterval(loadNotices, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const handleReload = async () => {
    setReloading(true);
    await Promise.all([
      withFallback(() => api.get("/patients/submissions/"), mockIntakeSubmissions).then((rows) => {
        setIntakeNotices((Array.isArray(rows) ? rows : []).filter((r) => !r.office_reviewed));
      }),
      withFallback(() => api.get("/reviews/manage/"), []).then((rows) => {
        setReviewNotices((Array.isArray(rows) ? rows : []).filter((r) => !r.is_approved));
      }),
      withFallback(() => api.get("/dashboard/stats/"), mockDashboardStats).then(setStats),
      withFallback(() => api.get("/appointments/"), mockAppointments).then(setAppointments),
    ]);
    setReloading(false);
  };

  // const cards = stats && [
  //   { label: "Doctors", value: stats.total_doctors },
  //   { label: "Total Patients", value: stats.total_patients },
  //   { label: "Active Patients", value: stats.active_patients },
  //   { label: "Appointments Today", value: stats.appointments_today },
  //   { label: "New Intake Forms (7d)", value: stats.new_intake_forms_week },
  //   { label: "Unreviewed Intake Forms", value: stats.unreviewed_intake_forms },
  //   { label: "Pending Referrals", value: stats.pending_referrals },
  // ];

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl text-ink mb-1">Overview</h1>
          <p className="text-ink/50 text-sm">New Intake Form and Review notices.</p>
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

      {/* Intake Form + Reviews notices, side by side */}
      <div className="grid md:grid-cols-2 gap-6">
        <NoticePanel
          title="Intake Form"
          emptyLabel="No new intake form submissions."
          countLabel={(n) => `${n} new submission${n === 1 ? "" : "s"}`}
          items={intakeNotices}
          onOpen={() => navigate("/office-portal/dashboard/intake")}
          renderItem={(r) => ({
            key: r.id,
            title: `${r.first_name} ${r.last_name}`,
            subtitle: new Date(r.submitted_at).toLocaleString(),
          })}
        />
        <NoticePanel
          title="Reviews"
          emptyLabel="No new reviews."
          countLabel={(n) => `${n} new review${n === 1 ? "" : "s"}`}
          items={reviewNotices}
          onOpen={() => navigate("/office-portal/dashboard/reviews")}
          renderItem={(r) => ({
            key: r.id,
            title: `${r.author_name} — ${"★".repeat(r.rating)}`,
            subtitle: new Date(r.submitted_at).toLocaleString(),
          })}
        />
      </div>

      {/* All other Overview widgets (stat cards, today's schedule) are
          hidden per client request. Kept here, commented out, rather than
          deleted, so functionality can be restored easily. */}
      {/*
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 mt-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-ink/10 rounded-2xl p-5">
            <p className="text-3xl font-display text-ink">{c.value}</p>
            <p className="text-xs text-ink/50 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl p-6">
        <h2 className="text-lg text-ink mb-4">Today's schedule</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-ink/40 border-b border-ink/10">
                <th className="pb-2 pr-3">Time</th>
                <th className="pb-2 pr-3">Patient</th>
                <th className="pb-2 pr-3">Doctor</th>
                <th className="pb-2 pr-3">Reason</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b border-ink/5">
                  <td className="py-2 pr-3 whitespace-nowrap">{new Date(a.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                  <td className="py-2 pr-3">{a.patient_name}</td>
                  <td className="py-2 pr-3">{a.doctor_name}</td>
                  <td className="py-2 pr-3">{a.reason}</td>
                  <td className="py-2 capitalize">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      */}
    </div>
  );
}

// Side-by-side notice card. Clicking anywhere on it (or an individual row)
// takes staff to that section, per "clicking each notice takes staff to
// its respective section."
function NoticePanel({ title, emptyLabel, countLabel, items, onOpen, renderItem }) {
  const count = items.length;
  return (
    <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden flex flex-col">
      <button
        onClick={onOpen}
        className="w-full text-left px-6 py-4 border-b border-ink/10 flex items-center justify-between hover:bg-ink/[0.03]"
      >
        <div>
          <h2 className="text-lg text-ink">{title}</h2>
          <p className="text-xs text-ink/50 mt-0.5">
            {count > 0 ? countLabel(count) : emptyLabel}
          </p>
        </div>
        {count > 0 && (
          <span className="bg-breath text-white text-xs font-medium rounded-full min-w-[1.5rem] h-6 px-2 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {count > 0 && (
        <ul className="divide-y divide-ink/5 max-h-72 overflow-y-auto">
          {items.slice(0, 8).map((raw) => {
            const item = renderItem(raw);
            return (
              <li key={item.key}>
                <button
                  onClick={onOpen}
                  className="w-full text-left px-6 py-3 hover:bg-ink/[0.03] flex flex-col"
                >
                  <span className="text-sm text-ink">{item.title}</span>
                  <span className="text-xs text-ink/50">{item.subtitle}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
