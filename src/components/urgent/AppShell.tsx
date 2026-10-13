import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, Bell, ChevronDown, ClipboardList, Home, LogOut, Search, Settings, Users } from "lucide-react";
import { Logo } from "./ui";
import { useStore } from "@/lib/store";
import { signOut } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nav = [
  { to: "/dashboard", label: "Emergency Dashboard", icon: Home },
  { to: "/queue", label: "Patient Queue", icon: Users },
  { to: "/patients", label: "Patient Details", icon: ClipboardList },
  { to: "/alerts", label: "Alerts", icon: Bell, badge: true },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  return (
    <div className="hidden text-right lg:block">
      <div className="text-xs text-muted-foreground">{now.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</div>
      <div className="text-sm font-bold">{now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const user = useStore((s) => s.user);
  const openAlerts = useStore((s) => s.alerts.filter((a) => !a.acknowledged && !a.resolved).length);
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const logout = () => {
    signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b bg-card/95 px-4 py-3 backdrop-blur md:px-6">
        <Link to="/dashboard"><Logo /></Link>
        <form
          className="relative mx-auto w-full max-w-lg"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/queue", search: { q } });
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search patient by ID, name or symptoms…" className="h-10 rounded-full bg-surface pl-9" aria-label="Search patients" />
        </form>
        <div className="flex items-center gap-4">
          <Clock />
          <Link to="/alerts" className="relative rounded-full p-2 hover:bg-accent" aria-label={`Alerts, ${openAlerts} open`}>
            <Bell className="h-5 w-5" />
            {openAlerts > 0 && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-critical" />}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-accent">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{user?.initials}</span>
              <span className="hidden text-left leading-tight md:block">
                <span className="block text-sm font-bold">{user?.name}</span>
                <span className="block text-xs text-muted-foreground">{user?.role}</span>
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>{user?.name}</div>
                <div className="text-xs font-normal text-muted-foreground">{user?.hospital}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}><Settings className="h-4 w-4" />Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-critical"><LogOut className="h-4 w-4" />Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-60 shrink-0 border-r bg-sidebar p-3 md:block">
          <nav className="space-y-1">
            {nav.map(({ to, label, icon: Icon, ...rest }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 rounded-lg border-l-4 border-transparent px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent"
                activeProps={{ className: "border-l-primary bg-sidebar-accent font-semibold text-sidebar-accent-foreground" }}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{label}</span>
                {"badge" in rest && openAlerts > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-critical px-1 text-[11px] font-bold text-primary-foreground">{openAlerts}</span>
                )}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 p-4 pb-24 md:p-6">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t bg-card md:hidden">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-0.5 py-2 text-[10px] text-muted-foreground" activeProps={{ className: "text-primary font-semibold" }}>
            <Icon className="h-5 w-5" />
            <span className="truncate">{label.split(" ").pop()}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
