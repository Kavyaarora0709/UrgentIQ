import { createFileRoute, Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/MarketingPrimitives";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — UrgentIQ" },
      {
        name: "description",
        content: "Draft privacy notice and prototype data handling disclosure for UrgentIQ.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Governance & Legal"
        title="Privacy Policy"
        description="Draft prototype privacy notice. Formal legal policy wording is pending approval prior to public launch."
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-soft p-4 text-sm">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-muted-foreground">
              <strong className="text-foreground">Pending Launch Review:</strong> This page is a
              placeholder summary for the UrgentIQ prototype and does not constitute a final
              approved privacy policy for production clinical use.
            </p>
          </div>

          <div className="card-surface space-y-5 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
            <div>
              <h2 className="text-lg font-bold text-foreground">1. No Real Patient Data</h2>
              <p className="mt-1.5">
                Public pages and dashboard previews on this site use fictional, simulated patient
                records. No real patient health information is stored, displayed, or processed on
                the public marketing site.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">2. Demo Request Placeholder Form</h2>
              <p className="mt-1.5">
                The <Link to="/contact" className="font-semibold text-primary hover:underline">Request a Demo</Link>{" "}
                page currently operates strictly as a client-side placeholder and does not transmit
                submitted form fields to an external server or CRM.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">3. Prototype Session Storage</h2>
              <p className="mt-1.5">
                The demonstration dashboard stores temporary prototype session state (such as demo
                preferences and session notes) locally in browser session storage for demonstration
                only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

