import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import { withFallback } from "../../api/withFallback.js";
import { mockDashboardStats } from "../../mockData.js";

export default function Reports() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    withFallback(() => api.get("/dashboard/stats/"), mockDashboardStats).then(setStats);
  }, []);

  if (!stats) return <div className="p-10">Loading…</div>;

  const breakdown = stats.appointment_status_breakdown || {};
  const max = Math.max(1, ...Object.values(breakdown));

  return (
    <div className="p-8">
      <h1 className="text-2xl text-ink mb-1">Reports</h1>
      <p className="text-ink/50 text-sm mb-8">Simple operational reporting for the practice.</p>

      <div className="bg-white border border-ink/10 rounded-2xl p-6 max-w-lg">
        <h2 className="text-lg text-ink mb-4">Appointments by status</h2>
        <div className="space-y-3">
          {Object.entries(breakdown).map(([status, count]) => (
            <div key={status}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize text-ink/70">{status.replace("_", " ")}</span>
                <span className="text-ink/50">{count}</span>
              </div>
              <div className="h-2 bg-ink/5 rounded-full overflow-hidden">
                <div className="h-full bg-breath rounded-full" style={{ width: `${(count / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
