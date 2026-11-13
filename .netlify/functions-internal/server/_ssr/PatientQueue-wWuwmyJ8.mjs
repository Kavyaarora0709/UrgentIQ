import { i as __toESM } from "../_runtime.mjs";
import { a as patients, n as SEVERITY_RANK, t as SEVERITY_LABEL } from "./data-C77HYp37.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as SearchX, it as ChevronRight } from "../_libs/lucide-react.mjs";
import { g as SeverityBadge, v as cn, y as sevStyles } from "./ui-BZnIHQM-.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-uHT4_RDH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PatientQueue-wWuwmyJ8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PatientQueue({ search = "", limit, selectedId, onSelect }) {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("priority");
	const counts = (0, import_react.useMemo)(() => {
		const c = { all: patients.length };
		patients.forEach((p) => c[p.severity] = (c[p.severity] ?? 0) + 1);
		return c;
	}, []);
	const list = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return patients.filter((p) => filter === "all" || p.severity === filter).filter((p) => !q || [
			p.id,
			p.name,
			p.complaint
		].some((f) => f.toLowerCase().includes(q))).sort((a, b) => sort === "priority" ? SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] || a.wait - b.wait : b.wait - a.wait);
	}, [
		filter,
		sort,
		search
	]);
	const shown = limit ? list.slice(0, limit) : list;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex flex-wrap items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			role: "tablist",
			children: [
				"all",
				"critical",
				"high",
				"moderate",
				"low"
			].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				role: "tab",
				"aria-selected": filter === t,
				onClick: () => setFilter(t),
				className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", filter === t ? "border-primary bg-primary text-primary-foreground" : t === "all" ? "bg-surface text-foreground hover:bg-accent" : cn(sevStyles[t].soft, sevStyles[t].text, "border-transparent hover:border-border")),
				children: [
					t === "all" ? "All" : SEVERITY_LABEL[t],
					" (",
					counts[t] ?? 0,
					")"
				]
			}, t))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value: sort,
			onValueChange: (v) => setSort(v),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "h-8 w-[170px] text-xs",
				"aria-label": "Sort patients",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: "priority",
				children: "Sort by: Priority"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: "wait",
				children: "Sort by: Wait time"
			})] })]
		})]
	}), shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid place-items-center rounded-xl border border-dashed py-12 text-center text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "mb-2 h-8 w-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-foreground",
				children: "No patients found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Try a different search or filter."
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: shown.map((p, i) => {
			const s = sevStyles[p.severity];
			const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold", p.severity === "critical" ? "bg-critical text-primary-foreground" : cn(s.soft, s.text)),
					children: i + 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-24 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-bold",
						children: p.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							p.age,
							" yrs · ",
							p.gender
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1 truncate text-sm",
					children: p.complaint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, {
					severity: p.severity,
					className: "hidden sm:inline-flex"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-16 shrink-0 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-muted-foreground",
						children: "Wait"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("text-sm font-bold", p.severity === "critical" && "text-critical"),
						children: [p.wait, " min"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
			] });
			const cls = cn("flex w-full items-center gap-3 rounded-xl border border-l-4 px-3 py-2.5 text-left transition-shadow hover:shadow-md", s.bar, p.severity === "critical" ? "bg-critical-soft" : "bg-card", selectedId === p.id && "ring-2 ring-primary");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: onSelect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: cls,
				onClick: () => onSelect(p.id),
				"aria-label": `Select ${p.id}`,
				children: content
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/patients/$id",
				params: { id: p.id },
				className: cls,
				children: content
			}) }, p.id);
		})
	})] });
}
//#endregion
export { PatientQueue as t };
