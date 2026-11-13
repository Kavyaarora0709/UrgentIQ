import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$15 } from "../_app.patients._id-Cd79GFQi.mjs";
import { t as Route$16 } from "../_app.patients.index-CLpJ6DJ_.mjs";
import { t as Route$17 } from "../_app.queue-DHdl5lFe.mjs";
import { n as Route$18 } from "./contact-Do8M3rUj.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-uf6bSidD.js
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-vbfT7Hlx.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "UrgentIQ — AI-Powered Emergency Care" },
			{
				name: "description",
				content: "AI-assisted emergency room triage and patient monitoring prototype."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "shortcut icon",
				href: "/favicon.ico"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})]
	});
}
var $$splitComponentImporter$13 = () => import("./routes-Dc5oraBD.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "UrgentIQ — Dynamic Triage & Patient Prioritisation Platform" },
		{
			name: "description",
			content: "UrgentIQ is designed to help emergency departments identify changing patient risk, surface patients who may need reassessment, and support clinical teams with a continuously updated priority view."
		},
		{
			property: "og:title",
			content: "UrgentIQ — Keep Patient Priority in Step With Changing Conditions"
		},
		{
			property: "og:description",
			content: "A continuous clinical decision-support layer between initial triage and definitive treatment."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("../_app-DLO0oALF.mjs");
var Route$12 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./about-mbesmMzQ.mjs");
var Route$11 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About UrgentIQ — Dynamic Triage Decision Support" },
		{
			name: "description",
			content: "Learn about UrgentIQ's mission to help emergency departments detect changing patient risk between initial triage and definitive treatment."
		},
		{
			property: "og:title",
			content: "About UrgentIQ"
		},
		{
			property: "og:description",
			content: "Healthcare technology venture focused on continuous patient-prioritisation workflows for emergency departments."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./disclaimer-B1uW0rm8.mjs");
var Route$10 = createFileRoute("/disclaimer")({
	head: () => ({ meta: [{ title: "Product & Clinical Disclaimer — UrgentIQ" }, {
		name: "description",
		content: "Important clinical safety, prototype status, and simulated data disclosures for UrgentIQ."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./how-it-works-QplUoWbI.mjs");
var Route$9 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [
		{ title: "How It Works — UrgentIQ" },
		{
			name: "description",
			content: "See how UrgentIQ processes incoming vitals and symptoms into dynamic risk indicators, queue reprioritisation, and clinician review cues."
		},
		{
			property: "og:title",
			content: "How It Works — UrgentIQ"
		},
		{
			property: "og:description",
			content: "From one-time intake snapshots to continuously updated emergency patient priority."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./login-CZvtLiRn.mjs");
var Route$8 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Sign in — UrgentIQ Emergency Care" },
		{
			name: "description",
			content: "Sign in to UrgentIQ, the AI-assisted emergency room triage dashboard prototype."
		},
		{
			property: "og:title",
			content: "Sign in — UrgentIQ Emergency Care"
		},
		{
			property: "og:description",
			content: "AI-assisted ER triage and patient monitoring prototype."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./platform-7PRLEJ4J.mjs");
var Route$7 = createFileRoute("/platform")({
	head: () => ({ meta: [
		{ title: "Platform Capabilities — UrgentIQ" },
		{
			name: "description",
			content: "Explore UrgentIQ's dynamic patient-prioritisation capabilities, implemented prototype features, and planned hospital integration roadmap."
		},
		{
			property: "og:title",
			content: "Platform Capabilities — UrgentIQ"
		},
		{
			property: "og:description",
			content: "Continuous patient monitoring, deterioration indicators, dynamic risk scoring, and clinician-led priority queues."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./privacy-Dex9pAVo.mjs");
var Route$6 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — UrgentIQ" }, {
		name: "description",
		content: "Draft privacy notice and prototype data handling disclosure for UrgentIQ."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./terms-BQHlHE7O.mjs");
var Route$5 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Use — UrgentIQ" }, {
		name: "description",
		content: "Draft terms of use for the UrgentIQ public marketing website and prototype."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_app.alerts-BObvWVmk.mjs");
var Route$4 = createFileRoute("/_app/alerts")({
	head: () => ({ meta: [{ title: "Clinical Alerts — UrgentIQ" }, {
		name: "description",
		content: "Real-time clinical alerts, deterioration warnings, and vitals thresholds."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_app.analytics-9PNXPDdH.mjs");
var Route$3 = createFileRoute("/_app/analytics")({
	head: () => ({ meta: [{ title: "Department Analytics — UrgentIQ" }, {
		name: "description",
		content: "Department performance, hourly arrivals, triage distributions, and wait-time statistics."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.dashboard-CSdrgeeL.mjs");
var Route$2 = createFileRoute("/_app/dashboard")({
	head: () => ({ meta: [
		{ title: "Emergency Department — UrgentIQ" },
		{
			name: "description",
			content: "Real-time AI-assisted patient prioritization for the emergency department."
		},
		{
			property: "og:title",
			content: "Emergency Department — UrgentIQ"
		},
		{
			property: "og:description",
			content: "Real-time AI-assisted patient prioritization."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.settings-BDBQSDNW.mjs");
var Route$1 = createFileRoute("/_app/settings")({
	head: () => ({ meta: [{ title: "Settings — UrgentIQ" }, {
		name: "description",
		content: "Department preferences, alert thresholds, and notification controls."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.smartwatch-DHAWRf_j.mjs");
var Route = createFileRoute("/_app/smartwatch")({
	head: () => ({ meta: [{ title: "Smartwatch Vitals Lab — UrgentIQ" }, {
		name: "description",
		content: "Demonstration heart-rate workflow and real Bluetooth Low Energy smartwatch validity testing with personal reference comparison."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AppRoute = Route$12.update({
	id: "/_app",
	getParentRoute: () => Route$14
});
var AboutRoute = Route$11.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$14
});
var ContactRoute = Route$18.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$14
});
var DisclaimerRoute = Route$10.update({
	id: "/disclaimer",
	path: "/disclaimer",
	getParentRoute: () => Route$14
});
var HowItWorksRoute = Route$9.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$14
});
var LoginRoute = Route$8.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$14
});
var PlatformRoute = Route$7.update({
	id: "/platform",
	path: "/platform",
	getParentRoute: () => Route$14
});
var PrivacyRoute = Route$6.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$14
});
var TermsRoute = Route$5.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$14
});
var AppAlertsRoute = Route$4.update({
	id: "/alerts",
	path: "/alerts",
	getParentRoute: () => AppRoute
});
var AppAnalyticsRoute = Route$3.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppQueueRoute = Route$17.update({
	id: "/queue",
	path: "/queue",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$1.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppSmartwatchRoute = Route.update({
	id: "/smartwatch",
	path: "/smartwatch",
	getParentRoute: () => AppRoute
});
var AppPatientsIndexRoute = Route$16.update({
	id: "/patients/",
	path: "/patients/",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppAlertsRoute,
	AppAnalyticsRoute,
	AppDashboardRoute,
	AppQueueRoute,
	AppSettingsRoute,
	AppSmartwatchRoute,
	AppPatientsIdRoute: Route$15.update({
		id: "/patients/$id",
		path: "/patients/$id",
		getParentRoute: () => AppRoute
	}),
	AppPatientsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	AboutRoute,
	ContactRoute,
	DisclaimerRoute,
	HowItWorksRoute,
	LoginRoute,
	PlatformRoute,
	PrivacyRoute,
	TermsRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
