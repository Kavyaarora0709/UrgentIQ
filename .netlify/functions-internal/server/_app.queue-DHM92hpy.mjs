import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Search } from "./_libs/lucide-react.mjs";
import { f as Card, p as DemoNote } from "./_ssr/ui-BZnIHQM-.mjs";
import { t as Input } from "./_ssr/input-lmt4JH1F.mjs";
import { t as PatientQueue } from "./_ssr/PatientQueue-wWuwmyJ8.mjs";
import { t as Route } from "./_app.queue-DHdl5lFe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.queue-DHM92hpy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Queue() {
	const { q } = Route.useSearch();
	const [search, setSearch] = (0, import_react.useState)(q ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-extrabold tracking-tight",
			children: "Patient Queue"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "All patients currently in the emergency department, most urgent first."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					defaultValue: q,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Filter by patient ID, name or symptoms",
					className: "pl-9",
					"aria-label": "Filter patients"
				}, q)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatientQueue, { search }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "Simulated patients for demonstration — no real patient data." })
			})
		] })]
	});
}
//#endregion
export { Queue as component };
