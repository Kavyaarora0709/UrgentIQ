import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info, Watch } from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero, SectionHeading } from "@/components/marketing/MarketingPrimitives";
import { WORKFLOW_STEPS } from "@/components/marketing/marketing-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — UrgentIQ" },
      {
        name: "description",
        content:
          "See how UrgentIQ processes incoming vitals and symptoms into dynamic risk indicators, queue reprioritisation, and clinician review cues.",
      },
      { property: "og:title", content: "How It Works — UrgentIQ" },
      {
        property: "og:description",
        content: "From one-time intake snapshots to continuously updated emergency patient priority.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HowItWorksPage,
});

const ILLUSTRATIVE_STAGES = [
  {
    time: "10:00 AM · Intake",
    label: "Initial Snapshot",
    hr: "84 bpm",
    spo2: "98%",
    rr: "16 /min",
    status: "Moderate Priority",
    tone: "border-moderate/30 bg-moderate-soft text-moderate",
    note: "Simulated intake reading places patient in standard queue.",
  },
  {
    time: "10:15 AM · Waiting",
    label: "Early Drift",
    hr: "98 bpm",
    spo2: "95%",
    rr: "20 /min",
    status: "Trend Watch",
    tone: "border-high/30 bg-high-soft text-high",
    note: "Upward heart-rate drift and declining SpO₂ begin emerging across consecutive intervals.",
  },
  {
    time: "10:25 AM · Re-evaluated",
    label: "Escalated Priority",
    hr: "112 bpm",
    spo2: "92%",
    rr: "24 /min",
    status: "High / Critical Cue",
    tone: "border-critical/30 bg-critical-soft text-critical",
    note: "UrgentIQ surfaces a reassessment cue so clinical staff can review the patient promptly.",
  },
];

function HowItWorksPage() {
  const [stageIdx, setStageIdx] = useState(2);
  const activeStage = ILLUSTRATIVE_STAGES[stageIdx] ?? ILLUSTRATIVE_STAGES[0]!;

  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Clinical Workflow"
        title="How UrgentIQ Keeps Priority Responsive to New Information"
        description="UrgentIQ connects continuous observation with clear clinical signalling—moving from static intake snapshots to a priority view that adapts as patient conditions evolve."
        actions={
          <Button asChild size="lg" className="font-semibold">
            <Link to="/contact">
              Request a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Step-by-Step Pipeline"
            title="Five Stages From Data Ingestion to Clinician Review"
            description="Designed to keep signal clarity high and cognitive load low during busy emergency shifts."
          />

          <div className="mt-12 space-y-4">
            {WORKFLOW_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="card-surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-extrabold tracking-widest text-primary">
                      {item.step}
                    </span>
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Illustrative Example"
            title="Why Trend Context Matters While Patients Wait"
            description="Step through this fictional simulated timeline to see how dynamic prioritisation responds when vitals begin shifting."
          />

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="card-surface p-6 sm:p-8">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Simulated timeline stages">
                {ILLUSTRATIVE_STAGES.map((stage, i) => (
                  <button
                    key={stage.time}
                    type="button"
                    role="tab"
                    aria-selected={stageIdx === i}
                    onClick={() => setStageIdx(i)}
                    className={cn(
                      "rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer",
                      stageIdx === i
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-surface text-foreground hover:bg-accent",
                    )}
                  >
                    {stage.time}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="space-y-3 rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      {activeStage.time}
                    </span>
                    <span className={cn("rounded-md border px-2 py-0.5 text-xs font-bold", activeStage.tone)}>
                      {activeStage.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{activeStage.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{activeStage.note}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <div className="text-xs font-medium text-muted-foreground">Heart Rate</div>
                    <div className="mt-2 text-xl font-extrabold text-foreground">{activeStage.hr}</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <div className="text-xs font-medium text-muted-foreground">SpO₂</div>
                    <div className="mt-2 text-xl font-extrabold text-foreground">{activeStage.spo2}</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <div className="text-xs font-medium text-muted-foreground">Resp. Rate</div>
                    <div className="mt-2 text-xl font-extrabold text-foreground">{activeStage.rr}</div>
                  </div>
                  <div className="col-span-3 flex items-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    Illustrative fictional values only. Clinicians independently verify readings and
                    decide next steps.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card-surface flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Watch className="h-4 w-4" />
                Prototype Sensor Exploration
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Smartwatch-Vitals Demonstration Workflow
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Inside the authenticated prototype, the Smartwatch Vitals Lab demonstrates a
                5-minute baseline recording and Bluetooth Low Energy heart-rate comparison workflow.
                It explores continuous data ingestion concepts only—a smartwatch alone does not
                provide a clinically reliable assessment.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button asChild variant="outline" className="font-semibold">
                <Link to="/login">Sign In to Prototype</Link>
              </Button>
              <Button asChild className="font-semibold">
                <Link to="/contact">Request a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

