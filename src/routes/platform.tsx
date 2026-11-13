import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, Cpu, Network, ShieldCheck } from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  CapabilityCard,
  PageHero,
  SectionHeading,
} from "@/components/marketing/MarketingPrimitives";
import { CORE_CAPABILITIES } from "@/components/marketing/marketing-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform Capabilities — UrgentIQ" },
      {
        name: "description",
        content:
          "Explore UrgentIQ's dynamic patient-prioritisation capabilities, implemented prototype features, and planned hospital integration roadmap.",
      },
      { property: "og:title", content: "Platform Capabilities — UrgentIQ" },
      {
        property: "og:description",
        content:
          "Continuous patient monitoring, deterioration indicators, dynamic risk scoring, and clinician-led priority queues.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PlatformPage,
});

const PROTOTYPE_FEATURES = [
  "Prioritised Emergency Department Queue with severity filtering and sorting",
  "Patient Detail Workspace with live simulated vitals (HR, SpO₂, BP, RR)",
  "1-, 5-, and 30-minute vital-sign trend charts for trajectory review",
  "Alert Feed with acknowledgement, resolution, and clinician note capture",
  "Smartwatch Vitals Lab with 5-minute baseline workflow and BLE heart-rate bridge",
];

const PLANNED_CAPABILITIES = [
  "Hospital EHR & triage system integration via standards-based APIs (e.g., HL7 FHIR)",
  "Multi-bed clinical telemetry ingestion beyond single-wearable prototype testing",
  "Clinically validated deterioration scoring models evaluated in prospective studies",
  "Enterprise single sign-on, role-based access control, and persistent audit trails",
  "Configurable hospital paging and escalation routing workflows",
];

function PlatformPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Platform Overview"
        title="A Continuous Prioritisation Layer for Emergency Care"
        description="UrgentIQ connects incoming vital signs and symptom context into a continuously updated priority view—designed to help clinical teams spot emerging deterioration sooner."
        actions={
          <>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-card font-semibold">
              <Link to="/how-it-works">See How It Works</Link>
            </Button>
          </>
        }
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Capabilities"
            title="Six Pillars of Dynamic Triage Visibility"
            description="Built around real emergency-department information needs—calm typography, clear severity cues, and trend-first clinical context."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CORE_CAPABILITIES.map((cap) => (
              <CapabilityCard key={cap.title} item={cap} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Honest Product Maturity"
            title="Implemented Prototype vs. Planned Capabilities"
            description="We distinguish clearly between what is built in the current demonstration prototype and what requires hospital integration and clinical validation."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="card-surface p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-md border border-stable/30 bg-stable-soft px-2.5 py-1 text-xs font-bold text-stable">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Currently Implemented in Prototype
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">
                Interactive Web Dashboard & Vitals Lab
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Available for walkthrough demonstrations using simulated patient cohorts and
                controlled smartwatch-vitals tests.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-foreground">
                {PROTOTYPE_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stable" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-bold text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Planned / Future Integration Direction
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">
                Hospital Deployment & Clinical Validation Path
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Architectural direction intended for collaborative pilots with emergency-care
                organisations—not yet deployed in live clinical production.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {PLANNED_CAPABILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-surface p-6">
              <Network className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Integration-Minded Layer</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Intended to complement existing hospital information systems through APIs rather
                than forcing clinicians to abandon core records.
              </p>
            </div>
            <div className="card-surface p-6">
              <Cpu className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Trend-First Risk Logic</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Focuses on multi-vital trajectories and deviations from baseline alongside clinical
                context instead of isolated readings.
              </p>
            </div>
            <div className="card-surface p-6">
              <ShieldCheck className="h-6 w-6 text-stable" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Human-in-the-Loop</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Designed to surface reassessment cues while keeping every care decision firmly with
                qualified physicians and nurses.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

