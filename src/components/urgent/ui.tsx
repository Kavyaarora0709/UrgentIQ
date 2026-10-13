import { Activity, AlertTriangle, ArrowDown, ArrowUp, Check, Droplet, HeartPulse, Info, ShieldCheck, Wind } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SEVERITY_LABEL, vitalRanges, vitalStatus, type Patient, type Severity } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <div className="flex items-center gap-2.5">
      <Activity className={cn("shrink-0 text-primary", size === "lg" ? "h-10 w-10" : "h-8 w-8")} strokeWidth={2.4} />
      <div className="leading-tight">
        <div className={cn("font-extrabold tracking-tight text-foreground", size === "lg" ? "text-3xl" : "text-xl")}>UrgentIQ</div>
        <div className="text-[11px] font-medium text-muted-foreground">AI-Powered Emergency Care</div>
      </div>
    </div>
  );
}

export const sevStyles: Record<Severity, { badge: string; soft: string; text: string; bar: string }> = {
  critical: { badge: "bg-critical text-primary-foreground", soft: "bg-critical-soft", text: "text-critical", bar: "border-l-critical" },
  high: { badge: "bg-high-soft text-high border border-high/30", soft: "bg-high-soft", text: "text-high", bar: "border-l-high" },
  moderate: { badge: "bg-moderate-soft text-moderate border border-moderate/30", soft: "bg-moderate-soft", text: "text-moderate", bar: "border-l-moderate" },
  low: { badge: "bg-stable-soft text-stable border border-stable/30", soft: "bg-stable-soft", text: "text-stable", bar: "border-l-stable" },
};

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide", sevStyles[severity].badge, className)}>
      {severity === "critical" && <AlertTriangle className="h-3 w-3" />}
      {SEVERITY_LABEL[severity]}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn("card-surface p-5", className)}>{children}</section>;
}

export function DemoNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
      <Info className="mt-px h-3 w-3 shrink-0" />
      {children}
    </p>
  );
}

function Spark({ up, tone }: { up: boolean; tone: string }) {
  const d = up ? "M2 26 L10 22 L16 24 L24 14 L30 16 L38 4" : "M2 6 L10 10 L16 8 L24 18 L30 16 L38 26";
  return (
    <svg viewBox="0 0 40 30" className={cn("h-7 w-12 shrink-0", tone)} aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VitalCards({ p, compact }: { p: Patient; compact?: boolean }) {
  const items = [
    { key: "hr" as const, icon: HeartPulse, value: `${p.vitals.hr}` },
    { key: "spo2" as const, icon: Droplet, value: `${p.vitals.spo2}` },
    { key: "bp" as const, icon: Activity, value: `${p.vitals.sys}/${p.vitals.dia}` },
    { key: "rr" as const, icon: Wind, value: `${p.vitals.rr}` },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {items.map(({ key, icon: Icon, value }) => {
        const r = vitalRanges[key];
        const st = vitalStatus(key, p.vitals);
        const abnormal = st !== "Normal";
        return (
          <div key={key} className={cn("rounded-xl border p-3", abnormal ? "border-critical/20 bg-critical-soft" : "bg-surface")}>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon className={cn("h-4 w-4", abnormal ? "text-critical" : "text-primary")} />
              <span className="truncate">{r.label}</span>
            </div>
            <div className="mt-1.5 flex items-end justify-between gap-1">
              <div className="min-w-0">
                <span className={cn("font-extrabold text-foreground", compact ? "text-lg" : "text-2xl")}>{value}</span>
                <span className="ml-1 text-xs font-semibold text-muted-foreground">{r.unit}</span>
              </div>
              <Spark up={st !== "Low"} tone={abnormal ? "text-critical" : "text-primary"} />
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">({r.range})</span>
              <span className={cn("inline-flex items-center gap-0.5 font-bold", abnormal ? "text-critical" : "text-stable")}>
                {st === "High" && <ArrowUp className="h-3 w-3" />}
                {st === "Low" && <ArrowDown className="h-3 w-3" />}
                {st === "Normal" && <Check className="h-3 w-3" />}
                {st}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function riskLabel(r: number) {
  return r >= 75 ? "High Risk of Deterioration" : r >= 40 ? "Moderate Risk of Deterioration" : "Low Risk of Deterioration";
}

export function RiskCard({ p, showFactors = true }: { p: Patient; showFactors?: boolean }) {
  const high = p.risk >= 75;
  return (
    <div className={cn("rounded-xl border p-4", high ? "border-critical/20 bg-critical-soft" : "bg-surface")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <AlertTriangle className={cn("h-5 w-5 shrink-0", high ? "text-critical" : "text-high")} />
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI Risk Assessment</div>
            <div className={cn("font-bold", high ? "text-critical" : "text-foreground")}>{riskLabel(p.risk)}</div>
          </div>
        </div>
        <div className={cn("text-3xl font-extrabold", high ? "text-critical" : "text-foreground")}>{p.risk}%</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={p.risk} aria-valuemin={0} aria-valuemax={100} aria-label="Simulated risk score">
        <div className={cn("h-full rounded-full", high ? "bg-critical" : "bg-high")} style={{ width: `${p.risk}%` }} />
      </div>
      {showFactors && (
        <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
          {p.riskFactors.map((f) => (
            <li key={f} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-critical" />{f}</li>
          ))}
        </ul>
      )}
      <div className="mt-3"><DemoNote>Simulated AI risk estimate for demonstration — not a validated clinical prediction.</DemoNote></div>
    </div>
  );
}

export function ActionsList({ p }: { p: Patient }) {
  return (
    <div className="rounded-xl border border-stable/20 bg-stable-soft p-4">
      <div className="mb-2 flex items-center gap-2 font-bold"><ShieldCheck className="h-5 w-5 text-stable" />Recommended Actions</div>
      <ol className="space-y-1.5 text-sm">
        {p.actions.map((a, i) => (
          <li key={a} className="flex items-center gap-2.5">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-stable/15 text-[11px] font-bold text-stable">{i + 1}</span>
            {a}
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <DemoNote>Example suggestions — clinician judgment decides.</DemoNote>
        <AlertCareTeam p={p} />
      </div>
    </div>
  );
}

export function AlertCareTeam({ p }: { p: Patient }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive"><AlertTriangle className="h-4 w-4" />Alert Care Team</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Alert care team for {p.id}?</AlertDialogTitle>
          <AlertDialogDescription>
            This is a demo prototype. No real hospital staff will be notified — the action is only simulated.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => toast.success(`Demo alert raised for ${p.id}`, { description: "Simulated only — no message was sent." })}>
            Send demo alert
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
