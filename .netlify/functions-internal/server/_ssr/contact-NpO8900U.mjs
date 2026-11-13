import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Mail, F as Info, Z as ClipboardCopy, _ as ShieldCheck, nt as CircleAlert, ot as Check, w as RotateCcw } from "../_libs/lucide-react.mjs";
import { d as Button, v as cn } from "./ui-BZnIHQM-.mjs";
import { t as Input } from "./input-lmt4JH1F.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Textarea } from "./textarea-BYLohdEg.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { i as PageHero, r as MarketingLayout } from "./MarketingPrimitives-DgiF3yjP.mjs";
import { t as DEMO_CONTACT_EMAIL } from "./contact-Do8M3rUj.mjs";
import { t as Label } from "./label-BMd7QMra.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-NpO8900U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRELISTED_MESSAGES = [
	{
		id: "ed-demo",
		label: "ED Demo Walkthrough",
		text: "Hello UrgentIQ team,\n\nI would like to request a demonstration of the UrgentIQ dynamic triage and patient-prioritisation platform for our emergency department. We are interested in seeing how continuous monitoring, deterioration alerts, and priority queue updates support clinicians during busy shifts, as well as discussing the fixed band-rental and software + per-patient pricing models."
	},
	{
		id: "pilot-hardware",
		label: "Pilot & Band Rental",
		text: "Hello UrgentIQ team,\n\nOur hospital is evaluating continuous monitoring for patients waiting in our emergency care bay. Could we schedule a walkthrough of the UrgentIQ dashboard and discuss monitoring band configurations, security deposit terms, and potential pilot timelines?"
	},
	{
		id: "technical-review",
		label: "Technical & Integration",
		text: "Hello UrgentIQ team,\n\nWe would like to arrange a technical walkthrough for our clinical operations and IT teams to review the UrgentIQ dashboard workflow, wearable vitals prototype, and planned hospital integration roadmap."
	}
];
var demoRequestSchema = objectType({
	name: stringType().trim().min(2, "Please enter your full name").max(100),
	workEmail: stringType().trim().email("Please enter a valid work email address").max(120),
	organisation: stringType().trim().min(2, "Please enter your hospital or organisation name").max(150),
	designation: stringType().trim().min(2, "Please enter your role or designation").max(100),
	message: stringType().trim().min(10, "Please share a brief note about your workflow or demo goals").max(1500)
});
var INITIAL_FORM = {
	name: "",
	workEmail: "",
	organisation: "",
	designation: "",
	message: PRELISTED_MESSAGES[0].text
};
function buildMailtoHref(data) {
	const subject = data.organisation ? `UrgentIQ Demo Request — ${data.organisation}` : "UrgentIQ Demo Request";
	const bodyLines = [
		data.message || PRELISTED_MESSAGES[0].text,
		"",
		"---",
		`Name: ${data.name || "[Your Name]"}`,
		`Work Email: ${data.workEmail || "[Your Work Email]"}`,
		`Hospital / Organisation: ${data.organisation || "[Hospital / Organisation]"}`,
		`Designation: ${data.designation || "[Designation]"}`
	];
	return `mailto:${DEMO_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}
function ContactPage() {
	const [form, setForm] = (0, import_react.useState)(INITIAL_FORM);
	const [activePreset, setActivePreset] = (0, import_react.useState)(PRELISTED_MESSAGES[0].id);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		const parsed = demoRequestSchema.safeParse(form);
		if (!parsed.success) {
			const nextErrors = {};
			parsed.error.issues.forEach((issue) => {
				const key = issue.path[0];
				if (typeof key === "string") nextErrors[key] = issue.message;
			});
			setErrors(nextErrors);
			setSubmitted(null);
			return;
		}
		setErrors({});
		setSubmitted(parsed.data);
		setCopied(false);
		if (typeof window !== "undefined") try {
			window.location.href = buildMailtoHref(parsed.data);
		} catch {}
	};
	const handleCopy = async () => {
		if (!submitted) return;
		const summary = [
			`Subject: UrgentIQ Demo Request — ${submitted.organisation}`,
			"",
			submitted.message,
			"",
			"---",
			`Name: ${submitted.name}`,
			`Work Email: ${submitted.workEmail}`,
			`Hospital / Organisation: ${submitted.organisation}`,
			`Designation: ${submitted.designation}`
		].join("\n");
		try {
			await navigator.clipboard.writeText(summary);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	};
	const handleReset = () => {
		setForm(INITIAL_FORM);
		setActivePreset(PRELISTED_MESSAGES[0].id);
		setErrors({});
		setSubmitted(null);
		setCopied(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Request a Demo",
		title: "See How UrgentIQ Approaches Dynamic Triage",
		description: "Select a pre-written message or customise your note below to send an email demo request from your default mail client."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "note",
					className: "mb-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-soft p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-foreground",
						children: "Direct Email Client Dispatch — No Backend Connection"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted-foreground",
						children: "This demo request runs client-side with no intermediary backend server. Submitting validates your details and opens your default email client with your selected message and details ready to send."
					})] })]
				}), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-primary/25 bg-primary-soft p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-bold text-accent-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 shrink-0 text-primary" }), "Default Email Client Opened"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
								children: "Your default mail application has been launched with your request pre-filled. Please hit send in your email client to complete your request. If your mail app did not open automatically, click the button below or copy the message text."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid gap-3 rounded-xl border border-border bg-surface p-5 text-sm sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-semibold uppercase text-muted-foreground",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-0.5 font-semibold text-foreground",
									children: submitted.name
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-semibold uppercase text-muted-foreground",
									children: "Work Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-0.5 font-semibold text-foreground",
									children: submitted.workEmail
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-semibold uppercase text-muted-foreground",
									children: "Hospital / Organisation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-0.5 font-semibold text-foreground",
									children: submitted.organisation
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-semibold uppercase text-muted-foreground",
									children: "Designation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-0.5 font-semibold text-foreground",
									children: submitted.designation
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs font-semibold uppercase text-muted-foreground",
										children: "Message"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 whitespace-pre-wrap text-foreground",
										children: submitted.message
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: buildMailtoHref(submitted),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), "Open Email App Again"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: handleCopy,
									className: "font-semibold",
									children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Copied Message"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, { className: "h-4 w-4" }), " Copy Email Text"] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									onClick: handleReset,
									className: "font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Edit / Send Another Request"]
								})
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					noValidate: true,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "contact-name",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "contact-name",
										placeholder: "Dr. A. Sharma",
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										"aria-invalid": !!errors["name"]
									}),
									errors["name"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-critical",
										children: errors["name"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "contact-email",
										children: "Work Email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "contact-email",
										type: "email",
										placeholder: "name@hospital.org",
										value: form.workEmail,
										onChange: (e) => setForm({
											...form,
											workEmail: e.target.value
										}),
										"aria-invalid": !!errors["workEmail"]
									}),
									errors["workEmail"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-critical",
										children: errors["workEmail"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "contact-org",
										children: "Hospital / Organisation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "contact-org",
										placeholder: "City General Hospital",
										value: form.organisation,
										onChange: (e) => setForm({
											...form,
											organisation: e.target.value
										}),
										"aria-invalid": !!errors["organisation"]
									}),
									errors["organisation"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-critical",
										children: errors["organisation"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "contact-designation",
										children: "Designation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "contact-designation",
										placeholder: "ED Lead, Nursing Supervisor, Admin",
										value: form.designation,
										onChange: (e) => setForm({
											...form,
											designation: e.target.value
										}),
										"aria-invalid": !!errors["designation"]
									}),
									errors["designation"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-critical",
										children: errors["designation"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "contact-message",
										children: "Message"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Pre-listed templates (editable):"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									role: "group",
									"aria-label": "Pre-listed message templates",
									children: PRELISTED_MESSAGES.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setActivePreset(preset.id);
											setForm({
												...form,
												message: preset.text
											});
										},
										className: cn("rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer", activePreset === preset.id ? "border-primary bg-primary-soft text-accent-foreground" : "border-border bg-surface text-muted-foreground hover:bg-accent hover:text-foreground"),
										children: preset.label
									}, preset.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "contact-message",
									rows: 5,
									value: form.message,
									onChange: (e) => {
										setActivePreset("custom");
										setForm({
											...form,
											message: e.target.value
										});
									},
									"aria-invalid": !!errors["message"]
								}),
								errors["message"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-critical",
									children: errors["message"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "lg",
								className: "w-full font-semibold sm:w-auto",
								children: "Send"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "Submitting launches your device's default email client with your message pre-filled. Send the email from there directly — no backend or server connection is required."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: "What a Demo Covers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), "Live walkthrough of the prioritised ER queue and simulated patient detail view."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), "How vital-sign trends and deterioration cues are surfaced to clinicians."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), "Overview of the Smartwatch Vitals Lab prototype and pricing models."]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface space-y-3 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-stable" }), "Direct Email Dispatch"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "Demo requests launch directly in your default email application with zero intermediary servers or third-party storage. Existing team members can sign in to access the prototype dashboard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							className: "w-full font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Go to Dashboard Login"
							})
						})
					]
				})]
			})]
		})
	})] });
}
//#endregion
export { ContactPage as component };
