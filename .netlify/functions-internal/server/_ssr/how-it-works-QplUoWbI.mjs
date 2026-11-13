import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as Info, i as Watch, vt as ArrowRight } from "../_libs/lucide-react.mjs";
import { d as Button, v as cn } from "./ui-BZnIHQM-.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SectionHeading, i as PageHero, r as MarketingLayout } from "./MarketingPrimitives-DgiF3yjP.mjs";
import { i as WORKFLOW_STEPS } from "./marketing-data-BrMFZEGL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-QplUoWbI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ILLUSTRATIVE_STAGES = [
	{
		time: "10:00 AM · Intake",
		label: "Initial Snapshot",
		hr: "84 bpm",
		spo2: "98%",
		rr: "16 /min",
		status: "Moderate Priority",
		tone: "border-moderate/30 bg-moderate-soft text-moderate",
		note: "Simulated intake reading places patient in standard queue."
	},
	{
		time: "10:15 AM · Waiting",
		label: "Early Drift",
		hr: "98 bpm",
		spo2: "95%",
		rr: "20 /min",
		status: "Trend Watch",
		tone: "border-high/30 bg-high-soft text-high",
		note: "Upward heart-rate drift and declining SpO₂ begin emerging across consecutive intervals."
	},
	{
		time: "10:25 AM · Re-evaluated",
		label: "Escalated Priority",
		hr: "112 bpm",
		spo2: "92%",
		rr: "24 /min",
		status: "High / Critical Cue",
		tone: "border-critical/30 bg-critical-soft text-critical",
		note: "UrgentIQ surfaces a reassessment cue so clinical staff can review the patient promptly."
	}
];
function HowItWorksPage() {
	const [stageIdx, setStageIdx] = (0, import_react.useState)(2);
	const activeStage = ILLUSTRATIVE_STAGES[stageIdx] ?? ILLUSTRATIVE_STAGES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Clinical Workflow",
			title: "How UrgentIQ Keeps Priority Responsive to New Information",
			description: "UrgentIQ connects continuous observation with clear clinical signalling—moving from static intake snapshots to a priority view that adapts as patient conditions evolve.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				className: "font-semibold",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					children: ["Request a Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Step-by-Step Pipeline",
					title: "Five Stages From Data Ingestion to Clinician Review",
					description: "Designed to keep signal clarity high and cognitive load low during busy emergency shifts."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 space-y-4",
					children: WORKFLOW_STEPS.map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-extrabold tracking-widest text-primary",
									children: item.step
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-foreground",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted-foreground",
									children: item.description
								})]
							})]
						}, item.step);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Illustrative Example",
					title: "Why Trend Context Matters While Patients Wait",
					description: "Step through this fictional simulated timeline to see how dynamic prioritisation responds when vitals begin shifting."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-10 max-w-4xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-6 sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							role: "tablist",
							"aria-label": "Simulated timeline stages",
							children: ILLUSTRATIVE_STAGES.map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "tab",
								"aria-selected": stageIdx === i,
								onClick: () => setStageIdx(i),
								className: cn("rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer", stageIdx === i ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-foreground hover:bg-accent"),
								children: stage.time
							}, stage.time))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 rounded-xl border border-border bg-surface p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
											children: activeStage.time
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded-md border px-2 py-0.5 text-xs font-bold", activeStage.tone),
											children: activeStage.status
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground",
										children: activeStage.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted-foreground",
										children: activeStage.note
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-medium text-muted-foreground",
											children: "Heart Rate"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 text-xl font-extrabold text-foreground",
											children: activeStage.hr
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-medium text-muted-foreground",
											children: "SpO₂"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 text-xl font-extrabold text-foreground",
											children: activeStage.spo2
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-medium text-muted-foreground",
											children: "Resp. Rate"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 text-xl font-extrabold text-foreground",
											children: activeStage.rr
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-3 flex items-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" }), "Illustrative fictional values only. Clinicians independently verify readings and decide next steps."]
									})
								]
							})]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Watch, { className: "h-4 w-4" }), "Prototype Sensor Exploration"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-bold text-foreground",
								children: "Smartwatch-Vitals Demonstration Workflow"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: "Inside the authenticated prototype, the Smartwatch Vitals Lab demonstrates a 5-minute baseline recording and Bluetooth Low Energy heart-rate comparison workflow. It explores continuous data ingestion concepts only—a smartwatch alone does not provide a clinically reliable assessment."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Sign In to Prototype"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								children: "Request a Demo"
							})
						})]
					})]
				})
			})
		})
	] });
}
//#endregion
export { HowItWorksPage as component };
