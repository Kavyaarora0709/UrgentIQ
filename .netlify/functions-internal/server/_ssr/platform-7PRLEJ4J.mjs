import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { O as Network, Y as Clock, _ as ShieldCheck, q as Cpu, tt as CircleCheck, vt as ArrowRight } from "../_libs/lucide-react.mjs";
import { d as Button } from "./ui-BZnIHQM-.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SectionHeading, i as PageHero, r as MarketingLayout, t as CapabilityCard } from "./MarketingPrimitives-DgiF3yjP.mjs";
import { n as CORE_CAPABILITIES } from "./marketing-data-BrMFZEGL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/platform-7PRLEJ4J.js
var import_jsx_runtime = require_jsx_runtime();
var PROTOTYPE_FEATURES = [
	"Prioritised Emergency Department Queue with severity filtering and sorting",
	"Patient Detail Workspace with live simulated vitals (HR, SpO₂, BP, RR)",
	"1-, 5-, and 30-minute vital-sign trend charts for trajectory review",
	"Alert Feed with acknowledgement, resolution, and clinician note capture",
	"Smartwatch Vitals Lab with 5-minute baseline workflow and BLE heart-rate bridge"
];
var PLANNED_CAPABILITIES = [
	"Hospital EHR & triage system integration via standards-based APIs (e.g., HL7 FHIR)",
	"Multi-bed clinical telemetry ingestion beyond single-wearable prototype testing",
	"Clinically validated deterioration scoring models evaluated in prospective studies",
	"Enterprise single sign-on, role-based access control, and persistent audit trails",
	"Configurable hospital paging and escalation routing workflows"
];
function PlatformPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Platform Overview",
			title: "A Continuous Prioritisation Layer for Emergency Care",
			description: "UrgentIQ connects incoming vital signs and symptom context into a continuously updated priority view—designed to help clinical teams spot emerging deterioration sooner.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				className: "font-semibold",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					children: ["Request a Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				size: "lg",
				className: "bg-card font-semibold",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/how-it-works",
					children: "See How It Works"
				})
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Core Capabilities",
					title: "Six Pillars of Dynamic Triage Visibility",
					description: "Built around real emergency-department information needs—calm typography, clear severity cues, and trend-first clinical context."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: CORE_CAPABILITIES.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapabilityCard, { item: cap }, cap.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Honest Product Maturity",
					title: "Implemented Prototype vs. Planned Capabilities",
					description: "We distinguish clearly between what is built in the current demonstration prototype and what requires hospital integration and clinical validation."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-md border border-stable/30 bg-stable-soft px-2.5 py-1 text-xs font-bold text-stable",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Currently Implemented in Prototype"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-xl font-bold text-foreground",
								children: "Interactive Web Dashboard & Vitals Lab"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: "Available for walkthrough demonstrations using simulated patient cohorts and controlled smartwatch-vitals tests."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-3 text-sm text-foreground",
								children: PROTOTYPE_FEATURES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-stable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
								}, item))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-bold text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-primary" }), "Planned / Future Integration Direction"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-xl font-bold text-foreground",
								children: "Hospital Deployment & Clinical Validation Path"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: "Architectural direction intended for collaborative pilots with emergency-care organisations—not yet deployed in live clinical production."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-3 text-sm text-muted-foreground",
								children: PLANNED_CAPABILITIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
								}, item))
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { className: "h-6 w-6 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-lg font-bold text-foreground",
									children: "Integration-Minded Layer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: "Intended to complement existing hospital information systems through APIs rather than forcing clinicians to abandon core records."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-6 w-6 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-lg font-bold text-foreground",
									children: "Trend-First Risk Logic"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: "Focuses on multi-vital trajectories and deviations from baseline alongside clinical context instead of isolated readings."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-stable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-lg font-bold text-foreground",
									children: "Human-in-the-Loop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: "Designed to surface reassessment cues while keeping every care decision firmly with qualified physicians and nurses."
								})
							]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { PlatformPage as component };
