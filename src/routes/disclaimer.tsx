import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/MarketingPrimitives";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Product & Clinical Disclaimer — UrgentIQ" },
      {
        name: "description",
        content:
          "Important clinical safety, prototype status, and simulated data disclosures for UrgentIQ.",
      },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Clinical Safety Disclosure"
        title="Product & Clinical Disclaimer"
        description="Clear boundaries regarding UrgentIQ's intended decision-support role and current prototype status."
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-xl border border-critical/30 bg-critical-soft p-5 text-sm">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-critical" />
            <div>
              <p className="font-bold text-critical">Not a Certified Medical Device</p>
              <p className="mt-1 leading-relaxed text-foreground">
                UrgentIQ is currently an early-stage prototype designed for concept demonstration.
                It is not a clinically validated diagnostic tool, not a certified medical device,
                and must not be used to make real patient care or triage decisions.
              </p>
            </div>
          </div>

          <div className="card-surface space-y-5 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-stable" />
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Decision Support, Not Autonomous Diagnosis
                </h2>
                <p className="mt-1">
                  UrgentIQ is intended to support clinical judgement, not replace healthcare
                  professionals. Qualified clinicians remain solely responsible for patient
                  assessment, diagnosis, prioritisation, and treatment decisions. Alerts and risk
                  scores are visual prompts for review, not diagnoses.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground">Simulated & Test Data</h2>
              <p className="mt-1">
                All patient names, vital signs, queues, alerts, and AI risk estimates displayed in
                public previews and the prototype dashboard are simulated. Smartwatch heart-rate
                experiments in the prototype lab demonstrate data ingestion workflows only; a
                consumer smartwatch alone does not provide a clinically reliable assessment.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground">Validation Status</h2>
              <p className="mt-1">
                All product capabilities and clinical performance goals require formal clinical
                validation, institutional governance, and applicable regulatory approvals prior to
                any clinical deployment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

