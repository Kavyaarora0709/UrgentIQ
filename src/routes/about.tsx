import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero, SectionHeading } from "@/components/marketing/MarketingPrimitives";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About UrgentIQ — Dynamic Triage Decision Support" },
      {
        name: "description",
        content:
          "Learn about UrgentIQ's mission to help emergency departments detect changing patient risk between initial triage and definitive treatment.",
      },
      { property: "og:title", content: "About UrgentIQ" },
      {
        property: "og:description",
        content:
          "Healthcare technology venture focused on continuous patient-prioritisation workflows for emergency departments.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    icon: Stethoscope,
    title: "Clinical Judgement First",
    description:
      "Technology in emergency medicine must respect clinician expertise. UrgentIQ is designed to surface changing signals so physicians and nurses can act faster—never to override human care.",
  },
  {
    icon: Compass,
    title: "Focused Positioning",
    description:
      "Rather than replacing hospital EHRs, UrgentIQ focuses on one clear gap: keeping patient priority responsive between arrival triage and treatment.",
  },
  {
    icon: ShieldCheck,
    title: "Rigorous Honesty About Stage",
    description:
      "We clearly distinguish prototype capabilities from validated hospital deployments. Claims around clinical performance require evidence, governance, and formal validation.",
  },
  {
    icon: HeartHandshake,
    title: "Built With Hospital Teams in Mind",
    description:
      "Designed for medium-to-large urban hospitals, emergency-care centres, and clinical operations leaders seeking practical visibility into waiting-room acuity.",
  },
];

function AboutPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="About UrgentIQ"
        title="Making Changing Patient Risk Visible Before It Is Missed"
        description="UrgentIQ is an early-stage healthcare technology venture exploring how continuous physiological context and structured decision support can help emergency departments keep priority aligned with real-time patient need."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                Why We Started With Emergency Triage
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Emergency departments manage unpredictable arrivals with finite staff attention.
                Even when initial triage is performed carefully, it captures a single moment in
                time. When departments get busy, waiting intervals lengthen and subtle vital-sign
                changes can go unnoticed until the next manual check.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                UrgentIQ explores a continuous prioritisation layer that tracks changing trends,
                updates risk indicators, and highlights patients who may require reassessment
                sooner.
              </p>
            </div>

            <div className="card-surface space-y-4 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-foreground">Current Prototype Context</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                UrgentIQ is currently an active prototype featuring a web-based emergency department
                dashboard and a smartwatch-vitals testing lab. All patient records in the dashboard
                demonstration are fictional and simulated.
              </p>
              <div className="rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
                UrgentIQ is not currently a certified medical device, clinically validated
                diagnostic tool, or production hospital deployment. Any pilot or deployment path is
                subject to formal clinical evaluation, hospital security review, and applicable
                regulatory requirements.
              </div>
              <div className="pt-2">
                <Button asChild variant="outline" className="font-semibold">
                  <Link to="/disclaimer">Read Full Product Disclaimer</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Principles"
            title="How We Approach Healthcare Technology"
            description="Calm interfaces, transparent limits, and workflow-grounded design."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-surface flex items-start gap-4 p-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Interested in Exploring the UrgentIQ Prototype?
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Preview a demo request or sign in to inspect the prototype dashboard directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-card font-semibold">
              <Link to="/login">Dashboard Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

