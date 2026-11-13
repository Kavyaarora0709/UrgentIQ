import { i as __toESM } from "../_runtime.mjs";
import { i as initialAlerts } from "./data-C77HYp37.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-B_Jr4tEX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "urgentiq-demo-session";
var initial = {
	user: null,
	notes: [],
	alerts: initialAlerts,
	prefs: {
		criticalAlerts: true,
		sound: false,
		compact: false,
		hospital: "City General Hospital"
	}
};
var state = initial;
var loaded = false;
var listeners = /* @__PURE__ */ new Set();
function load() {
	if (loaded || typeof window === "undefined") return;
	loaded = true;
	try {
		const raw = sessionStorage.getItem(KEY);
		if (raw) {
			state = {
				...initial,
				...JSON.parse(raw)
			};
			if (state.user && state.user.name === "Dr. Rahul Mehta") {
				state.user.name = "Dr. Harleen Kaur";
				state.user.initials = "HK";
			}
		}
	} catch {}
}
function setState(fn) {
	load();
	state = fn(state);
	try {
		sessionStorage.setItem(KEY, JSON.stringify(state));
	} catch {}
	listeners.forEach((l) => l());
}
function getState() {
	load();
	return state;
}
function useStore(sel) {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => sel(getState()), () => sel(initial));
}
function addNote(patientId, text, author = "Dr. Harleen Kaur") {
	const note = {
		id: `N-${Date.now()}`,
		patientId,
		text,
		author,
		createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit"
		})
	};
	setState((s) => ({
		...s,
		notes: [note, ...s.notes]
	}));
	return note;
}
function resetAlerts() {
	setState((s) => ({
		...s,
		alerts: initialAlerts.map((a) => ({
			...a,
			acknowledged: false,
			resolved: false
		}))
	}));
}
function acknowledgeAlert(alertId) {
	setState((s) => ({
		...s,
		alerts: s.alerts.map((a) => a.id === alertId ? {
			...a,
			acknowledged: true
		} : a)
	}));
}
function markAllAlertsRead() {
	setState((s) => ({
		...s,
		alerts: s.alerts.map((a) => ({
			...a,
			acknowledged: true
		}))
	}));
}
function updatePrefs(prefs) {
	setState((s) => ({
		...s,
		prefs: {
			...s.prefs,
			...prefs
		}
	}));
}
//#endregion
export { resetAlerts as a, useStore as c, markAllAlertsRead as i, addNote as n, setState as o, getState as r, updatePrefs as s, acknowledgeAlert as t };
