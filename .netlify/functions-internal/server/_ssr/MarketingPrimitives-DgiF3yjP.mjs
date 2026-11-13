import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { M as LogIn, _ as ShieldCheck, k as Menu, t as X, vt as ArrowRight } from "../_libs/lucide-react.mjs";
import { d as Button, m as Logo, v as cn } from "./ui-BZnIHQM-.mjs";
import { c as useStore } from "./store-B_Jr4tEX.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MarketingPrimitives-DgiF3yjP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_ITEMS = [
	{
		label: "Platform",
		to: "/platform"
	},
	{
		label: "How It Works",
		to: "/how-it-works"
	},
	{
		label: "For Hospitals",
		to: "/",
		hash: "who-we-help"
	},
	{
		label: "Pricing",
		to: "/",
		hash: "pricing"
	},
	{
		label: "About",
		to: "/about"
	},
	{
		label: "Contact",
		to: "/contact"
	}
];
function MarketingLayout({ children }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const user = useStore((s) => s.user);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const isSignedIn = mounted && Boolean(user);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main-content",
				className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground",
				children: "Skip to main content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							"aria-label": "UrgentIQ home",
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							"aria-label": "Primary navigation",
							className: "hidden items-center gap-1 lg:flex",
							children: NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								..."hash" in item && item.hash ? { hash: item.hash } : {},
								className: "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
								activeProps: { className: "bg-primary-soft font-semibold text-accent-foreground" },
								activeOptions: {
									exact: true,
									includeHash: Boolean("hash" in item && item.hash)
								},
								children: item.label
							}, item.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-2.5 lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								className: "h-9 px-3.5 font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: isSignedIn ? "/dashboard" : "/login",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }), isSignedIn ? "Open Dashboard" : "Login"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "h-9 px-4 font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									children: ["Request a Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden",
							onClick: () => setMobileOpen((prev) => !prev),
							"aria-expanded": mobileOpen,
							"aria-controls": "mobile-marketing-nav",
							"aria-label": mobileOpen ? "Close navigation menu" : "Open navigation menu",
							children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "mobile-marketing-nav",
					className: cn("border-t border-border bg-card px-4 py-4 lg:hidden", mobileOpen ? "block" : "hidden"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Mobile navigation",
						className: "flex flex-col gap-1",
						children: NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							..."hash" in item && item.hash ? { hash: item.hash } : {},
							onClick: () => setMobileOpen(false),
							className: "rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent",
							children: item.label
						}, item.label))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-2.5 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "w-full font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: isSignedIn ? "/dashboard" : "/login",
								onClick: () => setMobileOpen(false),
								children: isSignedIn ? "Dashboard" : "Login"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "w-full font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								onClick: () => setMobileOpen(false),
								children: "Request a Demo"
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-10 md:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										"aria-label": "UrgentIQ home",
										className: "inline-block",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted-foreground",
										children: "An AI-assisted dynamic triage and patient-prioritisation platform designed to help emergency departments keep patient priority aligned with changing conditions."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 shrink-0 text-primary" }), "Clinical decision-support prototype"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground",
								children: "Platform"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/platform",
										className: "text-muted-foreground hover:text-primary",
										children: "Platform Capabilities"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/how-it-works",
										className: "text-muted-foreground hover:text-primary",
										children: "How It Works"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										hash: "who-we-help",
										className: "text-muted-foreground hover:text-primary",
										children: "Who We Help"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										hash: "pricing",
										className: "text-muted-foreground hover:text-primary",
										children: "Planned Pricing"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/login",
										className: "text-muted-foreground hover:text-primary",
										children: "Dashboard Login"
									}) })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground",
								children: "Organisation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/about",
										className: "text-muted-foreground hover:text-primary",
										children: "About UrgentIQ"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/contact",
										className: "text-muted-foreground hover:text-primary",
										children: "Request a Demo"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "pt-1 text-xs leading-relaxed text-muted-foreground",
										children: [
											"Hospital demo inquiries:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "mailto:kavyaa037@gmail.com?subject=UrgentIQ%20Demo%20Request",
												className: "font-semibold text-primary hover:underline",
												children: "Open Email App"
											})
										]
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground",
								children: "Governance & Legal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/privacy",
										className: "text-muted-foreground hover:text-primary",
										children: "Privacy Policy"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/terms",
										className: "text-muted-foreground hover:text-primary",
										children: "Terms of Use"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/disclaimer",
										className: "text-muted-foreground hover:text-primary",
										children: "Product Disclaimer"
									}) })
								]
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" UrgentIQ. Early-stage healthcare technology venture."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prototype demonstration only · Simulated patient data · Not a certified medical device." })]
					})]
				})
			})
		]
	});
}
function Eyebrow({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground", className),
		children
	});
}
function SectionHeading({ eyebrow, title, description, align = "center", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className),
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: eyebrow }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base leading-relaxed text-muted-foreground sm:text-lg",
				children: description
			})
		]
	});
}
function CapabilityCard({ item, compact = false }) {
	const Icon = item.icon;
	const isImplemented = item.status === "Prototype Implemented";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-surface flex h-full flex-col justify-between p-6 transition-shadow hover:shadow-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("rounded-md border px-2 py-0.5 text-[11px] font-semibold", isImplemented ? "border-stable/30 bg-stable-soft text-stable" : "border-border bg-surface text-muted-foreground"),
					children: item.status
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-base font-bold tracking-tight text-foreground",
				children: item.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
				children: item.description
			})
		] }), !compact && item.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 border-t border-border pt-3 text-xs text-muted-foreground",
			children: item.detail
		})]
	});
}
function PageHero({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-brand-gradient py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: eyebrow }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg leading-relaxed text-muted-foreground",
						children: description
					}),
					actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-3 pt-2",
						children: actions
					})
				]
			})
		})
	});
}
//#endregion
export { SectionHeading as a, PageHero as i, Eyebrow as n, MarketingLayout as r, CapabilityCard as t };
