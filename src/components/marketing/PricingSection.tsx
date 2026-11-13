import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Info } from "lucide-react";
import { SectionHeading } from "@/components/marketing/MarketingPrimitives";
import { Button } from "@/components/ui/button";

const MODELS = [
  {
    name: "Model 1 · Band + Software Rental",
    badge: "Fixed Monthly",
    highlighted: false,
    price: "₹5,000–₹10,000",
    unit: "/ month per band",
    summary:
      "Fixed monthly pricing based on the number of monitoring bands deployed by your hospital—with UrgentIQ software included.",
    points: [
      "Compatible monitoring band + full UrgentIQ platform included",
      "Fixed monthly cost scaling directly with band count",
      "No per-patient usage charges",
      "Rate depends on selected band configuration",
      "₹10,000 refundable security deposit per hardware unit",
    ],
    cta: "Inquire About Fixed Rental",
  },
  {
    name: "Model 2 · Software + Per-Patient Usage",
    badge: "Base + Variable",
    highlighted: true,
    price: "₹50,000",
    unit: "/ month + ₹199 / patient",
    summary:
      "Monthly hospital software subscription with monitoring bands provided against a refundable security deposit and per-patient usage billing.",
    points: [
      "Includes live dashboard, dynamic risk scoring, alerts, trends & support",
      "Variable ₹199 fee per patient assessment processed via bands",
      "Monitoring bands issued against ₹10,000 refundable deposit per unit",
      "Deposit refundable within 12 months after return & inspection",
    ],
    cta: "Request Usage-Model Demo",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Planned Pricing"
          title="Two Simple Models for Hospitals"
          description="Choose predictable fixed per-band billing or a base software subscription with variable per-patient assessment usage."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {MODELS.map((model) => (
            <article
              key={model.name}
              className={
                model.highlighted
                  ? "card-surface flex flex-col justify-between border-primary/40 p-7 sm:p-8"
                  : "card-surface flex flex-col justify-between p-7 sm:p-8"
              }
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-foreground">{model.name}</h3>
                  <span
                    className={
                      model.highlighted
                        ? "rounded-full bg-primary-soft px-3 py-0.5 text-xs font-semibold text-accent-foreground"
                        : "rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-semibold text-muted-foreground"
                    }
                  >
                    {model.badge}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    {model.price}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">{model.unit}</span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {model.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm text-foreground">
                  {model.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-stable" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <Button
                  asChild
                  variant={model.highlighted ? "default" : "outline"}
                  className="w-full font-semibold"
                >
                  <Link to="/contact">
                    {model.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 shrink-0 text-primary" />
          Planned commercial models for hospital pilots. Security deposits are refundable within 12
          months subject to equipment return, inspection, and settlement of dues.
        </p>
      </div>
    </section>
  );
}
