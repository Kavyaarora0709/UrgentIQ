import { i as __toESM } from "../_runtime.mjs";
import { a as patients, c as vitalsTrend, r as getPatient } from "./data-C77HYp37.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as FileText, Y as Clock, b as Send, m as Sparkles, u as TrendingUp, xt as Activity } from "../_libs/lucide-react.mjs";
import { _ as VitalCards, d as Button, f as Card, g as SeverityBadge, h as RiskCard, p as DemoNote, t as ActionsList, v as cn, y as sevStyles } from "./ui-BZnIHQM-.mjs";
import { c as useStore, n as addNote } from "./store-B_Jr4tEX.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TrendChart } from "./TrendChart-BnEYwSyv.mjs";
import { t as Textarea } from "./textarea-BYLohdEg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PatientDetailView-BCTrg5_4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PatientDetailView({ currentId = "P-1042" }) {
	const patient = getPatient(currentId) || patients[0];
	const notes = useStore((s) => s.notes).filter((n) => n.patientId === patient.id);
	const user = useStore((s) => s.user);
	const [noteText, setNoteText] = (0, import_react.useState)("");
	const [trendWindow, setTrendWindow] = (0, import_react.useState)(5);
	const trendData = vitalsTrend(patient, trendWindow);
	const handleSaveNote = (e) => {
		e.preventDefault();
		if (!noteText.trim()) return;
		addNote(patient.id, noteText.trim(), user?.name || "Dr. Harleen Kaur");
		setNoteText("");
		toast.success("Clinician note saved", { description: `Note added to ${patient.id}'s record.` });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-extrabold tracking-tight",
					children: "Patient Details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground",
					children: [
						"Full record for ",
						patient.id,
						" · ",
						patient.name
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "All patient data is simulated for demonstration." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 overflow-x-auto pb-1",
				role: "tablist",
				"aria-label": "Select patient",
				children: patients.map((p) => {
					const isCurrent = p.id === patient.id;
					const s = sevStyles[p.severity];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/patients",
						search: { id: p.id },
						className: cn("rounded-full border px-3 py-1 text-xs font-bold transition-all cursor-pointer", isCurrent ? "border-primary bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/40" : cn(s.soft, s.text, "border-transparent hover:border-border")),
						children: p.id
					}, p.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-extrabold tracking-tight",
									children: patient.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: patient.severity })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									patient.age,
									" yrs · ",
									patient.gender,
									" | Arrived ",
									patient.arrived,
									" (",
									patient.wait,
									" min ago)"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Wait time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-critical-soft px-2.5 py-1 font-extrabold text-critical",
									children: [patient.wait, " min"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-sm border-t pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold text-foreground",
									children: patient.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Chief complaint"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold text-foreground",
									children: patient.complaint
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Source"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground",
									children: patient.source
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Medical History"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-muted-foreground",
									children: patient.history && patient.history.length > 0 ? patient.history.join(" • ") : "None recorded"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 border-t pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-3 flex items-center justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-bold flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-primary" }),
										" Live Vitals",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-normal text-muted-foreground",
											children: "(simulated)"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalCards, { p: patient })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 font-bold text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), "Vitals Trend Analysis"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1 rounded-lg border bg-card p-0.5 text-xs",
									children: [
										1,
										5,
										30
									].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setTrendWindow(m),
										className: cn("rounded px-2.5 py-1 font-semibold transition-colors cursor-pointer", trendWindow === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
										children: m === 1 ? "1 min" : m === 5 ? "5 min" : "30 min"
									}, m))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
								data: trendData,
								height: 200
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
						p: patient,
						showFactors: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-4 flex items-center gap-2 font-bold text-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-primary" }), "Patient Timeline"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative ml-2 space-y-4 border-l-2 border-border pl-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-foreground",
											children: patient.arrived
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm text-muted-foreground",
											children: ["Arrived via ", patient.source]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-foreground",
											children: "+1 min"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm text-muted-foreground",
											children: "Triage vitals recorded"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-foreground",
											children: "+2 min"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm text-muted-foreground",
											children: [
												"AI risk estimate: ",
												patient.risk,
												"% — ",
												patient.severity.toUpperCase()
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-critical animate-pulse" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-critical",
											children: "Now"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-semibold text-foreground",
											children: "Waiting for physician review"
										})
									]
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "flex items-center gap-2 font-bold text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-primary" }), "Clinician Notes"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										notes.length,
										" note",
										notes.length === 1 ? "" : "s"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 mb-4 max-h-56 overflow-y-auto pr-1",
								children: notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground py-2",
									children: [
										"No notes recorded yet. Add the first clinician note for ",
										patient.id,
										"."
									]
								}) : notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border bg-surface p-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs text-muted-foreground mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: n.author
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.createdAt })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-foreground whitespace-pre-wrap",
										children: n.text
									})]
								}, n.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSaveNote,
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: noteText,
									onChange: (e) => setNoteText(e.target.value),
									rows: 3,
									placeholder: "Add clinician note, observations, or handover remarks…",
									className: "text-sm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									size: "sm",
									className: "w-full gap-2 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" }), " Save Note"]
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border bg-moderate-soft p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center gap-2 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), "Key Concerns"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1.5 text-sm",
									children: patient.concerns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-critical" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
									}, c))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionsList, { p: patient })]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { PatientDetailView as t };
