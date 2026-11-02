import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Clock,
  FileText,
  Send,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  getPatient,
  patients,
  vitalsTrend,
  type Patient,
} from "@/lib/data";
import {
  ActionsList,
  Card,
  DemoNote,
  RiskCard,
  SeverityBadge,
  sevStyles,
  VitalCards,
} from "@/components/urgent/ui";
import { TrendChart } from "@/components/urgent/TrendChart";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addNote, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface PatientDetailViewProps {
  currentId?: string;
  onSelectPatient?: (id: string) => void;
}

export function PatientDetailView({ currentId = "P-1042" }: PatientDetailViewProps) {
  const patient = (getPatient(currentId) || patients[0]) as Patient;
  const allNotes = useStore((s) => s.notes);
  const notes = allNotes.filter((n) => n.patientId === patient.id);
  const user = useStore((s) => s.user);

  const [noteText, setNoteText] = useState("");
  const [trendWindow, setTrendWindow] = useState<1 | 5 | 30>(5);

  const trendData = vitalsTrend(patient, trendWindow);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNote(patient.id, noteText.trim(), user?.name || "Dr. Harleen Kaur");
    setNoteText("");
    toast.success("Clinician note saved", {
      description: `Note added to ${patient.id}'s record.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Patient Details</h1>
          <p className="text-muted-foreground">
            Full record for {patient.id} · {patient.name}
          </p>
        </div>
        <DemoNote>All patient data is simulated for demonstration.</DemoNote>
      </div>

      {/* Patient Switcher Chips */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Select patient">
        {patients.map((p) => {
          const isCurrent = p.id === patient.id;
          const s = sevStyles[p.severity];
          return (
            <Link
              key={p.id}
              to="/patients"
              search={{ id: p.id }}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-bold transition-all cursor-pointer",
                isCurrent
                  ? "border-primary bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/40"
                  : cn(s.soft, s.text, "border-transparent hover:border-border"),
              )}
            >
              {p.id}
            </Link>
          );
        })}
      </div>

      {/* Main Patient Overview Grid */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* Left Column: Clinical Summary, Vitals & Trends */}
        <div className="space-y-6">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-extrabold tracking-tight">{patient.id}</h2>
                  <SeverityBadge severity={patient.severity} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {patient.age} yrs · {patient.gender} | Arrived {patient.arrived} ({patient.wait} min ago)
                </p>
              </div>
              <div className="text-right text-sm">
                <span className="text-xs text-muted-foreground">Wait time</span>
                <div className="rounded-md bg-critical-soft px-2.5 py-1 font-extrabold text-critical">
                  {patient.wait} min
                </div>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-sm border-t pt-4">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-semibold text-foreground">{patient.name}</dd>
              <dt className="text-muted-foreground">Chief complaint</dt>
              <dd className="font-semibold text-foreground">{patient.complaint}</dd>
              <dt className="text-muted-foreground">Source</dt>
              <dd className="text-foreground">{patient.source}</dd>
              <dt className="text-muted-foreground">Medical History</dt>
              <dd className="text-muted-foreground">
                {patient.history && patient.history.length > 0 ? patient.history.join(" • ") : "None recorded"}
              </dd>
            </dl>

            <div className="mt-6 border-t pt-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" /> Live Vitals
                  <span className="text-xs font-normal text-muted-foreground">(simulated)</span>
                </h3>
              </div>
              <VitalCards p={patient} />
            </div>

            {/* Vitals Trend Section */}
            <div className="mt-6 rounded-xl border bg-surface p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Vitals Trend Analysis
                </div>
                <div className="flex items-center gap-1 rounded-lg border bg-card p-0.5 text-xs">
                  {([1, 5, 30] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setTrendWindow(m)}
                      className={cn(
                        "rounded px-2.5 py-1 font-semibold transition-colors cursor-pointer",
                        trendWindow === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {m === 1 ? "1 min" : m === 5 ? "5 min" : "30 min"}
                    </button>
                  ))}
                </div>
              </div>
              <TrendChart data={trendData} height={200} />
            </div>
          </Card>

          {/* AI Risk Assessment */}
          <RiskCard p={patient} showFactors={true} />
        </div>

        {/* Right Column: Timeline, Clinician Notes, Concerns & Actions */}
        <div className="space-y-6">
          {/* Patient Timeline */}
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-bold text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Patient Timeline
            </h3>
            <div className="relative ml-2 space-y-4 border-l-2 border-border pl-4">
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                <div className="text-xs font-bold text-foreground">{patient.arrived}</div>
                <div className="text-sm text-muted-foreground">Arrived via {patient.source}</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                <div className="text-xs font-bold text-foreground">+1 min</div>
                <div className="text-sm text-muted-foreground">Triage vitals recorded</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                <div className="text-xs font-bold text-foreground">+2 min</div>
                <div className="text-sm text-muted-foreground">
                  AI risk estimate: {patient.risk}% — {patient.severity.toUpperCase()}
                </div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-critical animate-pulse" />
                <div className="text-xs font-bold text-critical">Now</div>
                <div className="text-sm font-semibold text-foreground">Waiting for physician review</div>
              </div>
            </div>
          </Card>

          {/* Clinician Notes */}
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Clinician Notes
              </h3>
              <span className="text-xs text-muted-foreground">
                {notes.length} note{notes.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="space-y-2 mb-4 max-h-56 overflow-y-auto pr-1">
              {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">
                  No notes recorded yet. Add the first clinician note for {patient.id}.
                </p>
              ) : (
                notes.map((n) => (
                  <div key={n.id} className="rounded-lg border bg-surface p-3 text-sm">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span className="font-semibold text-foreground">{n.author}</span>
                      <span>{n.createdAt}</span>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{n.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSaveNote} className="space-y-2">
              <Textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                placeholder="Add clinician note, observations, or handover remarks…"
                className="text-sm"
              />
              <Button type="submit" size="sm" className="w-full gap-2 font-semibold">
                <Send className="h-3.5 w-3.5" /> Save Note
              </Button>
            </form>
          </Card>

          {/* Key Concerns & Recommended Actions */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-moderate-soft p-4">
              <div className="mb-2 flex items-center gap-2 font-bold">
                <Sparkles className="h-5 w-5 text-primary" />
                Key Concerns
              </div>
              <ul className="space-y-1.5 text-sm">
                {patient.concerns.map((c: string) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-critical" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ActionsList p={patient} />
          </div>
        </div>
      </div>
    </div>
  );
}
