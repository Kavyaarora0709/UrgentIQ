import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as HeartHandshake, J as Compass, _ as ShieldCheck, f as Stethoscope, vt as ArrowRight } from "../_libs/lucide-react.mjs";
import { d as Button } from "./ui-BZnIHQM-.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SectionHeading, i as PageHero, r as MarketingLayout } from "./MarketingPrimitives-DgiF3yjP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-mbesmMzQ.js
var import_jsx_runtime = require_jsx_runtime();
var PRINCIPLES = [
	{
		icon: Stethoscope,
		title: "Clinical Judgement First",
		description: "Technology in emergency medicine must respect clinician expertise. UrgentIQ is designed to surface changing signals so physicians and nurses can act faster—never to override human care."
	},
	{
		icon: Compass,
		title: "Focused Positioning",
		description: "Rather than replacing hospital EHRs, UrgentIQ focuses on one clear gap: keeping patient priority responsive between arrival triage and treatment."
	},
	{
		icon: ShieldCheck,
		title: "Rigorous Honesty About Stage",
		description: "We clearly distinguish prototype capabilities from validated hospital deployments. Claims around clinical performance require evidence, governance, and formal validation."
	},
	{
		icon: HeartHandshake,
		title: "Built With Hospital Teams in Mind",
		description: "Designed for medium-to-large urban hospitals, emergency-care centres, and clinical operations leaders seeking practical visibility into waiting-room acuity."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "About UrgentIQ",
			title: "Making Changing Patient Risk Visible Before It Is Missed",
			description: "UrgentIQ is an early-stage healthcare technology venture exploring how continuous physiological context and structured decision support can help emergency departments keep priority aligned with real-time patient need."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-extrabold tracking-tight text-foreground",
								children: "Why We Started With Emergency Triage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base leading-relaxed text-muted-foreground",
								children: "Emergency departments manage unpredictable arrivals with finite staff attention. Even when initial triage is performed carefully, it captures a single moment in time. When departments get busy, waiting intervals lengthen and subtle vital-sign changes can go unnoticed until the next manual check."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base leading-relaxed text-muted-foreground",
								children: "UrgentIQ explores a continuous prioritisation layer that tracks changing trends, updates risk indicators, and highlights patients who may require reassessment sooner."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface space-y-4 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold text-foreground",
								children: "Current Prototype Context"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: "UrgentIQ is currently an active prototype featuring a web-based emergency department dashboard and a smartwatch-vitals testing lab. All patient records in the dashboard demonstration are fictional and simulated."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground",
								children: "UrgentIQ is not currently a certified medical device, clinically validated diagnostic tool, or production hospital deployment. Any pilot or deployment path is subject to formal clinical evaluation, hospital security review, and applicable regulatory requirements."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									className: "font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/disclaimer",
										children: "Read Full Product Disclaimer"
									})
								})
							})
						]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Our Principles",
					title: "How We Approach Healthcare Technology",
					description: "Calm interfaces, transparent limits, and workflow-grounded design."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-2",
					children: PRINCIPLES.map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface flex items-start gap-4 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-foreground",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: item.description
							})] })]
						}, item.title);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold tracking-tight text-foreground",
						children: "Interested in Exploring the UrgentIQ Prototype?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base text-muted-foreground",
						children: "Preview a demo request or sign in to inspect the prototype dashboard directly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
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
								to: "/login",
								children: "Dashboard Login"
							})
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
