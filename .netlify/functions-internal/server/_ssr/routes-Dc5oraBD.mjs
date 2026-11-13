import { i as __toESM } from "../_runtime.mjs";
import { a as patients, c as vitalsTrend, i as initialAlerts, r as getPatient } from "./data-C77HYp37.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as Info, M as LogIn, _ as ShieldCheck, l as TriangleAlert, m as Sparkles, mt as Bell, o as Users, ot as Check, u as TrendingUp, vt as ArrowRight, xt as Activity } from "../_libs/lucide-react.mjs";
import { _ as VitalCards, d as Button, g as SeverityBadge, h as RiskCard, p as DemoNote, v as cn } from "./ui-BZnIHQM-.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PatientQueue } from "./PatientQueue-wWuwmyJ8.mjs";
import { t as TrendChart } from "./TrendChart-BnEYwSyv.mjs";
import { a as SectionHeading, n as Eyebrow, r as MarketingLayout, t as CapabilityCard } from "./MarketingPrimitives-DgiF3yjP.mjs";
import { i as WORKFLOW_STEPS, n as CORE_CAPABILITIES, r as TRUST_PRINCIPLES, t as AUDIENCES } from "./marketing-data-BrMFZEGL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dc5oraBD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InteractiveProductPreview() {
	const [selectedId, setSelectedId] = (0, import_react.useState)("P-1042");
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const patient = getPatient(selectedId) ?? patients[0];
	const crit = patients.filter((x) => x.severity === "critical").length;
	const high = patients.filter((x) => x.severity === "high").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface overflow-hidden border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold text-foreground",
						children: "Interactive UrgentIQ Dashboard Preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md border border-primary/20 bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-accent-foreground",
						children: "Simulated patient data"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				role: "tablist",
				"aria-label": "Dashboard preview views",
				children: [
					{
						id: "overview",
						label: "Queue & Vitals",
						icon: Users
					},
					{
						id: "trends",
						label: "Vitals Trends",
						icon: TrendingUp
					},
					{
						id: "alerts",
						label: "Alert Feed",
						icon: Bell
					}
				].map((item) => {
					const Icon = item.icon;
					const active = tab === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": active,
						onClick: () => setTab(item.id),
						className: cn("inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), item.label]
					}, item.id);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4 p-4 sm:p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-foreground",
							children: "Patient Priority Queue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								crit,
								" critical · ",
								high,
								" high"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatientQueue, {
						limit: 5,
						selectedId,
						onSelect: setSelectedId
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex flex-wrap items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-extrabold",
										children: patient.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: patient.severity })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: [
										patient.name,
										" · ",
										patient.age,
										" yrs · ",
										patient.gender,
										" · ",
										patient.complaint
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-medium text-muted-foreground",
									children: [
										"Wait:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded bg-critical-soft px-1.5 py-0.5 font-bold text-critical",
											children: [patient.wait, " min"]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalCards, {
								p: patient,
								compact: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
							p: patient,
							showFactors: true
						})] }),
						tab === "trends" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-base font-bold text-foreground",
									children: [
										"Simulated Vital Trends · ",
										patient.id,
										" (",
										patient.name,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "5-minute deterministic demonstration series (HR, SpO₂, Systolic BP, RR)"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: patient.severity })]
							}), mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
								data: vitalsTrend(patient, 5),
								height: 250
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-[250px] place-items-center rounded-lg border border-dashed bg-surface text-xs text-muted-foreground",
								children: "Loading trend chart…"
							})]
						}),
						tab === "alerts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: "Simulated Priority Alerts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Clinician review prompts"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2.5",
								children: initialAlerts.map((alert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: cn("flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5", alert.severity === "critical" ? "border-critical/25 bg-critical-soft" : "border-high/25 bg-high-soft"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-extrabold text-foreground",
												children: alert.patientId
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-semibold uppercase text-muted-foreground",
												children: alert.severity
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium text-foreground",
											children: alert.factor
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "shrink-0 text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold text-muted-foreground",
											children: alert.time
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] font-semibold text-accent-foreground",
											children: alert.resolved ? "Resolved" : alert.acknowledged ? "Acknowledged" : "Pending review"
										})]
									})]
								}, alert.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "Prototype preview using fictional simulated patients — never live clinical data." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								className: "font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/login",
									children: ["Open Full Prototype", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							})]
						})
					]
				})]
			})
		})]
	});
}
var MODELS = [{
	name: "Model 1 · Band + Software Rental",
	badge: "Fixed Monthly",
	highlighted: false,
	price: "₹5,000–₹10,000",
	unit: "/ month per band",
	summary: "Fixed monthly pricing based on the number of monitoring bands deployed by your hospital—with UrgentIQ software included.",
	points: [
		"Compatible monitoring band + full UrgentIQ platform included",
		"Fixed monthly cost scaling directly with band count",
		"No per-patient usage charges",
		"Rate depends on selected band configuration",
		"₹10,000 refundable security deposit per hardware unit"
	],
	cta: "Inquire About Fixed Rental"
}, {
	name: "Model 2 · Software + Per-Patient Usage",
	badge: "Base + Variable",
	highlighted: true,
	price: "₹50,000",
	unit: "/ month + ₹199 / patient",
	summary: "Monthly hospital software subscription with monitoring bands provided against a refundable security deposit and per-patient usage billing.",
	points: [
		"Includes live dashboard, dynamic risk scoring, alerts, trends & support",
		"Variable ₹199 fee per patient assessment processed via bands",
		"Monitoring bands issued against ₹10,000 refundable deposit per unit",
		"Deposit refundable within 12 months after return & inspection"
	],
	cta: "Request Usage-Model Demo"
}];
function PricingSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "scroll-mt-24 py-16 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Planned Pricing",
					title: "Two Simple Models for Hospitals",
					description: "Choose predictable fixed per-band billing or a base software subscription with variable per-patient assessment usage."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 lg:grid-cols-2",
					children: MODELS.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: model.highlighted ? "card-surface flex flex-col justify-between border-primary/40 p-7 sm:p-8" : "card-surface flex flex-col justify-between p-7 sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-foreground",
									children: model.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: model.highlighted ? "rounded-full bg-primary-soft px-3 py-0.5 text-xs font-semibold text-accent-foreground" : "rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-semibold text-muted-foreground",
									children: model.badge
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-wrap items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl",
									children: model.price
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-muted-foreground",
									children: model.unit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: model.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 space-y-2.5 border-t border-border pt-5 text-sm text-foreground",
								children: model.points.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-stable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pt })]
								}, pt))
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-7",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: model.highlighted ? "default" : "outline",
								className: "w-full font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									children: [model.cta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							})
						})]
					}, model.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 shrink-0 text-primary" }), "Planned commercial models for hospital pilots. Security deposits are refundable within 12 months subject to equipment return, inspection, and settlement of dues."]
				})
			]
		})
	});
}
var PROBLEM_POINTS = [
	"Emergency department overcrowding stretches beds and waiting rooms.",
	"Limited staff attention is split across acute arrivals and waiting patients.",
	"Periodic manual checks leave blind spots between observations.",
	"Patients can deteriorate quietly while waiting for review.",
	"Static queues cannot dynamically reprioritise as conditions shift."
];
var SOLUTION_POINTS = [
	"Continuously evaluates vitals and symptom trends over time.",
	"Updates risk indicators as new readings arrive from monitoring bands.",
	"Surfaces patients showing signs of deterioration toward the top of the queue.",
	"Supports clinicians with clear reassessment cues—never replacing clinical judgement."
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-brand-gradient py-12 sm:py-16 lg:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3.5 w-3.5 text-primary" }), "Continuous Clinical Decision Support"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl",
							children: "Keep Patient Priority in Step With Changing Conditions."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "UrgentIQ is designed to help emergency departments identify changing patient risk, surface patients who may need reassessment, and support clinical teams with a continuously updated priority view."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "h-11 px-6 text-base font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									children: ["Request a Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								className: "h-11 bg-card px-6 text-base font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/platform",
									children: "Explore the Platform"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-x-5 gap-y-2 pt-1 text-xs font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-stable" }), "Clinician-led decision support"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-primary" }), "Prototype preview (simulated data)"]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "card-surface overflow-hidden border border-border bg-card p-3 sm:p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/hero-ed-beds.jpg",
						alt: "Illustration of emergency department beds where patients wait for doctors while multiple bedside alert indicators pulse simultaneously",
						width: 1200,
						height: 900,
						className: "aspect-[4/3] w-full rounded-xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "mt-3 flex items-center justify-between gap-3 px-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "When multiple waiting beds trigger alerts at once, teams need clear priority cues." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#product-preview",
							className: "shrink-0 font-semibold text-primary hover:underline",
							children: "See preview ↓"
						})]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Why UrgentIQ",
					title: "Initial Triage Is a Snapshot. Patient Conditions Are Not.",
					description: "Existing systems collect clinical data. UrgentIQ turns changing patient information into an updated view of who needs attention next."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-7 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-md bg-critical-soft px-2.5 py-1 text-xs font-bold text-critical",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5" }), "The Problem"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-xl font-bold text-foreground",
								children: "Waiting Rooms Outpace Static Triage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-3 text-sm text-muted-foreground",
								children: PROBLEM_POINTS.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-critical" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: point })]
								}, point))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface border-primary/35 p-7 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 rounded-md bg-primary-soft px-2.5 py-1 text-xs font-bold text-accent-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), "The UrgentIQ Solution"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-xl font-bold text-foreground",
								children: "A Continuous Decision-Support Layer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-3 text-sm text-foreground",
								children: SOLUTION_POINTS.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-stable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: point })]
								}, point))
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "How It Works",
					title: "Five Steps From Incoming Data to Clinical Review"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute left-10 right-10 top-9 hidden h-0.5 bg-border lg:block",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
						children: WORKFLOW_STEPS.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-surface relative p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold tracking-widest text-primary",
											children: item.step
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-3.5 text-sm font-bold text-foreground",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs leading-relaxed text-muted-foreground",
										children: item.description
									})
								]
							}, item.step);
						})
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "product-preview",
			className: "scroll-mt-24 py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Product Preview",
					title: "Inside the UrgentIQ Prototype Workspace",
					description: "Interact with the prototype priority queue, vitals, risk assessment, and trend charts below using fictional simulated patient data."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveProductPreview, {})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Core Capabilities",
					title: "Focused Tools for Emergency Care Teams"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
					children: CORE_CAPABILITIES.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapabilityCard, {
						item: cap,
						compact: true
					}, cap.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "who-we-help",
			className: "scroll-mt-24 py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Who We Help",
					title: "Built for Clinicians, ED Managers, and Hospital Leaders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 lg:grid-cols-3",
					children: AUDIENCES.map((aud) => {
						const Icon = aud.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "card-surface flex flex-col p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-wider text-primary",
									children: aud.subtitle
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: aud.title
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2 text-sm text-muted-foreground",
								children: aud.points.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pt })]
								}, pt))
							})]
						}, aud.title);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-y border-border bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Trust & Safety",
					title: "Supports Clinical Judgement — Never Replaces It",
					description: "UrgentIQ is a decision-support prototype. Claims around clinical performance are subject to formal validation."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: TRUST_PRINCIPLES.map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 place-items-center rounded-xl bg-stable-soft text-stable",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3.5 text-sm font-bold text-foreground",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
									children: item.description
								})
							]
						}, item.title);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-16 sm:pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface bg-brand-gradient px-6 py-12 text-center sm:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl",
							children: "Make Every Patient's Changing Condition Visible."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base",
							children: "Schedule a prototype walkthrough with your team or sign in to explore the dashboard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "h-11 px-6 text-base font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									children: ["Request a Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								className: "h-11 bg-card px-6 text-base font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/login",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }), "Login"]
								})
							})]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { HomePage as component };
