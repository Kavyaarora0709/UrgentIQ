import { _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.patients.index-CLpJ6DJ_.js
var $$splitComponentImporter = () => import("./_app.patients.index-DKIZrrod.mjs");
var Route = createFileRoute("/_app/patients/")({
	validateSearch: objectType({ id: stringType().optional() }),
	head: () => ({ meta: [{ title: "Patient Details — UrgentIQ" }, {
		name: "description",
		content: "Comprehensive patient clinical view, simulated AI triage risk, and vitals monitoring."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
