import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { it as ChevronRight, l as TriangleAlert, mt as Bell, ot as Check, st as CheckCheck, v as ShieldAlert, w as RotateCcw } from "./_libs/lucide-react.mjs";
import { d as Button, f as Card, p as DemoNote, v as cn } from "./_ssr/ui-BZnIHQM-.mjs";
import { a as resetAlerts, c as useStore, i as markAllAlertsRead, t as acknowledgeAlert } from "./_ssr/store-B_Jr4tEX.mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.alerts-BObvWVmk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AlertsPage() {
	const alerts = useStore((s) => s.alerts);
	const unreadCount = alerts.filter((a) => !a.acknowledged && !a.resolved).length;
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filtered = alerts.filter((a) => {
		if (filter === "unread") return !a.acknowledged && !a.resolved;
		if (filter === "critical") return a.severity === "critical";
		if (filter === "high") return a.severity === "high";
		return true;
	});
	const handleMarkAllRead = () => {
		markAllAlertsRead();
		toast.success("All alerts marked as acknowledged");
	};
	const handleResetAlerts = () => {
		resetAlerts();
		toast.success("Patient alerts reset to default state");
	};
	const handleAcknowledge = (id, patientId) => {
		acknowledgeAlert(id);
		toast.info(`Alert acknowledged for ${patientId}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold tracking-tight",
				children: "Alerts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground",
				children: [unreadCount, " unread · simulated alerts for demonstration"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "Simulated deterioration alerts — not real clinical alerts." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: handleResetAlerts,
						className: "gap-2 text-xs font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), "Reset Alerts"]
					}),
					unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: handleMarkAllRead,
						className: "gap-2 text-xs font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4" }), "Mark all as read"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter("all"),
						className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", filter === "all" ? "border-primary bg-primary text-primary-foreground" : "bg-surface text-foreground hover:bg-accent"),
						children: [
							"All (",
							alerts.length,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter("unread"),
						className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", filter === "unread" ? "border-primary bg-primary text-primary-foreground" : "bg-surface text-foreground hover:bg-accent"),
						children: [
							"Unacknowledged (",
							unreadCount,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter("critical"),
						className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", filter === "critical" ? "border-critical bg-critical text-primary-foreground" : "bg-critical-soft text-critical hover:border-critical/30"),
						children: [
							"Critical (",
							alerts.filter((a) => a.severity === "critical").length,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter("high"),
						className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", filter === "high" ? "border-high bg-high text-primary-foreground" : "bg-high-soft text-high hover:border-high/30"),
						children: [
							"High (",
							alerts.filter((a) => a.severity === "high").length,
							")"
						]
					})
				]
			})
		}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid place-items-center rounded-xl border border-dashed py-12 text-center text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mb-2 h-8 w-8 text-stable" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-foreground",
					children: "No alerts match the filter"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "All department notifications are up to date."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: filtered.map((a) => {
				const isCrit = a.severity === "critical";
				const unread = !a.acknowledged && !a.resolved;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex flex-wrap items-center gap-3.5 rounded-xl border p-4 transition-shadow", unread ? "bg-primary-soft/50 border-primary/30 shadow-sm" : "bg-card border-border"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl font-bold text-sm", isCrit ? "bg-critical text-primary-foreground" : "bg-high-soft text-high"),
							children: isCrit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/patients/$id",
										params: { id: a.patientId },
										className: "font-extrabold text-foreground hover:underline",
										children: a.patientId
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded px-2 py-0.5 text-[10px] font-extrabold uppercase", isCrit ? "bg-critical text-primary-foreground" : "bg-high text-primary-foreground"),
										children: a.severity
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-semibold text-foreground text-sm",
									children: a.factor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: a.time
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "ghost",
								className: "text-xs gap-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/patients/$id",
									params: { id: a.patientId },
									children: ["Patient Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
								})
							}), unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => handleAcknowledge(a.id, a.patientId),
								className: "text-xs font-semibold",
								children: "Acknowledge"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-stable" }), " Read"]
							})]
						})
					]
				}, a.id);
			})
		})] })]
	});
}
//#endregion
export { AlertsPage as component };
