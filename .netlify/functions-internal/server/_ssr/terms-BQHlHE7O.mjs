import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as Info } from "../_libs/lucide-react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as PageHero, r as MarketingLayout } from "./MarketingPrimitives-DgiF3yjP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-BQHlHE7O.js
var import_jsx_runtime = require_jsx_runtime();
function TermsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Governance & Legal",
		title: "Terms of Use",
		description: "Draft prototype terms of use. Final legal terms are pending confirmation prior to commercial launch."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-14 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-soft p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: "Pending Launch Review:"
					}), " These terms apply to the UrgentIQ prototype website and are subject to formal legal review before production hospital use."]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface space-y-5 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: "1. Informational & Demo Purpose"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5",
						children: "Content on this website is provided solely to introduce the UrgentIQ product concept and demonstrate prototype workflows. Nothing on this website constitutes medical advice, clinical guidance, or an offer of a certified medical device."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: "2. Prototype Capabilities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1.5",
						children: [
							"Features described on the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/platform",
								className: "font-semibold text-primary hover:underline",
								children: "Platform"
							}),
							" ",
							"page may represent either implemented prototype behaviour or planned development direction and are subject to change."
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: "3. Authorised Prototype Access"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5",
						children: "The authenticated dashboard is restricted to demonstration and authorised evaluation only and must not be used for real clinical care or patient triage decisions."
					})] })
				]
			})]
		})
	})] });
}
//#endregion
export { TermsPage as component };
