import { N as Lock, Q as ClipboardCheck, U as FileInput, V as Gauge, _ as ShieldCheck, _t as ArrowUpDown, f as Stethoscope, ft as Building2, g as SlidersHorizontal, ht as BellRing, l as TriangleAlert, u as TrendingUp, ut as ChartLine, xt as Activity, z as HeartPulse } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketing-data-BrMFZEGL.js
var CORE_CAPABILITIES = [
	{
		icon: HeartPulse,
		title: "Real-Time Patient Monitoring",
		description: "Consolidated view of waiting patients, complaints, and latest vital signs.",
		status: "Prototype Implemented",
		detail: "Demonstrated with simulated records and a BLE smartwatch heart-rate lab."
	},
	{
		icon: TriangleAlert,
		title: "Deterioration Detection",
		description: "Highlights physiological shifts that may warrant earlier clinical review.",
		status: "Prototype Implemented",
		detail: "Prototype threshold and baseline logic; clinical validation pending."
	},
	{
		icon: Gauge,
		title: "Dynamic Risk Scoring",
		description: "Updates patient risk indicators as new readings arrive over time.",
		status: "Prototype Implemented",
		detail: "Simulated risk scoring for workflow demonstration only."
	},
	{
		icon: ArrowUpDown,
		title: "Patient Queue Reprioritisation",
		description: "Orders the queue by evolving urgency rather than arrival time alone.",
		status: "Prototype Implemented",
		detail: "Filterable by severity tier and sortable by priority or wait time."
	},
	{
		icon: BellRing,
		title: "Intelligent Staff Alerts",
		description: "Surfaces actionable alerts with contributing factors and acknowledgement flow.",
		status: "Prototype Implemented",
		detail: "In-app alert queue implemented for demo; hospital paging planned."
	},
	{
		icon: TrendingUp,
		title: "Patient Trend Analysis",
		description: "Tracks multi-vital trajectories across 1-, 5-, and 30-minute windows.",
		status: "Prototype Implemented",
		detail: "Interactive trend charts integrated into the patient detail workspace."
	}
];
var WORKFLOW_STEPS = [
	{
		step: "01",
		icon: FileInput,
		title: "Patient Info Enters",
		description: "Complaints, intake context, and initial readings enter the system."
	},
	{
		step: "02",
		icon: Activity,
		title: "Vitals Processed",
		description: "HR, SpO₂, blood pressure, and respiratory rate are structured over time."
	},
	{
		step: "03",
		icon: ChartLine,
		title: "Risk Evaluated",
		description: "Trend logic flags physiological patterns indicating possible decline."
	},
	{
		step: "04",
		icon: SlidersHorizontal,
		title: "Priority Updated",
		description: "Risk indicators and queue ordering adapt as new data arrives."
	},
	{
		step: "05",
		icon: ClipboardCheck,
		title: "Staff Alerted",
		description: "Clinicians receive visual cues to reassess and decide next care steps."
	}
];
var AUDIENCES = [
	{
		icon: Stethoscope,
		title: "Emergency Physicians & Nurses",
		subtitle: "Bedside clarity",
		points: ["Spot vital-sign drift between periodic manual checks.", "Review multi-vital trends and risk factors at a glance."]
	},
	{
		icon: ClipboardCheck,
		title: "Emergency Department Managers",
		subtitle: "Shift visibility",
		points: ["Monitor waiting-room acuity and unacknowledged alerts live.", "Direct reassessment capacity where risk is rising."]
	},
	{
		icon: Building2,
		title: "Hospital Administrators",
		subtitle: "Operational fit",
		points: ["Designed as a decision-support layer alongside existing EHRs.", "Predictable fixed rental or usage-based deployment options."]
	}
];
var TRUST_PRINCIPLES = [
	{
		icon: Stethoscope,
		title: "Clinician-Led Judgement",
		description: "Built as decision support—qualified physicians and nurses always decide assessment and care."
	},
	{
		icon: BellRing,
		title: "Prompts, Not Diagnoses",
		description: "Alerts and risk scores are cues for clinical reassessment, not autonomous medical diagnoses."
	},
	{
		icon: ShieldCheck,
		title: "Prototype Boundaries",
		description: "Current prototype uses simulated patient data and is not a certified medical device."
	},
	{
		icon: Lock,
		title: "Privacy & Validation Path",
		description: "Production use requires formal hospital security review and clinical validation."
	}
];
//#endregion
export { WORKFLOW_STEPS as i, CORE_CAPABILITIES as n, TRUST_PRINCIPLES as r, AUDIENCES as t };
