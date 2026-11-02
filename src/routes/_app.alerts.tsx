import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  ChevronRight,
  Info,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { Card, DemoNote } from "@/components/urgent/ui";
import { Button } from "@/components/ui/button";
import { acknowledgeAlert, markAllAlertsRead, resetAlerts, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/alerts")({
  head: () => ({
    meta: [
      { title: "Clinical Alerts — UrgentIQ" },
      { name: "description", content: "Real-time clinical alerts, deterioration warnings, and vitals thresholds." },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const alerts = useStore((s) => s.alerts);
  const unreadCount = alerts.filter((a) => !a.acknowledged && !a.resolved).length;
  const [filter, setFilter] = useState<"all" | "unread" | "critical" | "high">("all");

  const filtered = alerts.filter((a) => {
    if (filter === "unread") return !a.acknowledged && !a.resolved;
    if (filter === "critical") return a.severity === "critical";
    if (filter === "high") return a.severity === "high";
    return true;
  });

  const handleMarkAllRead = () => {
    markAllAlertsRead();
    toast.success("All alerts marked as acknowledged");
  };

  const handleResetAlerts = () => {
    resetAlerts();
    toast.success("Patient alerts reset to default state");
  };

  const handleAcknowledge = (id: string, patientId: string) => {
    acknowledgeAlert(id);
    toast.info(`Alert acknowledged for ${patientId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground">
            {unreadCount} unread · simulated alerts for demonstration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DemoNote>Simulated deterioration alerts — not real clinical alerts.</DemoNote>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetAlerts}
            className="gap-2 text-xs font-semibold"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Alerts
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllRead}
              className="gap-2 text-xs font-semibold"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <Card>
        {/* Filter buttons */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-3">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-surface text-foreground hover:bg-accent",
              )}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === "unread"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-surface text-foreground hover:bg-accent",
              )}
            >
              Unacknowledged ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("critical")}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === "critical"
                  ? "border-critical bg-critical text-primary-foreground"
                  : "bg-critical-soft text-critical hover:border-critical/30",
              )}
            >
              Critical ({alerts.filter((a) => a.severity === "critical").length})
            </button>
            <button
              onClick={() => setFilter("high")}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === "high"
                  ? "border-high bg-high text-primary-foreground"
                  : "bg-high-soft text-high hover:border-high/30",
              )}
            >
              High ({alerts.filter((a) => a.severity === "high").length})
            </button>
          </div>
        </div>

        {/* Alerts list */}
        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-xl border border-dashed py-12 text-center text-muted-foreground">
            <ShieldAlert className="mb-2 h-8 w-8 text-stable" />
            <p className="font-semibold text-foreground">No alerts match the filter</p>
            <p className="text-sm">All department notifications are up to date.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((a) => {
              const isCrit = a.severity === "critical";
              const unread = !a.acknowledged && !a.resolved;

              return (
                <div
                  key={a.id}
                  className={cn(
                    "flex flex-wrap items-center gap-3.5 rounded-xl border p-4 transition-shadow",
                    unread ? "bg-primary-soft/50 border-primary/30 shadow-sm" : "bg-card border-border",
                  )}
                >
                  <div
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-xl font-bold text-sm",
                      isCrit ? "bg-critical text-primary-foreground" : "bg-high-soft text-high",
                    )}
                  >
                    {isCrit ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to="/patients/$id"
                        params={{ id: a.patientId }}
                        className="font-extrabold text-foreground hover:underline"
                      >
                        {a.patientId}
                      </Link>
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-extrabold uppercase",
                          isCrit ? "bg-critical text-primary-foreground" : "bg-high text-primary-foreground",
                        )}
                      >
                        {a.severity}
                      </span>
                    </div>
                    <p className="mt-1 font-semibold text-foreground text-sm">{a.factor}</p>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" variant="ghost" className="text-xs gap-1">
                      <Link to="/patients/$id" params={{ id: a.patientId }}>
                        Patient Details <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    {unread ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcknowledge(a.id, a.patientId)}
                        className="text-xs font-semibold"
                      >
                        Acknowledge
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-stable" /> Read
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
