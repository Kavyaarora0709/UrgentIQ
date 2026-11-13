import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, LogIn, Menu, ShieldCheck, X } from "lucide-react";
import { Logo } from "@/components/urgent/ui";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Platform", to: "/platform" as const },
  { label: "How It Works", to: "/how-it-works" as const },
  { label: "For Hospitals", to: "/" as const, hash: "who-we-help" },
  { label: "Pricing", to: "/" as const, hash: "pricing" },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function MarketingLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = useStore((s) => s.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSignedIn = mounted && Boolean(user);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" aria-label="UrgentIQ home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                {...("hash" in item && item.hash ? { hash: item.hash } : {})}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className: "bg-primary-soft font-semibold text-accent-foreground",
                }}
                activeOptions={{ exact: true, includeHash: Boolean("hash" in item && item.hash) }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Button asChild variant="outline" size="sm" className="h-9 px-3.5 font-semibold">
              <Link to={isSignedIn ? "/dashboard" : "/login"}>
                <LogIn className="h-4 w-4" />
                {isSignedIn ? "Open Dashboard" : "Login"}
              </Link>
            </Button>
            <Button asChild size="sm" className="h-9 px-4 font-semibold">
              <Link to="/contact">
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-marketing-nav"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          id="mobile-marketing-nav"
          className={cn(
            "border-t border-border bg-card px-4 py-4 lg:hidden",
            mobileOpen ? "block" : "hidden",
          )}
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                {...("hash" in item && item.hash ? { hash: item.hash } : {})}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-border pt-4">
            <Button asChild variant="outline" className="w-full font-semibold">
              <Link to={isSignedIn ? "/dashboard" : "/login"} onClick={() => setMobileOpen(false)}>
                {isSignedIn ? "Dashboard" : "Login"}
              </Link>
            </Button>
            <Button asChild className="w-full font-semibold">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                Request a Demo
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link to="/" aria-label="UrgentIQ home" className="inline-block">
                <Logo />
              </Link>
              <p className="text-sm leading-relaxed text-muted-foreground">
                An AI-assisted dynamic triage and patient-prioritisation platform designed to help
                emergency departments keep patient priority aligned with changing conditions.
              </p>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                Clinical decision-support prototype
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Platform
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/platform" className="text-muted-foreground hover:text-primary">
                    Platform Capabilities
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-muted-foreground hover:text-primary">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    hash="who-we-help"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Who We Help
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    hash="pricing"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Planned Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-muted-foreground hover:text-primary">
                    Dashboard Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Organisation
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary">
                    About UrgentIQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary">
                    Request a Demo
                  </Link>
                </li>
                <li className="pt-1 text-xs leading-relaxed text-muted-foreground">
                  Hospital demo inquiries:{" "}
                  <a
                    href="mailto:kavyaa037@gmail.com?subject=UrgentIQ%20Demo%20Request"
                    className="font-semibold text-primary hover:underline"
                  >
                    Open Email App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Governance & Legal
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-muted-foreground hover:text-primary">
                    Product Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} UrgentIQ. Early-stage healthcare technology venture.</p>
            <p>
              Prototype demonstration only · Simulated patient data · Not a certified medical device.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

