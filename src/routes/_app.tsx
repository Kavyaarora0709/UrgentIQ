import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/urgent/AppShell";
import { getState, useStore } from "@/lib/store";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const user = useStore((s) => s.user);

  useEffect(() => {
    if (!getState().user) navigate({ to: "/" });
    else setReady(true);
  }, [navigate, user]);

  if (!ready || !user) return <div className="min-h-screen bg-background" />;
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
