import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { G as EyeOff, P as LoaderCircle, W as Eye, _ as ShieldCheck, f as Stethoscope, nt as CircleAlert, yt as ArrowLeft, z as HeartPulse } from "../_libs/lucide-react.mjs";
import { d as Button, m as Logo } from "./ui-BZnIHQM-.mjs";
import { r as getState } from "./store-B_Jr4tEX.mjs";
import { t as Input } from "./input-lmt4JH1F.mjs";
import { n as HOSPITALS, r as signIn, t as DEMO_CREDENTIALS } from "./auth-BHE-3Ap_.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as Label } from "./label-BMd7QMra.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CZvtLiRn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	hospital: stringType().trim().min(1, "Please select your hospital").max(120),
	username: stringType().trim().min(1, "Username is required").max(60),
	password: stringType().min(1, "Password is required").max(100)
});
function Login() {
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		hospital: "",
		username: "",
		password: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [authError, setAuthError] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (getState().user) navigate({ to: "/dashboard" });
	}, [navigate]);
	const submit = async (e) => {
		e.preventDefault();
		setAuthError("");
		const r = schema.safeParse(form);
		if (!r.success) {
			const errs = {};
			r.error.issues.forEach((i) => errs[i.path[0]] = i.message);
			setErrors(errs);
			return;
		}
		setErrors({});
		setLoading(true);
		try {
			await signIn(r.data.hospital, r.data.username, r.data.password);
			navigate({ to: "/dashboard" });
		} catch (err) {
			setAuthError(err.message);
			setLoading(false);
		}
	};
	const field = (k) => ({
		value: form[k],
		onChange: (e) => setForm({
			...form,
			[k]: e.target.value
		}),
		"aria-invalid": !!errors[k]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen bg-brand-gradient lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden flex-col justify-between overflow-hidden p-12 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "Return to UrgentIQ home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "lg" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-sm font-semibold uppercase tracking-widest text-primary",
							children: "AI-Powered Emergency Care"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-5xl font-extrabold leading-tight tracking-tight",
							children: "Every second matters. Every patient counts."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-muted-foreground",
							children: "Real-time prioritization that helps clinicians spot the most urgent patients first."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex gap-6 text-sm font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { className: "h-5 w-5 text-critical" }), "Live triage"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "h-5 w-5 text-primary" }), "Clinician-led"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-stable" }), "Decision support"]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 600 120",
					className: "absolute bottom-24 left-0 w-full text-primary/15",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 60 H180 L200 60 L215 20 L235 100 L250 40 L262 60 H600",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "4"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Academic prototype · not a clinically validated product" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex items-center gap-1 font-medium text-foreground hover:text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to website"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between gap-4 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Website"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						noValidate: true,
						className: "card-surface space-y-5 p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold",
								children: "Sign in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Access the emergency department dashboard."
							})] }),
							authError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "alert",
								className: "flex items-center gap-2 rounded-lg border border-critical/30 bg-critical-soft px-3 py-2 text-sm text-critical",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), authError]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "hospital",
										children: "Hospital"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "hospital",
										list: "hospitals",
										placeholder: "Search or select hospital",
										autoComplete: "off",
										...field("hospital")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
										id: "hospitals",
										children: HOSPITALS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: h }, h))
									}),
									errors["hospital"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-critical",
										children: errors["hospital"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "username",
										children: "Username"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "username",
										autoComplete: "username",
										placeholder: "Enter username",
										...field("username")
									}),
									errors["username"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-critical",
										children: errors["username"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "password",
											type: show ? "text" : "password",
											autoComplete: "current-password",
											placeholder: "Enter password",
											className: "pr-10",
											...field("password")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShow(!show),
											className: "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground",
											"aria-label": show ? "Hide password" : "Show password",
											children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})]
									}),
									errors["password"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-critical",
										children: errors["password"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "h-11 w-full text-base",
								disabled: loading,
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Signing in…"] }) : "Sign In to Dashboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setForm({
										hospital: DEMO_CREDENTIALS.hospital,
										username: DEMO_CREDENTIALS.username,
										password: DEMO_CREDENTIALS.password
									});
									setErrors({});
									setAuthError("");
								},
								className: "w-full text-left rounded-lg bg-primary-soft p-3 text-xs transition-colors hover:bg-primary-soft/80 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-1 font-semibold text-accent-foreground",
									children: "Demo login (prototype only · click to fill)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground",
									children: [
										DEMO_CREDENTIALS.hospital,
										" · ",
										DEMO_CREDENTIALS.username,
										" · ",
										DEMO_CREDENTIALS.password
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-xs text-muted-foreground",
						children: "Authorized healthcare personnel only."
					})
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
