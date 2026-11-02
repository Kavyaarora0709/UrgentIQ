import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PatientDetailView } from "@/components/urgent/PatientDetailView";

export const Route = createFileRoute("/_app/patients/")({
  validateSearch: z.object({
    id: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Patient Details — UrgentIQ" },
      { name: "description", content: "Comprehensive patient clinical view, simulated AI triage risk, and vitals monitoring." },
    ],
  }),
  component: PatientsIndexPage,
});

function PatientsIndexPage() {
  const { id } = Route.useSearch();
  return <PatientDetailView currentId={id || "P-1042"} />;
}
