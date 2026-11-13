import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  TrendingUp,
  Users,
} from "lucide-react";
import { getPatient, initialAlerts, patients, vitalsTrend } from "@/lib/data";
import { PatientQueue } from "@/components/urgent/PatientQueue";
import { TrendChart } from "@/components/urgent/TrendChart";
import { DemoNote, RiskCard, SeverityBadge, VitalCards } from "@/components/urgent/ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function InteractiveProductPreview() {
  const [selectedId, setSelectedId] = useState("P-1042");
  const [tab, setTab] = useState<"overview" | "trends" | "alerts">("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const patient = getPatient(selectedId) ?? patients[0]!;
  const crit = patients.filter((x) => x.severity === "critical").length;
  const high = patients.filter((x) => x.severity === "high").length;

  return (
    <div className="card-surface overflow-hidden border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <span className="text-sm font-bold text-foreground">
            Interactive UrgentIQ Dashboard Preview
          </span>
          <span className="rounded-md border border-primary/20 bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
            Simulated patient data
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Dashboard preview views">
          {(
            [
              { id: "overview", label: "Queue & Vitals", icon: Users },
              { id: "trends", label: "Vitals Trends", icon: TrendingUp },
              { id: "alerts", label: "Alert Feed", icon: Bell },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(item.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground">Patient Priority Queue</h3>
              <span className="text-xs text-muted-foreground">
                {crit} critical · {high} high
              </span>
            </div>
            <PatientQueue limit={5} selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          <div className="space-y-4">
            {tab === "overview" && (
              <>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl font-extrabold">{patient.id}</h3>
                        <SeverityBadge severity={patient.severity} />
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {patient.name} · {patient.age} yrs · {patient.gender} · {patient.complaint}
                      </p>
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">
                      Wait:{" "}
                      <span className="rounded bg-critical-soft px-1.5 py-0.5 font-bold text-critical">
                        {patient.wait} min
                      </span>
                    </div>
                  </div>
                  <VitalCards p={patient} compact />
                </div>
                <RiskCard p={patient} showFactors />
              </>
            )}

            {tab === "trends" && (
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Simulated Vital Trends · {patient.id} ({patient.name})
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      5-minute deterministic demonstration series (HR, SpO₂, Systolic BP, RR)
                    </p>
                  </div>
                  <SeverityBadge severity={patient.severity} />
                </div>
                {mounted ? (
                  <TrendChart data={vitalsTrend(patient, 5)} height={250} />
                ) : (
                  <div className="grid h-[250px] place-items-center rounded-lg border border-dashed bg-surface text-xs text-muted-foreground">
                    Loading trend chart…
                  </div>
                )}
              </div>
            )}

            {tab === "alerts" && (
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground">
                    Simulated Priority Alerts
                  </h3>
                  <span className="text-xs text-muted-foreground">Clinician review prompts</span>
                </div>
                <ul className="space-y-2.5">
                  {initialAlerts.map((alert) => (
                    <li
                      key={alert.id}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5",
                        alert.severity === "critical"
                          ? "border-critical/25 bg-critical-soft"
                          : "border-high/25 bg-high-soft",
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-foreground">
                            {alert.patientId}
                          </span>
                          <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                            {alert.severity}
                          </span>
                        </div>
                        <p className="truncate text-sm font-medium text-foreground">
                          {alert.factor}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-xs font-semibold text-muted-foreground">
                          {alert.time}
                        </div>
                        <div className="text-[11px] font-semibold text-accent-foreground">
                          {alert.resolved
                            ? "Resolved"
                            : alert.acknowledged
                              ? "Acknowledged"
                              : "Pending review"}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
              <DemoNote>
                Prototype preview using fictional simulated patients — never live clinical data.
              </DemoNote>
              <Button asChild size="sm" variant="outline" className="font-semibold">
                <Link to="/login">
                  Open Full Prototype
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
