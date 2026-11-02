import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart2,
  Clock,
  PieChart as PieIcon,
  TrendingDown,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, DemoNote } from "@/components/urgent/ui";
import { patients, SEVERITY_LABEL, type Severity } from "@/lib/data";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Department Analytics — UrgentIQ" },
      { name: "description", content: "Department performance, hourly arrivals, triage distributions, and wait-time statistics." },
    ],
  }),
  component: AnalyticsPage,
});

const hourlyArrivals = [
  { hour: "08:00", arrivals: 9 },
  { hour: "09:00", arrivals: 14 },
  { hour: "10:00", arrivals: 12 },
  { hour: "11:00", arrivals: 7 },
  { hour: "12:00", arrivals: 11 },
  { hour: "13:00", arrivals: 6 },
  { hour: "14:00", arrivals: 8 },
  { hour: "15:00", arrivals: 10 },
];

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: "var(--critical)",
  high: "var(--high)",
  moderate: "var(--moderate)",
  low: "var(--stable)",
};

function AnalyticsPage() {
  const totalArrivals = hourlyArrivals.reduce((sum, h) => sum + h.arrivals, 0);

  const triageCounts = useMemo(() => {
    const counts: Record<Severity, number> = {
      critical: 0,
      high: 0,
      moderate: 0,
      low: 0,
    };
    patients.forEach((p) => {
      counts[p.severity] = (counts[p.severity] || 0) + 1;
    });
    return counts;
  }, []);

  const triageData = useMemo(() => {
    return (["critical", "high", "moderate", "low"] as Severity[]).map((key) => ({
      name: SEVERITY_LABEL[key],
      value: triageCounts[key],
      color: SEVERITY_COLORS[key],
    }));
  }, [triageCounts]);

  const avgWaitByPriority = useMemo(() => {
    const severities: Severity[] = ["critical", "high", "moderate", "low"];
    return severities.map((sev) => {
      const group = patients.filter((p) => p.severity === sev);
      const avg = group.length > 0 ? Math.round(group.reduce((s, p) => s + p.wait, 0) / group.length) : 0;
      return {
        severity: sev,
        label: SEVERITY_LABEL[sev],
        avgWait: avg,
        color: SEVERITY_COLORS[sev],
      };
    });
  }, []);

  const maxWait = Math.max(...avgWaitByPriority.map((w) => w.avgWait), 60);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Department performance today · simulated data</p>
        </div>
        <DemoNote>All analytics and wait times are generated from prototype data.</DemoNote>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border bg-moderate-soft p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-moderate">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-moderate">{totalArrivals}</div>
            <div className="font-semibold text-foreground text-sm">Arrivals today</div>
            <div className="text-xs text-muted-foreground">Recorded across 8 hours</div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border bg-stable-soft p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-stable">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-stable">28 min</div>
            <div className="font-semibold text-foreground text-sm">Avg wait time</div>
            <div className="flex items-center gap-1 text-xs text-stable">
              <TrendingDown className="h-3 w-3" /> 18% lower vs last hour
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border bg-high-soft p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-high">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-high">6 min</div>
            <div className="font-semibold text-foreground text-sm">Avg time to triage</div>
            <div className="text-xs text-muted-foreground">Well within 10 min target</div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border bg-critical-soft p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-critical">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-critical">2</div>
            <div className="font-semibold text-foreground text-sm">Escalations</div>
            <div className="text-xs text-muted-foreground">Both stabilized in resus</div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Arrivals by hour */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              Arrivals by Hour
            </h3>
            <span className="text-xs text-muted-foreground">Peak: 14 patients at 09:00</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyArrivals} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                    fontSize: 12,
                  }}
                  formatter={(val: number) => [`${val} patients`, "Arrivals"]}
                />
                <Bar dataKey="arrivals" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Triage Distribution */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <PieIcon className="h-5 w-5 text-primary" />
              Triage Distribution
            </h3>
            <span className="text-xs text-muted-foreground">{patients.length} total active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={triageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {triageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--card)",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2.5">
              {triageData.map((t) => (
                <div key={t.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="font-medium text-foreground">{t.name}</span>
                  </div>
                  <div className="font-bold text-foreground">
                    {t.value}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      ({Math.round((t.value / patients.length) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Average wait by priority */}
        <Card>
          <h3 className="mb-4 font-bold text-lg">Average Wait by Priority (min)</h3>
          <div className="space-y-3.5">
            {avgWaitByPriority.map((item) => (
              <div key={item.severity} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <span className="font-extrabold text-foreground">{item.avgWait} min</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (item.avgWait / maxWait) * 100)}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Alert Accuracy */}
        <Card>
          <h3 className="mb-2 font-bold text-lg">AI Alert Accuracy</h3>
          <p className="text-sm text-muted-foreground">
            Not available in this prototype. Validated metrics would appear here once a formal clinical evaluation is run.
          </p>
          <div className="mt-4 rounded-xl border bg-surface p-4">
            <div className="text-xs font-semibold uppercase text-primary tracking-wide">Target Metrics for Pilot</div>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>• Sensitivity for early critical deterioration: ≥ 94%</li>
              <li>• False alarm suppression: &lt; 15% alert fatigue</li>
              <li>• Mean lead time to intervention: 18 minutes prior to bedside alert</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
