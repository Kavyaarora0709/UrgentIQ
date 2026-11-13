import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as Info } from "../_libs/lucide-react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as PageHero, r as MarketingLayout } from "./MarketingPrimitives-DgiF3yjP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-Dex9pAVo.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Governance & Legal",
		title: "Privacy Policy",
		description: "Draft prototype privacy notice. Formal legal policy wording is pending approval prior to public launch."
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
					}), " This page is a placeholder summary for the UrgentIQ prototype and does not constitute a final approved privacy policy for production clinical use."]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface space-y-5 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: "1. No Real Patient Data"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5",
						children: "Public pages and dashboard previews on this site use fictional, simulated patient records. No real patient health information is stored, displayed, or processed on the public marketing site."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: "2. Demo Request Placeholder Form"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1.5",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "font-semibold text-primary hover:underline",
								children: "Request a Demo"
							}),
							" ",
							"page currently operates strictly as a client-side placeholder and does not transmit submitted form fields to an external server or CRM."
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: "3. Prototype Session Storage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5",
						children: "The demonstration dashboard stores temporary prototype session state (such as demo preferences and session notes) locally in browser session storage for demonstration only."
					})] })
				]
			})]
		})
	})] });
}
//#endregion
export { PrivacyPage as component };
