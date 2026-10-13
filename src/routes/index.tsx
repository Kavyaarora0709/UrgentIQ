import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, HeartPulse, Loader2, ShieldCheck, Stethoscope } from "lucide-react";
import { z } from "zod";
import { Logo } from "@/components/urgent/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_CREDENTIALS, HOSPITALS, signIn } from "@/lib/auth";
import { getState } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — UrgentIQ Emergency Care" },
      { name: "description", content: "Sign in to UrgentIQ, the AI-assisted emergency room triage dashboard prototype." },
      { property: "og:title", content: "Sign in — UrgentIQ Emergency Care" },
      { property: "og:description", content: "AI-assisted ER triage and patient monitoring prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const schema = z.object({
  hospital: z.string().trim().min(1, "Please select your hospital").max(120),
  username: z.string().trim().min(1, "Username is required").max(60),
  password: z.string().min(1, "Password is required").max(100),
});

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ hospital: "", username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getState().user) navigate({ to: "/dashboard" });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await signIn(r.data.hospital, r.data.username, r.data.password);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setAuthError((err as Error).message);
      setLoading(false);
    }
  };

  const field = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value }),
    "aria-invalid": !!errors[k],
  });

  return (
    <div className="grid min-h-screen bg-brand-gradient lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <Logo size="lg" />
        <div className="relative z-10 max-w-md">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">AI-Powered Emergency Care</p>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">Every second matters. Every patient counts.</h1>
          <p className="mt-5 text-muted-foreground">Real-time prioritization that helps clinicians spot the most urgent patients first.</p>
          <div className="mt-8 flex gap-6 text-sm font-medium">
            <span className="flex items-center gap-2"><HeartPulse className="h-5 w-5 text-critical" />Live triage</span>
            <span className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary" />Clinician-led</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-stable" />Decision support</span>
          </div>
        </div>
        <svg viewBox="0 0 600 120" className="absolute bottom-24 left-0 w-full text-primary/15" aria-hidden>
          <path d="M0 60 H180 L200 60 L215 20 L235 100 L250 40 L262 60 H600" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
        <p className="text-xs text-muted-foreground">Academic prototype · not a clinically validated product</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 lg:hidden"><Logo /></div>
          <form onSubmit={submit} noValidate className="card-surface space-y-5 p-8">
            <div>
              <h2 className="text-2xl font-bold">Sign in</h2>
              <p className="text-sm text-muted-foreground">Access the emergency department dashboard.</p>
            </div>

            {authError && (
              <div role="alert" className="flex items-center gap-2 rounded-lg border border-critical/30 bg-critical-soft px-3 py-2 text-sm text-critical">
                <AlertCircle className="h-4 w-4 shrink-0" />{authError}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="hospital">Hospital</Label>
              <Input id="hospital" list="hospitals" placeholder="Search or select hospital" autoComplete="off" {...field("hospital")} />
              <datalist id="hospitals">{HOSPITALS.map((h) => <option key={h} value={h} />)}</datalist>
              {errors.hospital && <p className="text-xs text-critical">{errors.hospital}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" autoComplete="username" placeholder="Enter username" {...field("username")} />
              {errors.username && <p className="text-xs text-critical">{errors.username}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={show ? "text" : "password"} autoComplete="current-password" placeholder="Enter password" className="pr-10" {...field("password")} />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground" aria-label={show ? "Hide password" : "Show password"}>
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-critical">{errors.password}</p>}
            </div>

            <Button type="submit" className="h-11 w-full text-base" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Signing in…</> : "Sign In to Dashboard"}
            </Button>

            <div className="rounded-lg bg-primary-soft p-3 text-xs">
              <p className="mb-1 font-semibold text-accent-foreground">Demo login (prototype only)</p>
              <p className="text-muted-foreground">{DEMO_CREDENTIALS.hospital} · {DEMO_CREDENTIALS.username} · {DEMO_CREDENTIALS.password}</p>
            </div>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">Authorized healthcare personnel only.</p>
        </div>
      </div>
    </div>
  );
}
