import { _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.queue-DHdl5lFe.js
var $$splitComponentImporter = () => import("./_app.queue-DHM92hpy.mjs");
var Route = createFileRoute("/_app/queue")({
	validateSearch: objectType({ q: stringType().max(100).optional() }),
	head: () => ({ meta: [
		{ title: "Patient Queue — UrgentIQ" },
		{
			name: "description",
			content: "Prioritized emergency patient queue with severity filters and sorting."
		},
		{
			property: "og:title",
			content: "Patient Queue — UrgentIQ"
		},
		{
			property: "og:description",
			content: "Prioritized emergency patient queue."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
