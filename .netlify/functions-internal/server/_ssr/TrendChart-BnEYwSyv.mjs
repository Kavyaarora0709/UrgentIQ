import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as XAxis, f as ResponsiveContainer, i as YAxis, m as Legend, o as Line, p as Tooltip, r as LineChart, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TrendChart-BnEYwSyv.js
var import_jsx_runtime = require_jsx_runtime();
var SERIES = [
	{
		key: "hr",
		name: "Heart Rate",
		color: "var(--chart-1)"
	},
	{
		key: "spo2",
		name: "SpO₂",
		color: "var(--chart-2)"
	},
	{
		key: "sys",
		name: "Systolic BP",
		color: "var(--chart-3)"
	},
	{
		key: "rr",
		name: "Respiratory Rate",
		color: "var(--chart-4)"
	}
];
function TrendChart({ data, keys = [
	"hr",
	"spo2",
	"sys",
	"rr"
], height = 240 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 12,
					left: -16,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--border)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "time",
						tick: {
							fontSize: 11,
							fill: "var(--muted-foreground)"
						},
						tickLine: false,
						axisLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fontSize: 11,
							fill: "var(--muted-foreground)"
						},
						tickLine: false,
						axisLine: false,
						domain: ["auto", "auto"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						borderRadius: 10,
						border: "1px solid var(--border)",
						fontSize: 12
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
						iconType: "circle",
						iconSize: 8,
						wrapperStyle: { fontSize: 12 }
					}),
					SERIES.filter((s) => keys.includes(s.key)).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: s.key,
						name: s.name,
						stroke: s.color,
						strokeWidth: 2,
						dot: { r: 2 }
					}, s.key))
				]
			})
		})
	});
}
//#endregion
export { TrendChart as t };
