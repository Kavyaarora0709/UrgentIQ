import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Do8M3rUj.js
var $$splitComponentImporter = () => import("./contact-NpO8900U.mjs");
var DEMO_CONTACT_EMAIL = "kavyaa037@gmail.com";
var Route = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Request a Demo — UrgentIQ" },
		{
			name: "description",
			content: "Prepare and send a demo request for your hospital or emergency department team using your default email client."
		},
		{
			property: "og:title",
			content: "Request a Demo — UrgentIQ"
		},
		{
			property: "og:description",
			content: "Connect with UrgentIQ to preview the dynamic triage dashboard workflow."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
objectType({
	name: stringType().trim().min(2, "Please enter your full name").max(100),
	workEmail: stringType().trim().email("Please enter a valid work email address").max(120),
	organisation: stringType().trim().min(2, "Please enter your hospital or organisation name").max(150),
	designation: stringType().trim().min(2, "Please enter your role or designation").max(100),
	message: stringType().trim().min(10, "Please share a brief note about your workflow or demo goals").max(1500)
});
//#endregion
export { Route as n, DEMO_CONTACT_EMAIL as t };
