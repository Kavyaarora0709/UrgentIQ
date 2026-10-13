import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Clock, Sparkles, TrendingDown, TrendingUp, UserRound, Users } from "lucide-react";
import { getPatient, patients } from "@/lib/data";
import { ActionsList, Card, DemoNote, RiskCard, SeverityBadge, VitalCards } from "@/components/urgent/ui";
import { PatientQueue } from "@/components/urgent/PatientQueue";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Emergency Department — UrgentIQ" },
      { name: "description", content: "Real-time AI-assisted patient prioritization for the emergency department." },
      { property: "og:title", content: "Emergency Department — UrgentIQ" },
      { property: "og:description", content: "Real-time AI-assisted patient prioritization." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [selected, setSelected] = useState("P-1042");
  const p = getPatient(selected)!;
  const crit = patients.filter((x) => x.severity === "critical").length;
  const high = patients.filter((x) => x.severity === "high").length;

  const stats = [
    { icon: AlertTriangle, value: crit, label: "Critical Patients", sub: "Need immediate attention", tone: "bg-critical-soft text-critical" },
    { icon: UserRound, value: high, label: "High Priority", sub: "Within 15 minutes", tone: "bg-high-soft text-high" },
    { icon: Users, value: patients.length, label: "Total Patients", sub: "Currently in ER", tone: "bg-moderate-soft text-moderate" },
    { icon: Clock, value: "28 min", label: "Average Wait Time", sub: "18% lower vs last hour", tone: "bg-stable-soft text-stable", trend: true },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Emergency Department</h1>
          <p className="text-muted-foreground">Real-time patient prioritization using AI</p>
        </div>
        <DemoNote>All patient data is simulated for demonstration.</DemoNote>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`flex items-center gap-4 rounded-xl border p-4 ${s.tone.split(" ")[0]}`}>
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card ${s.tone.split(" ")[1]}`}><s.icon className="h-6 w-6" /></div>
            <div className="min-w-0">
              <div className={`text-2xl font-extrabold ${s.tone.split(" ")[1]}`}>{s.value}</div>
              <div className="font-semibold text-foreground">{s.label}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">{s.trend && <TrendingDown className="h-3 w-3 text-stable" />}{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Card>
          <h2 className="mb-3 text-xl font-bold">Patient Queue</h2>
          <PatientQueue limit={6} selectedId={selected} onSelect={setSelected} />
          <Button asChild variant="secondary" className="mt-3 w-full">
            <Link to="/queue">View All Patients ({patients.length}) <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </Card>

        <div className="space-y-5">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-3"><h2 className="text-2xl font-extrabold">{p.id}</h2><SeverityBadge severity={p.severity} /></div>
                <p className="text-sm text-muted-foreground">{p.age} yrs · {p.gender} | Arrived {p.arrived} ({p.wait} min ago)</p>
              </div>
              <div className="text-sm">Wait time: <span className="rounded-md bg-critical-soft px-2 py-0.5 font-bold text-critical">{p.wait} min</span></div>
            </div>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
              <dt className="text-muted-foreground">Name</dt><dd className="font-semibold">{p.name}</dd>
              <dt className="text-muted-foreground">Chief complaint</dt><dd className="font-semibold">{p.complaint}</dd>
              <dt className="text-muted-foreground">Source</dt><dd>{p.source}</dd>
            </dl>
            <div className="mt-4 mb-2 flex items-center justify-between">
              <h3 className="font-bold">Live Vitals <span className="ml-1 text-xs font-normal text-muted-foreground">(simulated values)</span></h3>
              <Button asChild size="sm" variant="outline"><Link to="/patients/$id" params={{ id: p.id }}><TrendingUp className="h-4 w-4" />View Trends</Link></Button>
            </div>
            <VitalCards p={p} compact />
          </Card>
          <RiskCard p={p} showFactors={false} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border bg-moderate-soft p-4">
              <div className="mb-2 flex items-center gap-2 font-bold"><Sparkles className="h-5 w-5 text-primary" />Key Concerns</div>
              <ul className="space-y-1.5 text-sm">{p.concerns.map((c) => <li key={c} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-critical" />{c}</li>)}</ul>
            </div>
            <ActionsList p={p} />
          </div>
        </div>
      </div>
    </div>
  );
}
