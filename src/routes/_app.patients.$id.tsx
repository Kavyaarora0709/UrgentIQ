import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPatient } from "@/lib/data";
import { PatientDetailView } from "@/components/urgent/PatientDetailView";

export const Route = createFileRoute("/_app/patients/$id")({
  loader: ({ params }) => {
    const p = getPatient(params.id);
    if (!p) throw notFound();
    return { patient: p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.patient ? `${loaderData.patient.id} · ${loaderData.patient.name}` : "Patient"} — UrgentIQ` },
      { name: "description", content: "Comprehensive patient clinical view, simulated AI triage risk, and vitals monitoring." },
    ],
  }),
  component: PatientByIdPage,
});

function PatientByIdPage() {
  const { patient } = Route.useLoaderData();
  return <PatientDetailView currentId={patient.id} />;
}
