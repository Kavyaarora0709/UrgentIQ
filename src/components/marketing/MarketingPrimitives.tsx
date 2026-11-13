import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}

export interface CapabilityItem {
  icon: LucideIcon;
  title: string;
  description: string;
  status: "Prototype Implemented" | "Planned / Evolving";
  detail?: string;
}

export function CapabilityCard({
  item,
  compact = false,
}: {
  item: CapabilityItem;
  compact?: boolean;
}) {
  const Icon = item.icon;
  const isImplemented = item.status === "Prototype Implemented";
  return (
    <article className="card-surface flex h-full flex-col justify-between p-6 transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Icon className="h-5 w-5" />
          </div>
          {!compact && (
            <span
              className={cn(
                "rounded-md border px-2 py-0.5 text-[11px] font-semibold",
                isImplemented
                  ? "border-stable/30 bg-stable-soft text-stable"
                  : "border-border bg-surface text-muted-foreground",
              )}
            >
              {item.status}
            </span>
          )}
        </div>
        <h3 className="mt-4 text-base font-bold tracking-tight text-foreground">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
      {!compact && item.detail && (
        <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          {item.detail}
        </p>
      )}
    </article>
  );
}

export interface WorkflowStepItem {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-brand-gradient py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
          {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
        </div>
      </div>
    </section>
  );
}

