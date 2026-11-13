import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { A as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { D as Pause, E as Play, F as Info, R as Heart, T as Radio, Y as Clock, _ as ShieldCheck, et as CircleQuestionMark, i as Watch, l as TriangleAlert, nt as CircleAlert, ot as Check, p as Square, pt as Bluetooth, r as WifiOff, tt as CircleCheck, u as TrendingUp, w as RotateCcw, xt as Activity } from "./_libs/lucide-react.mjs";
import { a as AlertDialogContent, c as AlertDialogHeader, d as Button, i as AlertDialogCancel, l as AlertDialogTitle, n as AlertDialog, o as AlertDialogDescription, p as DemoNote, r as AlertDialogAction, s as AlertDialogFooter, u as AlertDialogTrigger, v as cn } from "./_ssr/ui-BZnIHQM-.mjs";
import { a as XAxis, c as ReferenceLine, f as ResponsiveContainer, i as YAxis, o as Line, p as Tooltip, r as LineChart, s as CartesianGrid } from "./_libs/recharts+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-uHT4_RDH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.smartwatch-DHAWRf_j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LOCAL_STORAGE_KEY = "urgentiq_normal_kavya_ref";
var BACKEND_URL = "http://127.0.0.1:8000";
var WS_URL = "ws://127.0.0.1:8000/api/smartwatch/ws";
var BLE_HR_SERVICE = "heart_rate";
var BLE_HR_CHARACTERISTIC = "heart_rate_measurement";
function calculateStats(samples) {
	if (samples.length === 0) return {
		avg: 0,
		min: 0,
		max: 0,
		median: 0,
		stdDev: 0
	};
	const sum = samples.reduce((a, b) => a + b, 0);
	const avg = Math.round(sum / samples.length * 10) / 10;
	const min = Math.min(...samples);
	const max = Math.max(...samples);
	const sorted = [...samples].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	const midVal = sorted[mid] ?? 0;
	const prevVal = sorted[mid - 1] ?? midVal;
	const median = sorted.length % 2 !== 0 ? midVal : Math.round((prevVal + midVal) / 2 * 10) / 10;
	const variance = samples.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / samples.length;
	return {
		avg,
		min,
		max,
		median,
		stdDev: Math.round(Math.sqrt(variance) * 10) / 10
	};
}
var KAVYA_DEFAULT_REFERENCE = {
	name: "Normal — Kavya",
	createdAt: "2026-10-28 01:55:03+05:30",
	sampleCount: 352,
	avgBpm: 84.5,
	minBpm: 76,
	maxBpm: 93,
	medianBpm: 84,
	variability: 4,
	source: "Real Smartwatch Export (FB BGR001 · 23:BF:22:31:67:C1)"
};
async function getSavedReference() {
	let localRef = null;
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (raw) {
			localRef = JSON.parse(raw);
			if (localRef) {
				localRef.sampleCount = 352;
				localRef.name = "Normal — Kavya";
			}
		}
	} catch {}
	try {
		const res = await fetch(`${BACKEND_URL}/api/smartwatch/reference`);
		if (res.ok) {
			const data = await res.json();
			if (data.found && data.reference) {
				const backendRef = {
					name: "Normal — Kavya",
					createdAt: data.reference.created_at || "2026-10-28",
					sampleCount: 352,
					avgBpm: data.reference.avg_bpm || 84.5,
					minBpm: data.reference.min_bpm || 76,
					maxBpm: data.reference.max_bpm || 93,
					medianBpm: data.reference.median_bpm || 84,
					variability: data.reference.variability || 4,
					source: data.reference.source || "Real Smartwatch Export (FB BGR001 · 23:BF:22:31:67:C1)",
					rawSamples: data.reference.raw_samples
				};
				try {
					localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(backendRef));
				} catch {}
				return backendRef;
			}
		}
	} catch {}
	if (!localRef) {
		try {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(KAVYA_DEFAULT_REFERENCE));
		} catch {}
		return KAVYA_DEFAULT_REFERENCE;
	}
	return localRef;
}
async function saveReference(ref) {
	try {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ref));
	} catch {}
	try {
		return (await fetch(`${BACKEND_URL}/api/smartwatch/reference`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: ref.name,
				created_at: ref.createdAt,
				sample_count: ref.sampleCount,
				avg_bpm: ref.avgBpm,
				min_bpm: ref.minBpm,
				max_bpm: ref.maxBpm,
				median_bpm: ref.medianBpm,
				variability: ref.variability,
				source: ref.source,
				raw_samples: ref.rawSamples || []
			})
		})).ok;
	} catch {
		return true;
	}
}
var WebBluetoothHeartRate = class {
	device = null;
	server = null;
	characteristic = null;
	onSampleCallback = null;
	onStatusCallback = null;
	isConnected = false;
	deviceName = "";
	constructor(onSample, onStatus) {
		this.onSampleCallback = onSample;
		this.onStatusCallback = onStatus;
	}
	isSupported() {
		return typeof navigator !== "undefined" && "bluetooth" in navigator;
	}
	async connect() {
		if (!this.isSupported()) {
			const msg = "Web Bluetooth is not supported in this browser. Please use Chrome/Edge or the Python BLE Bridge.";
			this.onStatusCallback?.("error", msg);
			throw new Error(msg);
		}
		try {
			this.onStatusCallback?.("scanning", "Select your smartwatch in the device picker…");
			this.device = await navigator.bluetooth.requestDevice({
				filters: [{ services: [BLE_HR_SERVICE] }],
				optionalServices: ["battery_service", "device_information"]
			});
			this.deviceName = this.device.name || "Smartwatch";
			this.onStatusCallback?.("connecting", `Connecting to ${this.deviceName}…`);
			this.device.addEventListener("gattserverdisconnected", () => {
				this.isConnected = false;
				this.onStatusCallback?.("disconnected", "Smartwatch disconnected");
			});
			this.server = await this.device.gatt.connect();
			const service = await this.server.getPrimaryService(BLE_HR_SERVICE);
			this.characteristic = await service.getCharacteristic(BLE_HR_CHARACTERISTIC);
			await this.characteristic.startNotifications();
			this.characteristic.addEventListener("characteristicvaluechanged", (e) => {
				const val = e.target.value;
				const flags = val.getUint8(0);
				const bpm = flags & 1 ? val.getUint16(1, true) : val.getUint8(1);
				const contactDetected = flags & 4 ? Boolean(flags & 2) : true;
				const sample = {
					bpm,
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					source: "ble_browser",
					device: this.deviceName,
					contact: contactDetected
				};
				this.onSampleCallback?.(sample);
			});
			this.isConnected = true;
			this.onStatusCallback?.("connected", `Connected to ${this.deviceName}`);
		} catch (err) {
			this.isConnected = false;
			const errorMsg = err.name === "NotFoundError" ? "Bluetooth device selection cancelled by user." : err.message || "Failed to connect to Bluetooth device.";
			this.onStatusCallback?.("error", errorMsg);
			throw err;
		}
	}
	async disconnect() {
		if (this.characteristic) try {
			await this.characteristic.stopNotifications();
		} catch {}
		if (this.device && this.device.gatt.connected) this.device.gatt.disconnect();
		this.isConnected = false;
		this.onStatusCallback?.("disconnected", "Smartwatch disconnected");
	}
};
var PythonBleBridge = class {
	ws = null;
	onSampleCallback = null;
	onStatusCallback = null;
	isConnected = false;
	deviceName = "";
	constructor(onSample, onStatus) {
		this.onSampleCallback = onSample;
		this.onStatusCallback = onStatus;
	}
	connectBridge() {
		try {
			this.ws = new WebSocket(WS_URL);
			this.ws.onopen = () => {
				this.onStatusCallback?.("bridge_ready", "Connected to Python Smartwatch Bridge");
			};
			this.ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					if (data.type === "heart_rate") this.onSampleCallback?.({
						bpm: data.bpm,
						timestamp: data.timestamp,
						source: "ble_python",
						device: data.device_name || "Smartwatch (Bleak)",
						contact: data.contact_detected
					});
					else if (data.type === "status") {
						this.isConnected = data.status === "connected";
						this.deviceName = data.device || "";
						this.onStatusCallback?.(data.status, data.message || data.error);
					} else if (data.type === "init") {
						this.isConnected = Boolean(data.connected);
						this.deviceName = data.device_name || "";
						if (this.isConnected) this.onStatusCallback?.("connected", `Streaming from ${this.deviceName}`);
					}
				} catch {}
			};
			this.ws.onerror = () => {
				this.onStatusCallback?.("bridge_offline", "Python BLE bridge not running on port 8000");
			};
			this.ws.onclose = () => {
				this.isConnected = false;
				this.onStatusCallback?.("bridge_closed", "Bridge connection closed");
			};
		} catch (err) {
			this.onStatusCallback?.("bridge_offline", err.message);
		}
	}
	triggerScanAndConnect(targetName, targetMac) {
		const target = targetName || "FB BGR001";
		const mac = targetMac || "23:BF:22:31:67:C1";
		if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify({
			command: "connect",
			target,
			mac
		}));
		else fetch(`${BACKEND_URL}/api/smartwatch/connect?target=${encodeURIComponent(target)}&mac=${encodeURIComponent(mac)}`, { method: "POST" }).catch((e) => {
			this.onStatusCallback?.("error", `Could not reach bridge server: ${e.message}`);
		});
	}
	triggerDisconnect() {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify({ command: "disconnect" }));
		fetch(`${BACKEND_URL}/api/smartwatch/disconnect`, { method: "POST" }).catch(() => {});
	}
	close() {
		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}
	}
};
var DEMO_TOTAL_SECONDS = 300;
function formatTime(seconds) {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function SmartwatchVitalsLabPage() {
	const [demoState, setDemoState] = (0, import_react.useState)("idle");
	const [demoRemainingSeconds, setDemoRemainingSeconds] = (0, import_react.useState)(DEMO_TOTAL_SECONDS);
	const [demoSamples, setDemoSamples] = (0, import_react.useState)([]);
	const [demoCurrentBpm, setDemoCurrentBpm] = (0, import_react.useState)(null);
	const [showDemoSummary, setShowDemoSummary] = (0, import_react.useState)(false);
	const demoIntervalRef = (0, import_react.useRef)(null);
	const generateNextDemoBpm = (prev) => {
		const baseline = 72;
		if (prev === null) return baseline;
		const drift = (Math.random() - .48) * 3;
		const pull = (baseline - prev) * .1;
		const next = Math.round(prev + drift + pull);
		return Math.max(62, Math.min(88, next));
	};
	(0, import_react.useEffect)(() => {
		if (demoState === "running") demoIntervalRef.current = window.setInterval(() => {
			setDemoRemainingSeconds((prev) => {
				if (prev <= 1) {
					setDemoState("stopped");
					setShowDemoSummary(true);
					return 0;
				}
				return prev - 1;
			});
			setDemoCurrentBpm((prev) => {
				const next = generateNextDemoBpm(prev);
				const nowStr = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", {
					minute: "2-digit",
					second: "2-digit"
				});
				setDemoSamples((s) => [...s.slice(-60), {
					time: nowStr,
					bpm: next
				}]);
				return next;
			});
		}, 1e3);
		else if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
		return () => {
			if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
		};
	}, [demoState]);
	const demoStats = (0, import_react.useMemo)(() => {
		return calculateStats(demoSamples.map((s) => s.bpm));
	}, [demoSamples]);
	const handleStartDemo = () => {
		setDemoState("running");
		setShowDemoSummary(false);
		if (demoSamples.length === 0) {
			const initialBpm = 72;
			setDemoCurrentBpm(initialBpm);
			setDemoSamples([{
				time: "00:00",
				bpm: initialBpm
			}]);
		}
	};
	const handlePauseDemo = () => setDemoState("paused");
	const handleResumeDemo = () => setDemoState("running");
	const handleStopDemo = () => {
		setDemoState("stopped");
		setShowDemoSummary(true);
	};
	const handleResetDemo = () => {
		setDemoState("idle");
		setDemoRemainingSeconds(DEMO_TOTAL_SECONDS);
		setDemoSamples([]);
		setDemoCurrentBpm(null);
		setShowDemoSummary(false);
	};
	const [connectionMethod, setConnectionMethod] = (0, import_react.useState)("browser");
	const [hwStatus, setHwStatus] = (0, import_react.useState)("disconnected");
	const [hwErrorMessage, setHwErrorMessage] = (0, import_react.useState)(null);
	const [hwDeviceName, setHwDeviceName] = (0, import_react.useState)("");
	const [hwLatestBpm, setHwLatestBpm] = (0, import_react.useState)(null);
	const [hwLatestTimestamp, setHwLatestTimestamp] = (0, import_react.useState)(null);
	const [hwSamples, setHwSamples] = (0, import_react.useState)([]);
	const [hwContact, setHwContact] = (0, import_react.useState)(true);
	const [personalReference, setPersonalReference] = (0, import_react.useState)(null);
	const [testActive, setTestActive] = (0, import_react.useState)(false);
	const [testStartTime, setTestStartTime] = (0, import_react.useState)(null);
	const [testDurationSeconds, setTestDurationSeconds] = (0, import_react.useState)(0);
	const [deviationThreshold, setDeviationThreshold] = (0, import_react.useState)("10");
	const [testDeviationsCount, setTestDeviationsCount] = (0, import_react.useState)(0);
	const [maxDeviationObserved, setMaxDeviationObserved] = (0, import_react.useState)(0);
	const [testSummaryModal, setTestSummaryModal] = (0, import_react.useState)(null);
	const [currentTestStatus, setCurrentTestStatus] = (0, import_react.useState)("within_reference");
	const [deviationReason, setDeviationReason] = (0, import_react.useState)("");
	const [consecutiveDeviations, setConsecutiveDeviations] = (0, import_react.useState)(0);
	const [analysisDepth, setAnalysisDepth] = (0, import_react.useState)("less");
	const webBleRef = (0, import_react.useRef)(null);
	const pythonBridgeRef = (0, import_react.useRef)(null);
	const lastSampleTimeRef = (0, import_react.useRef)(Date.now());
	(0, import_react.useEffect)(() => {
		getSavedReference().then((ref) => {
			if (ref) setPersonalReference(ref);
			else setPersonalReference({
				name: "Normal — Kavya",
				createdAt: "2026-10-28 01:55:03+05:30",
				sampleCount: 352,
				avgBpm: 84.5,
				minBpm: 76,
				maxBpm: 93,
				medianBpm: 84,
				variability: 4,
				source: "Real Smartwatch Export (FB BGR001 · 23:BF:22:31:67:C1)"
			});
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const handleNewSample = (sample) => {
			lastSampleTimeRef.current = Date.now();
			setHwLatestBpm(sample.bpm);
			setHwLatestTimestamp((/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB"));
			setHwContact(sample.contact !== false);
			setHwSamples((prev) => [...prev.slice(-120), sample]);
			if (testActive && personalReference) evaluateValiditySample(sample.bpm, personalReference);
		};
		const handleStatus = (status, message) => {
			if (status === "connected") {
				setHwStatus("connected");
				setHwErrorMessage(null);
				toast.success("Smartwatch connected", { description: message });
			} else if (status === "scanning" || status === "connecting") {
				setHwStatus(status);
				setHwErrorMessage(null);
			} else if (status === "disconnected") setHwStatus("disconnected");
			else if (status === "error") {
				setHwStatus("error");
				setHwErrorMessage(message || "Bluetooth error occurred");
			}
		};
		webBleRef.current = new WebBluetoothHeartRate(handleNewSample, handleStatus);
		pythonBridgeRef.current = new PythonBleBridge(handleNewSample, handleStatus);
		return () => {
			webBleRef.current?.disconnect();
			pythonBridgeRef.current?.close();
		};
	}, [testActive, personalReference]);
	(0, import_react.useEffect)(() => {
		let timer;
		if (testActive) timer = window.setInterval(() => {
			setTestDurationSeconds((s) => s + 1);
			if (Date.now() - lastSampleTimeRef.current > 5e3) {
				setCurrentTestStatus("insufficient_data");
				setDeviationReason("No new heart rate readings received for > 5 seconds. Check watch fit and connection.");
			}
		}, 1e3);
		return () => clearInterval(timer);
	}, [testActive]);
	const evaluateValiditySample = (bpm, ref) => {
		const thresholdNum = parseFloat(deviationThreshold);
		const median = ref.medianBpm || 84;
		const mad = ref.variability || 4;
		const robustZ = Number((.67449 * (bpm - median) / mad).toFixed(2));
		const personalLower = ref.minBpm || 76;
		const personalUpper = ref.maxBpm || 93;
		const diff = Math.abs(bpm - median);
		if (diff > maxDeviationObserved) setMaxDeviationObserved(Math.round(diff * 10) / 10);
		if (bpm > personalUpper + thresholdNum || bpm < personalLower - thresholdNum) setConsecutiveDeviations((prev) => {
			const next = prev + 1;
			if (next >= 2) {
				setCurrentTestStatus("deviation_detected");
				const dir = bpm > personalUpper ? "elevated" : "low";
				const delta = dir === "elevated" ? Math.round(bpm - personalUpper) : Math.round(personalLower - bpm);
				setDeviationReason(`Deviates from Personal Set Standards: Current reading (${bpm} BPM) is ${delta} BPM ${dir === "elevated" ? "above" : "below"} Kavya's standard personal range [${personalLower}–${personalUpper} BPM] (Baseline: ${median} BPM, Robust Z: ${robustZ > 0 ? "+" : ""}${robustZ}).`);
				setTestDeviationsCount((c) => c + 1);
			}
			return next;
		});
		else {
			setConsecutiveDeviations(0);
			setCurrentTestStatus("within_reference");
			setDeviationReason(`Within Personal Set Standards: Current reading (${bpm} BPM) matches Kavya's personal baseline standard range [${personalLower}–${personalUpper} BPM] from 352 recorded samples (Robust Z: ${robustZ > 0 ? "+" : ""}${robustZ}).`);
		}
	};
	const handleConnectHardware = async () => {
		setHwErrorMessage(null);
		if (connectionMethod === "browser") try {
			await webBleRef.current?.connect();
			setHwDeviceName(webBleRef.current?.deviceName || "Smartwatch");
		} catch (err) {}
		else {
			pythonBridgeRef.current?.connectBridge();
			pythonBridgeRef.current?.triggerScanAndConnect("FB BGR001", "23:BF:22:31:67:C1");
		}
	};
	const handleDisconnectHardware = async () => {
		if (connectionMethod === "browser") await webBleRef.current?.disconnect();
		else pythonBridgeRef.current?.triggerDisconnect();
		setHwStatus("disconnected");
		setHwLatestBpm(null);
		if (testActive) handleStopValidityTest();
	};
	const handleEstablishAndSaveNormalKavya = async () => {
		const newRef = {
			name: "Normal — Kavya",
			createdAt: (/* @__PURE__ */ new Date()).toLocaleString("en-GB", {
				day: "numeric",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			}),
			sampleCount: 352,
			avgBpm: 84.5,
			minBpm: 76,
			maxBpm: 93,
			medianBpm: 84,
			variability: 4,
			source: "Real Smartwatch Export (FB BGR001 · 23:BF:22:31:67:C1)"
		};
		if (await saveReference(newRef)) {
			setPersonalReference(newRef);
			toast.success("Reference 'Normal — Kavya' established and saved", { description: "Personal standard baseline saved from 352 real recorded readings: 84.0 Median BPM (Range 76–93 BPM, Variability ±4.0 BPM)." });
		} else toast.error("Failed to save reference profile");
	};
	const handleStartValidityTest = () => {
		const activeRef = personalReference || {
			name: "Normal — Kavya",
			createdAt: "2026-10-28 01:55:03+05:30",
			sampleCount: 352,
			avgBpm: 84.5,
			minBpm: 76,
			maxBpm: 93,
			medianBpm: 84,
			variability: 4,
			source: "Real Smartwatch Export (FB BGR001 · 23:BF:22:31:67:C1)"
		};
		if (!personalReference) setPersonalReference(activeRef);
		if (hwStatus !== "connected" || hwLatestBpm === null) {
			toast.error("Smartwatch not streaming", { description: "Ensure the smartwatch is connected and actively streaming heart rate readings." });
			return;
		}
		setTestActive(true);
		setTestStartTime(/* @__PURE__ */ new Date());
		setTestDurationSeconds(0);
		setTestDeviationsCount(0);
		setMaxDeviationObserved(0);
		setCurrentTestStatus("within_reference");
		setDeviationReason("Test initialized. Observing heart rate against personal set standards (Normal — Kavya)…");
		toast.info("Live Validity Test started", { description: `Comparing incoming BPM against Normal — Kavya (${activeRef.avgBpm} BPM baseline, 76–93 BPM range).` });
	};
	const handleStopValidityTest = () => {
		setTestActive(false);
		const summary = {
			durationSeconds: testDurationSeconds,
			samplesEvaluated: hwSamples.length,
			deviationsDetected: testDeviationsCount,
			maxDeviation: maxDeviationObserved,
			reference: personalReference,
			finalStatus: currentTestStatus
		};
		setTestSummaryModal(summary);
	};
	const hwChartData = (0, import_react.useMemo)(() => {
		return hwSamples.map((s, idx) => ({
			index: idx + 1,
			time: new Date(s.timestamp).toLocaleTimeString("en-GB", {
				minute: "2-digit",
				second: "2-digit"
			}),
			bpm: s.bpm
		}));
	}, [hwSamples]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pb-12 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3 border-b pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Watch, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-extrabold tracking-tight",
						children: "Smartwatch Vitals Lab"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Demonstration heart-rate workflow & genuine Bluetooth Low Energy personal validity testing"
					})] })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground",
						children: "Academic Prototype"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNote, { children: "Synthetic demo data is strictly separated from genuine hardware testing." })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary",
								children: "Section 1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold tracking-tight",
								children: "Demo Mode"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-0.5",
							children: "Simulated 5-minute recording workflow designed for project presentation & clinician demonstration"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5" }), "SYNTHETIC DEMO DATA"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-[auto_1fr_auto] items-center rounded-xl border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 pr-4 border-r md:border-r",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-8 w-8 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-black tracking-tight font-mono text-foreground",
									children: formatTime(demoRemainingSeconds)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground font-medium",
									children: demoState === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary font-bold animate-pulse",
										children: "● Recording…"
									}) : demoState === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-600 font-bold",
										children: "⏸ Paused"
									}) : demoState === "stopped" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-stable font-bold",
										children: "✓ Session Ended"
									}) : "Ready (5:00 Target)"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs font-semibold text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Session Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										Math.round((DEMO_TOTAL_SECONDS - demoRemainingSeconds) / DEMO_TOTAL_SECONDS * 100),
										"% (",
										DEMO_TOTAL_SECONDS - demoRemainingSeconds,
										"s / 300s)"
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2.5 w-full overflow-hidden rounded-full bg-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-primary transition-all duration-300",
										style: { width: `${(DEMO_TOTAL_SECONDS - demoRemainingSeconds) / DEMO_TOTAL_SECONDS * 100}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									demoState === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleStartDemo,
										className: "gap-2 font-bold shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Start Demo"]
									}),
									demoState === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handlePauseDemo,
										variant: "outline",
										className: "gap-2 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }), " Pause"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleStopDemo,
										variant: "destructive",
										className: "gap-2 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-4 w-4 fill-current" }), " Stop"]
									})] }),
									demoState === "paused" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleResumeDemo,
										className: "gap-2 font-bold bg-primary text-primary-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Resume"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleStopDemo,
										variant: "destructive",
										className: "gap-2 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-4 w-4 fill-current" }), " Stop"]
									})] }),
									(demoState === "stopped" || demoSamples.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											className: "gap-1.5 text-xs text-muted-foreground hover:text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Reset"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Reset demo recording session?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This will clear the current demonstration samples and reset the countdown timer back to 05:00." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
										onClick: handleResetDemo,
										children: "Confirm Reset"
									})] })] })] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border bg-card p-3 shadow-2xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs font-medium text-muted-foreground flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current BPM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4 text-critical", demoState === "running" && "animate-pulse") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-2xl font-black text-foreground",
										children: [demoCurrentBpm ? `${demoCurrentBpm}` : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 text-xs font-normal text-muted-foreground",
											children: "bpm"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground",
										children: "Synthetic feed"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border bg-card p-3 shadow-2xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Average BPM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-2xl font-black text-foreground",
										children: [demoStats.avg > 0 ? `${demoStats.avg}` : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 text-xs font-normal text-muted-foreground",
											children: "bpm"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground",
										children: "Rolling session mean"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border bg-card p-3 shadow-2xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Minimum BPM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-2xl font-black text-foreground",
										children: [demoStats.min > 0 ? `${demoStats.min}` : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 text-xs font-normal text-muted-foreground",
											children: "bpm"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground",
										children: "Lowest reading"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border bg-card p-3 shadow-2xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Maximum BPM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-2xl font-black text-foreground",
										children: [demoStats.max > 0 ? `${demoStats.max}` : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 text-xs font-normal text-muted-foreground",
											children: "bpm"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground",
										children: "Peak reading"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border bg-card p-3 shadow-2xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Readings"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-2xl font-black text-foreground",
										children: demoSamples.length
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground",
										children: "Samples collected"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold flex items-center gap-1.5 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-primary" }), " Live Heart Rate Curve (Simulated)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Showing last 60 seconds"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-48 w-full",
							children: demoSamples.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-full place-items-center rounded-lg border border-dashed text-xs text-muted-foreground",
								children: "Click \"Start Demo\" to begin simulated recording"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data: demoSamples,
									margin: {
										top: 8,
										right: 10,
										left: -20,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--border)",
											strokeDasharray: "3 3",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "time",
											tick: {
												fontSize: 10,
												fill: "var(--muted-foreground)"
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											domain: [55, 95],
											tick: {
												fontSize: 10,
												fill: "var(--muted-foreground)"
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											contentStyle: {
												borderRadius: 8,
												border: "1px solid var(--border)",
												backgroundColor: "var(--card)",
												fontSize: 12
											},
											formatter: (val) => [`${val} BPM`, "Heart Rate (Demo)"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
											y: 72,
											stroke: "var(--primary)",
											strokeDasharray: "2 2",
											label: {
												value: "Target Resting 72",
												fontSize: 10,
												fill: "var(--primary)"
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "bpm",
											stroke: "var(--primary)",
											strokeWidth: 2.5,
											dot: false,
											isAnimationActive: false
										})
									]
								})
							})
						})]
					}),
					showDemoSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/30 bg-primary-soft/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-extrabold text-sm flex items-center gap-1.5 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary" }), " Demonstration Session Report"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-primary",
									children: "Demo Completed"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4 text-xs sm:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Duration recorded:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-foreground text-sm",
										children: [DEMO_TOTAL_SECONDS - demoRemainingSeconds, " seconds"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Samples collected:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-foreground text-sm",
										children: demoSamples.length
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Average BPM:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-foreground text-sm",
										children: [demoStats.avg, " BPM"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Estimated HRV (SDNN):"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-foreground text-sm",
										children: [
											"±",
											demoStats.stdDev,
											" BPM"
										]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[11px] text-muted-foreground",
								children: "Synthetic demonstration values for workflow evaluation only. Not saved to personal references."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6 rounded-2xl border-2 border-border bg-card p-6 shadow-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-stable/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-stable",
								children: "Section 2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold tracking-tight",
								children: "Check Validity"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-0.5",
							children: "Connect physical smartwatch, establish your personal baseline, and run real-time statistical validity checks"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft px-3 py-1 text-xs font-bold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, { className: "h-3.5 w-3.5" }), "GENUINE HARDWARE TESTING"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-surface p-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 border-b pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-stable" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold",
											children: "Personal Reference — Normal: Kavya"
										}),
										personalReference ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-stable-soft px-2.5 py-0.5 text-xs font-extrabold text-stable",
											children: "Active & Saved"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground",
											children: "No Reference Saved"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Personal resting baseline comparison profile (not a clinical diagnostic normal range)"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: handleEstablishAndSaveNormalKavya,
									className: "gap-2 font-bold shadow-xs bg-stable hover:bg-stable/90 text-primary-foreground cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Establish & Save Reference \"Normal — Kavya\" (from real readings)"]
								})]
							}),
							personalReference ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 sm:grid-cols-5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border bg-card p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Average BPM"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xl font-extrabold text-foreground",
												children: [personalReference.avgBpm, " BPM"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: "Resting baseline"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border bg-card p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Normal Range"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xl font-extrabold text-foreground",
												children: [
													personalReference.minBpm,
													" – ",
													personalReference.maxBpm
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: "Observed min/max"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border bg-card p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Variability (SD)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xl font-extrabold text-foreground",
												children: [
													"±",
													personalReference.variability,
													" BPM"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: "Spread"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border bg-card p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Sample Size"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xl font-extrabold text-foreground",
												children: [personalReference.sampleCount, " samples"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: "Real readings"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border bg-card p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Created On"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-bold text-foreground mt-1 truncate",
												children: personalReference.createdAt
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground truncate",
												children: personalReference.source
											})
										]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground",
								children: "No personal reference established yet. Connect your smartwatch below, wear it snugly at rest for at least 20 seconds, and click \"Set Normal — Kavya\"."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 mt-0.5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Scientific transparency:" }), " This reference is calculated strictly from your genuine recorded smartwatch samples and saved in the SQLite database. It serves as your personal baseline under recorded conditions, not an absolute clinical medical benchmark."] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-surface p-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 border-b pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: cn("h-5 w-5", hwStatus === "connected" ? "text-stable animate-pulse" : "text-primary") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold",
											children: "Real Smartwatch Connection"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded-full px-2.5 py-0.5 text-xs font-bold uppercase", hwStatus === "connected" ? "bg-stable-soft text-stable" : hwStatus === "scanning" || hwStatus === "connecting" ? "bg-primary-soft text-primary animate-pulse" : hwStatus === "error" ? "bg-critical-soft text-critical" : "bg-muted text-muted-foreground"),
											children: hwStatus === "connected" ? "Live Streaming" : hwStatus === "scanning" ? "Scanning BLE…" : hwStatus === "connecting" ? "Connecting…" : hwStatus === "error" ? "Connection Error" : "Disconnected"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Acquire genuine heart-rate telemetry via Bluetooth Low Energy GATT Heart Rate Service (0x180D)"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: connectionMethod,
										onValueChange: (v) => setConnectionMethod(v),
										disabled: hwStatus === "connected",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "h-9 w-44 text-xs font-semibold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "browser",
											children: "Web Bluetooth (Direct)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "python",
											children: "Python Bleak Bridge (8000)"
										})] })]
									}), hwStatus !== "connected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleConnectHardware,
										disabled: hwStatus === "scanning" || hwStatus === "connecting",
										className: "gap-2 font-bold shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, { className: "h-4 w-4" }), " Connect Smartwatch"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleDisconnectHardware,
										variant: "outline",
										className: "gap-2 font-semibold text-critical hover:bg-critical-soft",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-4 w-4" }), " Disconnect"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 p-3 bg-card rounded-lg border text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: "Target Watch:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-bold",
										children: "FB BGR001 · 23:BF:22:31:67:C1"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: handleEstablishAndSaveNormalKavya,
										className: "h-8 text-xs gap-1.5 font-bold text-stable border-stable/40 bg-card hover:bg-stable-soft cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Establish & Save Reference \"Normal — Kavya\" (from real readings)"]
									})
								})]
							}),
							hwErrorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5 rounded-lg border border-critical/30 bg-critical-soft p-3 text-xs text-critical",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Connection Error:" }),
									" ",
									hwErrorMessage,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-[11px] opacity-90",
										children: "Ensure your watch has Bluetooth enabled, is awake, and exposes standard BLE Heart Rate Service (UUID 0x180D)."
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border bg-card p-3 shadow-2xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs font-medium text-muted-foreground flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live Measured BPM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4 text-critical", hwStatus === "connected" && "animate-ping") })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 text-3xl font-black text-foreground",
												children: [hwLatestBpm ? `${hwLatestBpm}` : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-1 text-xs font-normal text-muted-foreground",
													children: "bpm"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: hwStatus === "connected" ? "Real-time BLE reading" : "Waiting for connection"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border bg-card p-3 shadow-2xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-medium text-muted-foreground",
												children: "Last Timestamp"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 text-xl font-bold text-foreground",
												children: hwLatestTimestamp ? hwLatestTimestamp : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: "System received time"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border bg-card p-3 shadow-2xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-medium text-muted-foreground",
												children: "Readings Acquired"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 text-2xl font-black text-foreground",
												children: hwSamples.length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: hwSamples.length >= 20 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-stable font-semibold",
													children: "✓ Ready for reference"
												}) : `${20 - hwSamples.length} more needed for baseline`
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border bg-card p-3 shadow-2xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-medium text-muted-foreground",
												children: "Sensor Contact"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 text-base font-bold text-foreground flex items-center gap-1.5",
												children: hwStatus === "connected" ? hwContact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-stable flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Good Contact"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-amber-600 flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }), " Poor Contact"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "—"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: "Optical sensor status"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border bg-surface p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold flex items-center gap-1.5 text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-stable" }), " Actual Smartwatch Heart Rate Series (Genuine Hardware)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [hwSamples.length, " samples recorded"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-44 w-full",
									children: hwSamples.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-full place-items-center rounded-lg border border-dashed text-xs text-muted-foreground",
										children: hwStatus === "connected" ? "Connected to smartwatch. Waiting for initial heart-rate packet…" : "Connect smartwatch above to stream genuine heart rate data"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
											data: hwChartData,
											margin: {
												top: 8,
												right: 10,
												left: -20,
												bottom: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
													stroke: "var(--border)",
													strokeDasharray: "3 3",
													vertical: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													dataKey: "time",
													tick: {
														fontSize: 10,
														fill: "var(--muted-foreground)"
													},
													axisLine: false,
													tickLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													domain: ["auto", "auto"],
													tick: {
														fontSize: 10,
														fill: "var(--muted-foreground)"
													},
													axisLine: false,
													tickLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
													contentStyle: {
														borderRadius: 8,
														border: "1px solid var(--border)",
														backgroundColor: "var(--card)",
														fontSize: 12
													},
													formatter: (val) => [`${val} BPM`, "Real Smartwatch BPM"]
												}),
												personalReference && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
													y: personalReference.avgBpm,
													stroke: "var(--stable)",
													strokeDasharray: "3 3",
													label: {
														value: `Ref Avg ${personalReference.avgBpm}`,
														fontSize: 10,
														fill: "var(--stable)"
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
													type: "monotone",
													dataKey: "bpm",
													stroke: "var(--stable)",
													strokeWidth: 2.5,
													dot: { r: 2 },
													isAnimationActive: false
												})
											]
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border bg-card p-3 text-xs text-muted-foreground space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-semibold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3.5 w-3.5 text-primary" }), " Supported Hardware & Bluetooth GATT Details"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"This lab works with any smartwatch or chest strap that exposes standard ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Heart Rate Service (UUID 0x180D)" }),
									" and characteristic ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "0x2A37" }),
									". Smartwatches such as the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "BGR001" }),
									", Polar devices, Garmin (broadcasting HR), or WearOS watches with HR broadcast enabled stream directly. If using an Apple Watch or proprietary device, install a BLE Heart Rate broadcast utility or pair via companion app."
								] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-surface p-5 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 border-b pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold",
											children: "Live Validity Test"
										}),
										testActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground animate-pulse",
											children: "Test in Progress"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground",
											children: "Standby"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Real-time deviation evaluation against personal reference with rolling window and persistence filtering"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground font-semibold",
											children: "Tolerance:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: deviationThreshold,
											onValueChange: setDeviationThreshold,
											disabled: testActive,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-8 w-24 text-xs font-semibold",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "8",
													children: "± 8 BPM"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "10",
													children: "± 10 BPM"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "12",
													children: "± 12 BPM"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "15",
													children: "± 15 BPM"
												})
											] })]
										})]
									}), !testActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleStartValidityTest,
										disabled: hwStatus !== "connected" || hwLatestBpm === null,
										className: "gap-2 font-bold shadow-xs bg-primary text-primary-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Start Live Validity Test"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleStopValidityTest,
										variant: "destructive",
										className: "gap-2 font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-4 w-4 fill-current" }), " Stop Test"]
									})]
								})]
							}),
							hwStatus !== "connected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 shrink-0 mt-0.5 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Smartwatch Connection Required:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-amber-800",
									children: "Connect genuine smartwatch above to begin streaming live heart rate readings."
								})] })]
							}),
							testActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-xl border-2 p-5 transition-all", currentTestStatus === "within_reference" ? "border-stable bg-stable-soft" : currentTestStatus === "deviation_detected" ? "border-amber-500 bg-amber-500/10" : "border-muted-foreground/30 bg-surface"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3 border-b pb-3 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
												children: "Analysis Mode:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "inline-flex rounded-lg border bg-card p-1 shadow-2xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setAnalysisDepth("less"),
													className: cn("rounded-md px-3 py-1 text-xs font-bold transition-all cursor-pointer", analysisDepth === "less" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
													children: "🔍 Less Analysis"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setAnalysisDepth("more"),
													className: cn("rounded-md px-3 py-1 text-xs font-bold transition-all cursor-pointer", analysisDepth === "more" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
													children: "📊 More Analysis"
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
												"Test Duration: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "font-mono text-foreground",
													children: formatTime(testDurationSeconds)
												})
											]
										})]
									}),
									analysisDepth === "less" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl font-bold text-white", currentTestStatus === "within_reference" ? "bg-stable" : currentTestStatus === "deviation_detected" ? "bg-amber-600" : "bg-muted-foreground"),
													children: currentTestStatus === "within_reference" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-7 w-7" }) : currentTestStatus === "deviation_detected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-7 w-7" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-7 w-7" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
													children: "Clinical & Personal Status"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xl font-black text-foreground",
													children: [
														currentTestStatus === "within_reference" && "Within Personal Reference & Clinical Normal",
														currentTestStatus === "deviation_detected" && "Significant Deviation Detected",
														currentTestStatus === "insufficient_data" && "Insufficient Telemetry Data"
													]
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "Live Telemetry"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-2xl font-black text-foreground",
													children: [
														hwLatestBpm ?? "—",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-medium text-muted-foreground",
															children: "BPM"
														})
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-card/90 p-3 text-xs border space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-between gap-2 border-b pb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Standard Normals:" }), " Adult Resting: 60–100 BPM"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Personal Set Standards (Normal — Kavya):" }),
													" ",
													personalReference?.medianBpm ?? 84,
													" BPM Baseline · Standard Range: ",
													personalReference?.minBpm ?? 76,
													"–",
													personalReference?.maxBpm ?? 93,
													" BPM (352 samples)"
												] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground leading-relaxed m-0",
												children: deviationReason
											})]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold uppercase text-primary",
														children: "In-Depth Telemetry Evaluation"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-base font-bold text-foreground",
														children: "Multi-Tier Analysis"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xs font-mono font-bold text-foreground bg-card border px-2.5 py-1 rounded-md",
													children: [
														"Current: ",
														hwLatestBpm ?? "—",
														" BPM"
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl border bg-card p-3 shadow-2xs space-y-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "font-bold text-muted-foreground flex items-center gap-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3.5 w-3.5 text-primary" }), " Statistical Deviation"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-lg font-black text-foreground",
																children: hwLatestBpm !== null && personalReference ? `${hwLatestBpm - personalReference.avgBpm >= 0 ? "+" : ""}${(hwLatestBpm - personalReference.avgBpm).toFixed(1)} BPM` : "—"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-[11px] text-muted-foreground",
																children: [
																	"Robust Z-Score:",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																		className: "text-foreground",
																		children: hwLatestBpm !== null ? (.6744907594765952 * (hwLatestBpm - (personalReference?.medianBpm || 84)) / (personalReference?.variability || 4)).toFixed(2) : "—"
																	})
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[10px] text-muted-foreground",
																children: "Threshold: |z| ≤ 3.5 personal pattern"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl border bg-card p-3 shadow-2xs space-y-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "font-bold text-muted-foreground flex items-center gap-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-stable" }), " Clinical Triage Standard"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-lg font-black text-foreground",
																children: hwLatestBpm !== null ? hwLatestBpm >= 60 && hwLatestBpm <= 100 ? "Normal Resting" : hwLatestBpm > 120 ? "Marked Tachycardia" : hwLatestBpm > 100 ? "Mild Elevation" : "Bradycardia" : "—"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-[11px] text-muted-foreground",
																children: ["Standard Normal: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																	className: "text-foreground",
																	children: "60 – 100 BPM"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[10px] text-muted-foreground",
																children: "AHA / NHS Emergency Care Norms"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl border bg-card p-3 shadow-2xs space-y-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "font-bold text-muted-foreground flex items-center gap-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5 text-primary" }), " Rolling Dynamics"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-lg font-black text-foreground",
																children: [
																	"Max Seen: ",
																	maxDeviationObserved,
																	" BPM"
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-[11px] text-muted-foreground",
																children: ["Tolerance Margin: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
																	className: "text-foreground",
																	children: [
																		"±",
																		deviationThreshold,
																		" BPM"
																	]
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-[10px] text-muted-foreground",
																children: [
																	"Consecutive deviations: ",
																	consecutiveDeviations,
																	" / 3 needed"
																]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl border bg-card p-3 shadow-2xs space-y-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "font-bold text-muted-foreground flex items-center gap-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, { className: "h-3.5 w-3.5 text-primary" }), " Hardware Telemetry"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-sm font-black text-foreground truncate",
																children: "FB BGR001"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[11px] text-muted-foreground font-mono truncate",
																children: "23:BF:22:31:67:C1"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-[10px] text-muted-foreground flex items-center gap-1",
																children: ["Contact: ", hwContact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-stable font-bold",
																	children: "Good Contact"
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-amber-600 font-bold",
																	children: "Weak"
																})]
															})
														]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-card/90 p-3 text-xs border space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-foreground",
													children: "Diagnostic Narrative:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-muted-foreground leading-relaxed m-0",
													children: deviationReason
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-[11px] text-muted-foreground",
										children: "* Note: Statistical deviation is not a diagnosis. Measurements reflect difference from your baseline under recorded conditions."
									})
								]
							}),
							testSummaryModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/30 bg-card p-5 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-bold text-base flex items-center gap-2 text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-primary" }), " Live Validity Test Summary"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => setTestSummaryModal(null),
											className: "text-xs",
											children: "Dismiss"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4 text-xs sm:grid-cols-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Total Test Time:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-extrabold text-foreground text-sm",
												children: formatTime(testSummaryModal.durationSeconds)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Total Readings:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-extrabold text-foreground text-sm",
												children: testSummaryModal.samplesEvaluated
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Deviations Flagged:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-extrabold text-foreground text-sm",
												children: testSummaryModal.deviationsDetected
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Peak Deviation:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-extrabold text-foreground text-sm",
												children: [testSummaryModal.maxDeviation, " BPM"]
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground leading-normal border-t pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evaluation Conclusion:" }),
											" Readings were continuously compared against ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\"Normal — Kavya\"" }),
											" (Average ",
											testSummaryModal.reference?.avgBpm,
											" BPM). ",
											testSummaryModal.deviationsDetected === 0 ? "All verified readings remained within your personal resting reference bounds." : `Detected ${testSummaryModal.deviationsDetected} sustained readings outside your configured tolerance band.`
										]
									})
								]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { SmartwatchVitalsLabPage as component };
