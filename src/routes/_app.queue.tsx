import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { z } from "zod";
import { Card, DemoNote } from "@/components/urgent/ui";
import { PatientQueue } from "@/components/urgent/PatientQueue";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_app/queue")({
  validateSearch: z.object({ q: z.string().max(100).optional() }),
  head: () => ({
    meta: [
      { title: "Patient Queue — UrgentIQ" },
      { name: "description", content: "Prioritized emergency patient queue with severity filters and sorting." },
      { property: "og:title", content: "Patient Queue — UrgentIQ" },
      { property: "og:description", content: "Prioritized emergency patient queue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Queue,
});

function Queue() {
  const { q } = Route.useSearch();
  const [search, setSearch] = useState(q ?? "");
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Patient Queue</h1>
        <p className="text-muted-foreground">All patients currently in the emergency department, most urgent first.</p>
      </div>
      <Card>
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input key={q} defaultValue={q} onChange={(e) => setSearch(e.target.value)} placeholder="Filter by patient ID, name or symptoms" className="pl-9" aria-label="Filter patients" />
        </div>
        <PatientQueue search={search} />
        <div className="mt-4"><DemoNote>Simulated patients for demonstration — no real patient data.</DemoNote></div>
      </Card>
    </div>
  );
}
