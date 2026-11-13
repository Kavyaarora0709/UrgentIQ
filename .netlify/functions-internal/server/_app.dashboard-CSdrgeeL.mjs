import { i as __toESM } from "./_runtime.mjs";
import { a as patients, r as getPatient } from "./_ssr/data-C77HYp37.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Y as Clock, d as TrendingDown, l as TriangleAlert, m as Sparkles, o as Users, s as UserRound, u as TrendingUp, vt as ArrowRight } from "./_libs/lucide-react.mjs";
import { _ as VitalCards, d as Button, f as Card, g as SeverityBadge, h as RiskCard, p as DemoNote, t as ActionsList } from "./_ssr/ui-BZnIHQM-.mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as PatientQueue } from "./_ssr/PatientQueue-wWuwmyJ8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-CSdrgeeL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const [selected, setSelected] = (0, import_react.useState)("P-1042");
	const p = getPatient(selected);
	const crit = patients.filter((x) => x.severity === "critical").length;
	const high = patients.filter((x) => x.severity === "high").length;
	const stats = [
		{
			icon: TriangleAlert,
			value: crit,
			label: "Critical Patients",
			sub: "Need immediate attention",
			tone: "bg-critical-soft text-critical"
		},
		{
			icon: UserRound,
			value: high,
			label: "High Priority",
			sub: "Within 15 minutes",
			tone: "bg-high-soft text-high"
		},
		{
			icon: Users,
			value: patients.length,
			label: "Total Patients",
			sub: "Currently in ER",
			tone: "bg-moderate-soft text-moderate"
		},
		{
			icon: Clock,
			value: "28 min",
			label: "Average Wait Time",
			sub: "18% lower vs last hour",
			tone: "bg-stable-soft text-stable",
			trend: true
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-extrabold tracking-tight",
					children: "Emergency Department"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Real-time patient prioritization using AI"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "All patient data is simulated for demonstration." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 xl:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-4 rounded-xl border p-4 ${s.tone.split(" ")[0]}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card ${s.tone.split(" ")[1]}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-2xl font-extrabold ${s.tone.split(" ")[1]}`,
								children: s.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground",
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-xs text-muted-foreground",
								children: [s.trend && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3 text-stable" }), s.sub]
							})
						]
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-xl font-bold",
						children: "Patient Queue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatientQueue, {
						limit: 6,
						selectedId: selected,
						onSelect: setSelected
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						className: "mt-3 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/queue",
							children: [
								"View All Patients (",
								patients.length,
								") ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
							]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-extrabold",
										children: p.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: p.severity })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										p.age,
										" yrs · ",
										p.gender,
										" | Arrived ",
										p.arrived,
										" (",
										p.wait,
										" min ago)"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: ["Wait time: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-md bg-critical-soft px-2 py-0.5 font-bold text-critical",
										children: [p.wait, " min"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Chief complaint"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold",
										children: p.complaint
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Source"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: p.source })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 mb-2 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-bold",
									children: ["Live Vitals ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-xs font-normal text-muted-foreground",
										children: "(simulated values)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/patients/$id",
										params: { id: p.id },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }), "View Trends"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalCards, {
								p,
								compact: true
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
							p,
							showFactors: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 lg:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border bg-moderate-soft p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center gap-2 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), "Key Concerns"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1.5 text-sm",
									children: p.concerns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-critical" }), c]
									}, c))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionsList, { p })]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
