import { i as __toESM } from "./_runtime.mjs";
import { a as patients, t as SEVERITY_LABEL } from "./_ssr/data-C77HYp37.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Y as Clock, c as UserCheck, ct as ChartPie, d as TrendingDown, l as TriangleAlert, lt as ChartNoAxesColumn, o as Users } from "./_libs/lucide-react.mjs";
import { f as Card, p as DemoNote } from "./_ssr/ui-BZnIHQM-.mjs";
import { a as XAxis, d as Cell, f as ResponsiveContainer, i as YAxis, l as Bar, n as BarChart, p as Tooltip, t as PieChart, u as Pie } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.analytics-9PNXPDdH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hourlyArrivals = [
	{
		hour: "08:00",
		arrivals: 9
	},
	{
		hour: "09:00",
		arrivals: 14
	},
	{
		hour: "10:00",
		arrivals: 12
	},
	{
		hour: "11:00",
		arrivals: 7
	},
	{
		hour: "12:00",
		arrivals: 11
	},
	{
		hour: "13:00",
		arrivals: 6
	},
	{
		hour: "14:00",
		arrivals: 8
	},
	{
		hour: "15:00",
		arrivals: 10
	}
];
var SEVERITY_COLORS = {
	critical: "var(--critical)",
	high: "var(--high)",
	moderate: "var(--moderate)",
	low: "var(--stable)"
};
function AnalyticsPage() {
	const totalArrivals = hourlyArrivals.reduce((sum, h) => sum + h.arrivals, 0);
	const triageCounts = (0, import_react.useMemo)(() => {
		const counts = {
			critical: 0,
			high: 0,
			moderate: 0,
			low: 0
		};
		patients.forEach((p) => {
			counts[p.severity] = (counts[p.severity] || 0) + 1;
		});
		return counts;
	}, []);
	const triageData = (0, import_react.useMemo)(() => {
		return [
			"critical",
			"high",
			"moderate",
			"low"
		].map((key) => ({
			name: SEVERITY_LABEL[key],
			value: triageCounts[key],
			color: SEVERITY_COLORS[key]
		}));
	}, [triageCounts]);
	const avgWaitByPriority = (0, import_react.useMemo)(() => {
		return [
			"critical",
			"high",
			"moderate",
			"low"
		].map((sev) => {
			const group = patients.filter((p) => p.severity === sev);
			const avg = group.length > 0 ? Math.round(group.reduce((s, p) => s + p.wait, 0) / group.length) : 0;
			return {
				severity: sev,
				label: SEVERITY_LABEL[sev],
				avgWait: avg,
				color: SEVERITY_COLORS[sev]
			};
		});
	}, []);
	const maxWait = Math.max(...avgWaitByPriority.map((w) => w.avgWait), 60);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-extrabold tracking-tight",
					children: "Analytics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Department performance today · simulated data"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "All analytics and wait times are generated from prototype data." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-xl border bg-moderate-soft p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-moderate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-extrabold text-moderate",
								children: totalArrivals
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground text-sm",
								children: "Arrivals today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Recorded across 8 hours"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-xl border bg-stable-soft p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-stable",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-extrabold text-stable",
								children: "28 min"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground text-sm",
								children: "Avg wait time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-xs text-stable",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3" }), " 18% lower vs last hour"]
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-xl border bg-high-soft p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-high",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-extrabold text-high",
								children: "6 min"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground text-sm",
								children: "Avg time to triage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Well within 10 min target"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-xl border bg-critical-soft p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-critical",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-extrabold text-critical",
								children: "2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground text-sm",
								children: "Escalations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Both stabilized in resus"
							})
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-bold text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "h-5 w-5 text-primary" }), "Arrivals by Hour"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Peak: 14 patients at 09:00"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-60 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: hourlyArrivals,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "hour",
										tick: {
											fontSize: 11,
											fill: "var(--muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fontSize: 11,
											fill: "var(--muted-foreground)"
										},
										axisLine: false,
										tickLine: false,
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											borderRadius: 10,
											border: "1px solid var(--border)",
											backgroundColor: "var(--card)",
											fontSize: 12
										},
										formatter: (val) => [`${val} patients`, "Arrivals"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "arrivals",
										fill: "var(--primary)",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-bold text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartPie, { className: "h-5 w-5 text-primary" }), "Triage Distribution"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [patients.length, " total active"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-44 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: triageData,
									cx: "50%",
									cy: "50%",
									innerRadius: 45,
									outerRadius: 68,
									paddingAngle: 4,
									dataKey: "value",
									children: triageData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.color }, `cell-${index}`))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 10,
									border: "1px solid var(--border)",
									backgroundColor: "var(--card)",
									fontSize: 12
								} })] })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2.5",
							children: triageData.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-3 w-3 rounded-full",
										style: { backgroundColor: t.color }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: t.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-bold text-foreground",
									children: [
										t.value,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-normal text-muted-foreground",
											children: [
												"(",
												Math.round(t.value / patients.length * 100),
												"%)"
											]
										})
									]
								})]
							}, t.name))
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 font-bold text-lg",
						children: "Average Wait by Priority (min)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3.5",
						children: avgWaitByPriority.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-extrabold text-foreground",
									children: [item.avgWait, " min"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2.5 w-full overflow-hidden rounded-full bg-surface",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full transition-all",
									style: {
										width: `${Math.min(100, item.avgWait / maxWait * 100)}%`,
										backgroundColor: item.color
									}
								})
							})]
						}, item.severity))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 font-bold text-lg",
							children: "AI Alert Accuracy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Not available in this prototype. Validated metrics would appear here once a formal clinical evaluation is run."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase text-primary tracking-wide",
								children: "Target Metrics for Pilot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 space-y-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Sensitivity for early critical deterioration: ≥ 94%" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• False alarm suppression: < 15% alert fatigue" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Mean lead time to intervention: 18 minutes prior to bedside alert" })
								]
							})]
						})
					] })
				]
			})
		]
	});
}
//#endregion
export { AnalyticsPage as component };
