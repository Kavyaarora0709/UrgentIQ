import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Check,
  ClipboardCopy,
  Info,
  Mail,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { z } from "zod";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/MarketingPrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const DEMO_CONTACT_EMAIL = "kavyaa037@gmail.com";

const PRELISTED_MESSAGES = [
  {
    id: "ed-demo",
    label: "ED Demo Walkthrough",
    text: "Hello UrgentIQ team,\n\nI would like to request a demonstration of the UrgentIQ dynamic triage and patient-prioritisation platform for our emergency department. We are interested in seeing how continuous monitoring, deterioration alerts, and priority queue updates support clinicians during busy shifts, as well as discussing the fixed band-rental and software + per-patient pricing models.",
  },
  {
    id: "pilot-hardware",
    label: "Pilot & Band Rental",
    text: "Hello UrgentIQ team,\n\nOur hospital is evaluating continuous monitoring for patients waiting in our emergency care bay. Could we schedule a walkthrough of the UrgentIQ dashboard and discuss monitoring band configurations, security deposit terms, and potential pilot timelines?",
  },
  {
    id: "technical-review",
    label: "Technical & Integration",
    text: "Hello UrgentIQ team,\n\nWe would like to arrange a technical walkthrough for our clinical operations and IT teams to review the UrgentIQ dashboard workflow, wearable vitals prototype, and planned hospital integration roadmap.",
  },
] as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Request a Demo — UrgentIQ" },
      {
        name: "description",
        content:
          "Prepare and send a demo request for your hospital or emergency department team using your default email client.",
      },
      { property: "og:title", content: "Request a Demo — UrgentIQ" },
      {
        property: "og:description",
        content: "Connect with UrgentIQ to preview the dynamic triage dashboard workflow.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

const demoRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  workEmail: z.string().trim().email("Please enter a valid work email address").max(120),
  organisation: z
    .string()
    .trim()
    .min(2, "Please enter your hospital or organisation name")
    .max(150),
  designation: z.string().trim().min(2, "Please enter your role or designation").max(100),
  message: z
    .string()
    .trim()
    .min(10, "Please share a brief note about your workflow or demo goals")
    .max(1500),
});

type DemoFormValues = z.infer<typeof demoRequestSchema>;

const INITIAL_FORM: DemoFormValues = {
  name: "",
  workEmail: "",
  organisation: "",
  designation: "",
  message: PRELISTED_MESSAGES[0].text,
};

function buildMailtoHref(data: Partial<DemoFormValues>) {
  const subject = data.organisation
    ? `UrgentIQ Demo Request — ${data.organisation}`
    : "UrgentIQ Demo Request";
  const bodyLines = [
    data.message || PRELISTED_MESSAGES[0].text,
    "",
    "---",
    `Name: ${data.name || "[Your Name]"}`,
    `Work Email: ${data.workEmail || "[Your Work Email]"}`,
    `Hospital / Organisation: ${data.organisation || "[Hospital / Organisation]"}`,
    `Designation: ${data.designation || "[Designation]"}`,
  ];
  return `mailto:${DEMO_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function ContactPage() {
  const [form, setForm] = useState<DemoFormValues>(INITIAL_FORM);
  const [activePreset, setActivePreset] = useState<string>(PRELISTED_MESSAGES[0].id);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<DemoFormValues | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = demoRequestSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string") nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      setSubmitted(null);
      return;
    }
    setErrors({});
    setSubmitted(parsed.data);
    setCopied(false);

    if (typeof window !== "undefined") {
      try {
        window.location.href = buildMailtoHref(parsed.data);
      } catch {
        // Safe fallback in environments where location setter is restricted
      }
    }
  };

  const handleCopy = async () => {
    if (!submitted) return;
    const summary = [
      `Subject: UrgentIQ Demo Request — ${submitted.organisation}`,
      "",
      submitted.message,
      "",
      "---",
      `Name: ${submitted.name}`,
      `Work Email: ${submitted.workEmail}`,
      `Hospital / Organisation: ${submitted.organisation}`,
      `Designation: ${submitted.designation}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setActivePreset(PRELISTED_MESSAGES[0].id);
    setErrors({});
    setSubmitted(null);
    setCopied(false);
  };

  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Request a Demo"
        title="See How UrgentIQ Approaches Dynamic Triage"
        description="Select a pre-written message or customise your note below to send an email demo request from your default mail client."
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:px-8">
          <div className="card-surface p-6 sm:p-8">
            <div
              role="note"
              className="mb-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-soft p-4 text-sm"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-bold text-foreground">
                  Direct Email Client Dispatch — No Backend Connection
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  This demo request runs client-side with no intermediary backend server.
                  Submitting validates your details and opens your default email client with your
                  selected message and details ready to send.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="space-y-5" aria-live="polite">
                <div className="rounded-xl border border-primary/25 bg-primary-soft p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-accent-foreground">
                    <Info className="h-4 w-4 shrink-0 text-primary" />
                    Default Email Client Opened
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Your default mail application has been launched with your request pre-filled.
                    Please hit send in your email client to complete your request. If your mail
                    app did not open automatically, click the button below or copy the message text.
                  </p>
                </div>

                <dl className="grid gap-3 rounded-xl border border-border bg-surface p-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-muted-foreground">Name</dt>
                    <dd className="mt-0.5 font-semibold text-foreground">{submitted.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-muted-foreground">
                      Work Email
                    </dt>
                    <dd className="mt-0.5 font-semibold text-foreground">
                      {submitted.workEmail}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-muted-foreground">
                      Hospital / Organisation
                    </dt>
                    <dd className="mt-0.5 font-semibold text-foreground">
                      {submitted.organisation}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-muted-foreground">
                      Designation
                    </dt>
                    <dd className="mt-0.5 font-semibold text-foreground">
                      {submitted.designation}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase text-muted-foreground">
                      Message
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap text-foreground">
                      {submitted.message}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-3">
                  <Button asChild className="font-semibold">
                    <a href={buildMailtoHref(submitted)}>
                      <Mail className="h-4 w-4" />
                      Open Email App Again
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopy}
                    className="font-semibold"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" /> Copied Message
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="h-4 w-4" /> Copy Email Text
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleReset}
                    className="font-semibold"
                  >
                    <RotateCcw className="h-4 w-4" /> Edit / Send Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Dr. A. Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      aria-invalid={!!errors["name"]}
                    />
                    {errors["name"] && (
                      <p className="text-xs text-critical">{errors["name"]}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">Work Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="name@hospital.org"
                      value={form.workEmail}
                      onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                      aria-invalid={!!errors["workEmail"]}
                    />
                    {errors["workEmail"] && (
                      <p className="text-xs text-critical">{errors["workEmail"]}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-org">Hospital / Organisation</Label>
                    <Input
                      id="contact-org"
                      placeholder="City General Hospital"
                      value={form.organisation}
                      onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                      aria-invalid={!!errors["organisation"]}
                    />
                    {errors["organisation"] && (
                      <p className="text-xs text-critical">{errors["organisation"]}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-designation">Designation</Label>
                    <Input
                      id="contact-designation"
                      placeholder="ED Lead, Nursing Supervisor, Admin"
                      value={form.designation}
                      onChange={(e) => setForm({ ...form, designation: e.target.value })}
                      aria-invalid={!!errors["designation"]}
                    />
                    {errors["designation"] && (
                      <p className="text-xs text-critical">{errors["designation"]}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <span className="text-xs text-muted-foreground">
                      Pre-listed templates (editable):
                    </span>
                  </div>
                  <div
                    className="flex flex-wrap gap-1.5"
                    role="group"
                    aria-label="Pre-listed message templates"
                  >
                    {PRELISTED_MESSAGES.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setActivePreset(preset.id);
                          setForm({ ...form, message: preset.text });
                        }}
                        className={cn(
                          "rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer",
                          activePreset === preset.id
                            ? "border-primary bg-primary-soft text-accent-foreground"
                            : "border-border bg-surface text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => {
                      setActivePreset("custom");
                      setForm({ ...form, message: e.target.value });
                    }}
                    aria-invalid={!!errors["message"]}
                  />
                  {errors["message"] && (
                    <p className="text-xs text-critical">{errors["message"]}</p>
                  )}
                </div>

                <div className="pt-1">
                  <Button type="submit" size="lg" className="w-full font-semibold sm:w-auto">
                    Send
                  </Button>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Submitting launches your device&apos;s default email client with your message pre-filled.
                  Send the email from there directly — no backend or server connection is required.
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-foreground">What a Demo Covers</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Live walkthrough of the prioritised ER queue and simulated patient detail view.
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  How vital-sign trends and deterioration cues are surfaced to clinicians.
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Overview of the Smartwatch Vitals Lab prototype and pricing models.
                </li>
              </ul>
            </div>

            <div className="card-surface space-y-3 p-6">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <ShieldCheck className="h-4 w-4 text-stable" />
                Direct Email Dispatch
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Demo requests launch directly in your default email application with zero
                intermediary servers or third-party storage. Existing team members can sign in to
                access the prototype dashboard.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full font-semibold">
                <Link to="/login">Go to Dashboard Login</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </MarketingLayout>
  );
}
