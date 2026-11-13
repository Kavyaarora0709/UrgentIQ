import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Check,
  LogIn,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  CapabilityCard,
  Eyebrow,
  SectionHeading,
} from "@/components/marketing/MarketingPrimitives";
import { InteractiveProductPreview } from "@/components/marketing/DashboardPreview";
import { PricingSection } from "@/components/marketing/PricingSection";
import {
  AUDIENCES,
  CORE_CAPABILITIES,
  TRUST_PRINCIPLES,
  WORKFLOW_STEPS,
} from "@/components/marketing/marketing-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UrgentIQ — Dynamic Triage & Patient Prioritisation Platform" },
      {
        name: "description",
        content:
          "UrgentIQ is designed to help emergency departments identify changing patient risk, surface patients who may need reassessment, and support clinical teams with a continuously updated priority view.",
      },
      {
        property: "og:title",
        content: "UrgentIQ — Keep Patient Priority in Step With Changing Conditions",
      },
      {
        property: "og:description",
        content:
          "A continuous clinical decision-support layer between initial triage and definitive treatment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const PROBLEM_POINTS = [
  "Emergency department overcrowding stretches beds and waiting rooms.",
  "Limited staff attention is split across acute arrivals and waiting patients.",
  "Periodic manual checks leave blind spots between observations.",
  "Patients can deteriorate quietly while waiting for review.",
  "Static queues cannot dynamically reprioritise as conditions shift.",
];

const SOLUTION_POINTS = [
  "Continuously evaluates vitals and symptom trends over time.",
  "Updates risk indicators as new readings arrive from monitoring bands.",
  "Surfaces patients showing signs of deterioration toward the top of the queue.",
  "Supports clinicians with clear reassessment cues—never replacing clinical judgement.",
];

function HomePage() {
  return (
    <MarketingLayout>
      {/* Section 1: Hero */}
      <section className="border-b border-border bg-brand-gradient py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-8">
          <div className="space-y-5">
            <Eyebrow>
              <Activity className="h-3.5 w-3.5 text-primary" />
              Continuous Clinical Decision Support
            </Eyebrow>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Keep Patient Priority in Step With Changing Conditions.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              UrgentIQ is designed to help emergency departments identify changing patient risk,
              surface patients who may need reassessment, and support clinical teams with a
              continuously updated priority view.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild size="lg" className="h-11 px-6 text-base font-semibold">
                <Link to="/contact">
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 bg-card px-6 text-base font-semibold"
              >
                <Link to="/platform">Explore the Platform</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-stable" />
                Clinician-led decision support
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-primary" />
                Prototype preview (simulated data)
              </span>
            </div>
          </div>

          <figure className="card-surface overflow-hidden border border-border bg-card p-3 sm:p-4">
            <img
              src="/hero-ed-beds.jpg"
              alt="Illustration of emergency department beds where patients wait for doctors while multiple bedside alert indicators pulse simultaneously"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-3 px-1 text-xs text-muted-foreground">
              <span>
                When multiple waiting beds trigger alerts at once, teams need clear priority cues.
              </span>
              <a
                href="#product-preview"
                className="shrink-0 font-semibold text-primary hover:underline"
              >
                See preview ↓
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Section 2 & 3: Problem & Solution (Clean Paired Contrast) */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why UrgentIQ"
            title="Initial Triage Is a Snapshot. Patient Conditions Are Not."
            description="Existing systems collect clinical data. UrgentIQ turns changing patient information into an updated view of who needs attention next."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card-surface p-7 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-md bg-critical-soft px-2.5 py-1 text-xs font-bold text-critical">
                <AlertTriangle className="h-3.5 w-3.5" />
                The Problem
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">
                Waiting Rooms Outpace Static Triage
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {PROBLEM_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-critical" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface border-primary/35 p-7 sm:p-8">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-primary-soft px-2.5 py-1 text-xs font-bold text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                The UrgentIQ Solution
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">
                A Continuous Decision-Support Layer
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-foreground">
                {SOLUTION_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-stable" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="Five Steps From Incoming Data to Clinical Review"
          />

          <div className="relative mt-10">
            <div
              className="pointer-events-none absolute left-10 right-10 top-9 hidden h-0.5 bg-border lg:block"
              aria-hidden
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {WORKFLOW_STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="card-surface relative p-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-extrabold tracking-widest text-primary">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="mt-3.5 text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Product Preview (Single occurrence of live dashboard components) */}
      <section id="product-preview" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Product Preview"
            title="Inside the UrgentIQ Prototype Workspace"
            description="Interact with the prototype priority queue, vitals, risk assessment, and trend charts below using fictional simulated patient data."
          />

          <div className="mt-10">
            <InteractiveProductPreview />
          </div>
        </div>
      </section>

      {/* Section 6: Core Capabilities */}
      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Capabilities"
            title="Focused Tools for Emergency Care Teams"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CORE_CAPABILITIES.map((cap) => (
              <CapabilityCard key={cap.title} item={cap} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Who We Help */}
      <section id="who-we-help" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who We Help"
            title="Built for Clinicians, ED Managers, and Hospital Leaders"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {AUDIENCES.map((aud) => {
              const Icon = aud.icon;
              return (
                <article key={aud.title} className="card-surface flex flex-col p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {aud.subtitle}
                      </p>
                      <h3 className="text-base font-bold text-foreground">{aud.title}</h3>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {aud.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 8: Planned Pricing (2 Clear Models: Fixed vs Variable) */}
      <div className="border-y border-border bg-surface">
        <PricingSection />
      </div>

      {/* Section 9: Trust and Safety */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trust & Safety"
            title="Supports Clinical Judgement — Never Replaces It"
            description="UrgentIQ is a decision-support prototype. Claims around clinical performance are subject to formal validation."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PRINCIPLES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-surface p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-stable-soft text-stable">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3.5 text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 10: Final CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card-surface bg-brand-gradient px-6 py-12 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Make Every Patient's Changing Condition Visible.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Schedule a prototype walkthrough with your team or sign in to explore the dashboard.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-11 px-6 text-base font-semibold">
                <Link to="/contact">
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 bg-card px-6 text-base font-semibold"
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
