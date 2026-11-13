import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as ShieldCheck, l as TriangleAlert } from "../_libs/lucide-react.mjs";
import { i as PageHero, r as MarketingLayout } from "./MarketingPrimitives-DgiF3yjP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/disclaimer-B1uW0rm8.js
var import_jsx_runtime = require_jsx_runtime();
function DisclaimerPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Clinical Safety Disclosure",
		title: "Product & Clinical Disclaimer",
		description: "Clear boundaries regarding UrgentIQ's intended decision-support role and current prototype status."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-14 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-xl border border-critical/30 bg-critical-soft p-5 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-critical" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-bold text-critical",
					children: "Not a Certified Medical Device"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 leading-relaxed text-foreground",
					children: "UrgentIQ is currently an early-stage prototype designed for concept demonstration. It is not a clinically validated diagnostic tool, not a certified medical device, and must not be used to make real patient care or triage decisions."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface space-y-5 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-stable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-foreground",
							children: "Decision Support, Not Autonomous Diagnosis"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: "UrgentIQ is intended to support clinical judgement, not replace healthcare professionals. Qualified clinicians remain solely responsible for patient assessment, diagnosis, prioritisation, and treatment decisions. Alerts and risk scores are visual prompts for review, not diagnoses."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-bold text-foreground",
						children: "Simulated & Test Data"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "All patient names, vital signs, queues, alerts, and AI risk estimates displayed in public previews and the prototype dashboard are simulated. Smartwatch heart-rate experiments in the prototype lab demonstrate data ingestion workflows only; a consumer smartwatch alone does not provide a clinically reliable assessment."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-bold text-foreground",
						children: "Validation Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "All product capabilities and clinical performance goals require formal clinical validation, institutional governance, and applicable regulatory approvals prior to any clinical deployment."
					})] })
				]
			})]
		})
	})] });
}
//#endregion
export { DisclaimerPage as component };
