import { i as __toESM } from "../_runtime.mjs";
import { o as vitalRanges, s as vitalStatus, t as SEVERITY_LABEL } from "./data-C77HYp37.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime, D as Slot, a as AlertDialogDescription$1, c as AlertDialogTitle$1, i as AlertDialogContent$1, l as AlertDialogTrigger$1, n as AlertDialogAction$1, o as AlertDialogOverlay$1, r as AlertDialogCancel$1, s as AlertDialogPortal$1, t as AlertDialog$1 } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Info, K as Droplet, _ as ShieldCheck, bt as ArrowDown, gt as ArrowUp, l as TriangleAlert, n as Wind, ot as Check, xt as Activity, z as HeartPulse } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-BZnIHQM-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var AlertDialog = AlertDialog$1;
var AlertDialogTrigger = AlertDialogTrigger$1;
var AlertDialogPortal = AlertDialogPortal$1;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay$1, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = AlertDialogOverlay$1.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = AlertDialogContent$1.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = AlertDialogTitle$1.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = AlertDialogDescription$1.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction$1, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = AlertDialogAction$1.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel$1, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = AlertDialogCancel$1.displayName;
function Logo({ size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative shrink-0 overflow-hidden rounded-xl border border-border/60 bg-white p-0.5 shadow-xs grid place-items-center", size === "lg" ? "h-12 w-12" : "h-9 w-9"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/favicon.png",
				alt: "UrgentIQ logo",
				className: "h-full w-full object-contain",
				onError: (e) => {
					e.currentTarget.style.display = "none";
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
				className: cn("text-primary absolute inset-0 m-auto -z-10", size === "lg" ? "h-7 w-7" : "h-5 w-5"),
				strokeWidth: 2.4
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("font-extrabold tracking-tight text-foreground", size === "lg" ? "text-3xl" : "text-xl"),
				children: "UrgentIQ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-medium text-muted-foreground",
				children: "AI-Powered Emergency Care"
			})]
		})]
	});
}
var sevStyles = {
	critical: {
		badge: "bg-critical text-primary-foreground",
		soft: "bg-critical-soft",
		text: "text-critical",
		bar: "border-l-critical"
	},
	high: {
		badge: "bg-high-soft text-high border border-high/30",
		soft: "bg-high-soft",
		text: "text-high",
		bar: "border-l-high"
	},
	moderate: {
		badge: "bg-moderate-soft text-moderate border border-moderate/30",
		soft: "bg-moderate-soft",
		text: "text-moderate",
		bar: "border-l-moderate"
	},
	low: {
		badge: "bg-stable-soft text-stable border border-stable/30",
		soft: "bg-stable-soft",
		text: "text-stable",
		bar: "border-l-stable"
	}
};
function SeverityBadge({ severity, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide", sevStyles[severity].badge, className),
		children: [severity === "critical" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }), SEVERITY_LABEL[severity]]
	});
}
function Card({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("card-surface p-5", className),
		children
	});
}
function DemoNote({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex items-start gap-1.5 text-[11px] text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-px h-3 w-3 shrink-0" }), children]
	});
}
function Spark({ up, tone }) {
	const d = up ? "M2 26 L10 22 L16 24 L24 14 L30 16 L38 4" : "M2 6 L10 10 L16 8 L24 18 L30 16 L38 26";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 30",
		className: cn("h-7 w-12 shrink-0", tone),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function VitalCards({ p, compact }) {
	const items = [
		{
			key: "hr",
			icon: HeartPulse,
			value: `${p.vitals.hr}`
		},
		{
			key: "spo2",
			icon: Droplet,
			value: `${p.vitals.spo2}`
		},
		{
			key: "bp",
			icon: Activity,
			value: `${p.vitals.sys}/${p.vitals.dia}`
		},
		{
			key: "rr",
			icon: Wind,
			value: `${p.vitals.rr}`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 xl:grid-cols-4",
		children: items.map(({ key, icon: Icon, value }) => {
			const r = vitalRanges[key];
			const st = vitalStatus(key, p.vitals);
			const abnormal = st !== "Normal";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("rounded-xl border p-3", abnormal ? "border-critical/20 bg-critical-soft" : "bg-surface"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4", abnormal ? "text-critical" : "text-primary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: r.label
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 flex items-end justify-between gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("font-extrabold text-foreground", compact ? "text-lg" : "text-2xl"),
								children: value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-xs font-semibold text-muted-foreground",
								children: r.unit
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {
							up: st !== "Low",
							tone: abnormal ? "text-critical" : "text-primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex items-center justify-between text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"(",
								r.range,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("inline-flex items-center gap-0.5 font-bold", abnormal ? "text-critical" : "text-stable"),
							children: [
								st === "High" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3 w-3" }),
								st === "Low" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3 w-3" }),
								st === "Normal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }),
								st
							]
						})]
					})
				]
			}, key);
		})
	});
}
function riskLabel(r) {
	return r >= 75 ? "High Risk of Deterioration" : r >= 40 ? "Moderate Risk of Deterioration" : "Low Risk of Deterioration";
}
function RiskCard({ p, showFactors = true }) {
	const high = p.risk >= 75;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl border p-4", high ? "border-critical/20 bg-critical-soft" : "bg-surface"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: cn("h-5 w-5 shrink-0", high ? "text-critical" : "text-high") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: "AI Risk Assessment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("font-bold", high ? "text-critical" : "text-foreground"),
							children: riskLabel(p.risk)
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("text-3xl font-extrabold", high ? "text-critical" : "text-foreground"),
					children: [p.risk, "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-2 overflow-hidden rounded-full bg-border",
				role: "progressbar",
				"aria-valuenow": p.risk,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-label": "Simulated risk score",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full", high ? "bg-critical" : "bg-high"),
					style: { width: `${p.risk}%` }
				})
			}),
			showFactors && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-1 text-sm sm:grid-cols-2",
				children: p.riskFactors.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-critical" }), f]
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "Simulated AI risk estimate for demonstration — not a validated clinical prediction." })
			})
		]
	});
}
function ActionsList({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-stable/20 bg-stable-soft p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-2 font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-stable" }), "Recommended Actions"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-1.5 text-sm",
				children: p.actions.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-stable/15 text-[11px] font-bold text-stable",
						children: i + 1
					}), a]
				}, a))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "Example suggestions — clinician judgment decides." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertCareTeam, { p })]
			})
		]
	});
}
function AlertCareTeam({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }), "Alert Care Team"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
		"Alert care team for ",
		p.id,
		"?"
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This is a demo prototype. No real hospital staff will be notified — the action is only simulated." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
		onClick: () => toast.success(`Demo alert raised for ${p.id}`, { description: "Simulated only — no message was sent." }),
		children: "Send demo alert"
	})] })] })] });
}
//#endregion
export { VitalCards as _, AlertDialogContent as a, AlertDialogHeader as c, Button as d, Card as f, SeverityBadge as g, RiskCard as h, AlertDialogCancel as i, AlertDialogTitle as l, Logo as m, AlertDialog as n, AlertDialogDescription as o, DemoNote as p, AlertDialogAction as r, AlertDialogFooter as s, ActionsList as t, AlertDialogTrigger as u, cn as v, sevStyles as y };
