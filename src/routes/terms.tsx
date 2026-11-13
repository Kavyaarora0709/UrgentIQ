import { createFileRoute, Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/MarketingPrimitives";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — UrgentIQ" },
      {
        name: "description",
        content: "Draft terms of use for the UrgentIQ public marketing website and prototype.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Governance & Legal"
        title="Terms of Use"
        description="Draft prototype terms of use. Final legal terms are pending confirmation prior to commercial launch."
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-soft p-4 text-sm">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-muted-foreground">
              <strong className="text-foreground">Pending Launch Review:</strong> These terms apply
              to the UrgentIQ prototype website and are subject to formal legal review before
              production hospital use.
            </p>
          </div>

          <div className="card-surface space-y-5 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
            <div>
              <h2 className="text-lg font-bold text-foreground">1. Informational & Demo Purpose</h2>
              <p className="mt-1.5">
                Content on this website is provided solely to introduce the UrgentIQ product concept
                and demonstrate prototype workflows. Nothing on this website constitutes medical
                advice, clinical guidance, or an offer of a certified medical device.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">2. Prototype Capabilities</h2>
              <p className="mt-1.5">
                Features described on the{" "}
                <Link to="/platform" className="font-semibold text-primary hover:underline">
                  Platform
                </Link>{" "}
                page may represent either implemented prototype behaviour or planned development
                direction and are subject to change.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">3. Authorised Prototype Access</h2>
              <p className="mt-1.5">
                The authenticated dashboard is restricted to demonstration and authorised evaluation
                only and must not be used for real clinical care or patient triage decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

