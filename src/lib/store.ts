import { useSyncExternalStore } from "react";
import { initialAlerts, type AlertItem } from "./data";

// Demo session store. Persists to sessionStorage (never passwords).
// Swap for a backend-backed store when real data sources are connected.
export interface DemoUser {
  name: string;
  role: string;
  initials: string;
  hospital: string;
}
export interface Note {
  id: string;
  patientId: string;
  text: string;
  author: string;
  createdAt: string;
  editedAt?: string;
}
export interface Prefs {
  criticalAlerts: boolean;
  sound: boolean;
  compact: boolean;
  hospital: string;
}
interface State {
  user: DemoUser | null;
  notes: Note[];
  alerts: AlertItem[];
  prefs: Prefs;
}

const KEY = "urgentiq-demo-session";
const initial: State = {
  user: null,
  notes: [],
  alerts: initialAlerts,
  prefs: { criticalAlerts: true, sound: false, compact: false, hospital: "City General Hospital" },
};

let state: State = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) state = { ...initial, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
}

export function setState(fn: (s: State) => State) {
  load();
  state = fn(state);
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function getState() {
  load();
  return state;
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => sel(getState()),
    () => sel(initial),
  );
}
