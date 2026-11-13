import { r as getPatient } from "./_ssr/data-C77HYp37.mjs";
import { K as notFound, _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.patients._id-Cd79GFQi.js
var $$splitComponentImporter = () => import("./_app.patients._id-h-v9p1A-.mjs");
var Route = createFileRoute("/_app/patients/$id")({
	loader: ({ params }) => {
		const p = getPatient(params.id);
		if (!p) throw notFound();
		return { patient: p };
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.patient ? `${loaderData.patient.id} · ${loaderData.patient.name}` : "Patient"} — UrgentIQ` }, {
		name: "description",
		content: "Comprehensive patient clinical view, simulated AI triage risk, and vitals monitoring."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
