// Simulated, fictional patient data for demonstration only. Not real patients.
export type Severity = "critical" | "high" | "moderate" | "low";

export const SEVERITY_RANK: Record<Severity, number> = { critical: 0, high: 1, moderate: 2, low: 3 };
export const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  moderate: "Moderate",
  low: "Low",
};

export interface Vitals {
  hr: number;
  spo2: number;
  sys: number;
  dia: number;
  rr: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  complaint: string;
  severity: Severity;
  wait: number;
  arrived: string;
  source: "Walk-in" | "Ambulance" | "Referral";
  vitals: Vitals;
  risk: number;
  riskFactors: string[];
  concerns: string[];
  actions: string[];
  conditions: { name: string; likelihood: "High" | "Medium" | "Low" }[];
  history: string[];
}

const baseActions = [
  "Immediate physician review",
  "Continuous vitals monitoring",
  "ECG and cardiac-marker assessment",
  "Assess oxygen requirements",
  "Prepare for possible escalation of care",
];

export const patients: Patient[] = [
  {
    id: "P-1042", name: "Ramesh Kumar", age: 85, gender: "Male", complaint: "Chest pain, breathlessness",
    severity: "critical", wait: 2, arrived: "10:14 AM", source: "Walk-in",
    vitals: { hr: 110, spo2: 92, sys: 160, dia: 100, rr: 24 }, risk: 92,
    riskFactors: ["High heart rate (110 bpm)", "Low SpO₂ (92%)", "Elevated blood pressure (160/100)", "Age > 65", "Chest pain with breathlessness"],
    concerns: ["Possible acute coronary syndrome", "Risk of respiratory compromise", "Elevated blood pressure and heart rate"],
    actions: baseActions,
    conditions: [{ name: "Acute Coronary Syndrome", likelihood: "High" }, { name: "Heart Failure Exacerbation", likelihood: "Medium" }, { name: "Pulmonary Embolism", likelihood: "Medium" }],
    history: ["Hypertension (10 yrs)", "Type 2 diabetes", "Prior visit: Mar 2026 — dizziness"],
  },
  {
    id: "P-1038", name: "Anita Sharma", age: 34, gender: "Female", complaint: "Severe abdominal pain",
    severity: "critical", wait: 5, arrived: "10:11 AM", source: "Ambulance",
    vitals: { hr: 124, spo2: 97, sys: 96, dia: 60, rr: 22 }, risk: 86,
    riskFactors: ["Tachycardia (124 bpm)", "Low blood pressure (96/60)", "Severe localized pain"],
    concerns: ["Possible internal bleeding", "Possible surgical abdomen"],
    actions: ["Immediate physician review", "IV access and fluids assessment", "Abdominal imaging", "Continuous vitals monitoring"],
    conditions: [{ name: "Ectopic Pregnancy", likelihood: "High" }, { name: "Appendicitis", likelihood: "Medium" }, { name: "Bowel Obstruction", likelihood: "Low" }],
    history: ["No significant history recorded"],
  },
  {
    id: "P-1045", name: "Suresh Patel", age: 67, gender: "Male", complaint: "Altered consciousness",
    severity: "critical", wait: 6, arrived: "10:10 AM", source: "Ambulance",
    vitals: { hr: 58, spo2: 93, sys: 182, dia: 104, rr: 12 }, risk: 89,
    riskFactors: ["Reduced GCS", "Very high blood pressure (182/104)", "Low heart rate (58 bpm)", "Age > 65"],
    concerns: ["Possible stroke", "Possible raised intracranial pressure"],
    actions: ["Immediate physician review", "Neurological assessment", "CT head imaging", "Blood glucose check"],
    conditions: [{ name: "Ischemic Stroke", likelihood: "High" }, { name: "Hypertensive Encephalopathy", likelihood: "Medium" }, { name: "Hypoglycemia", likelihood: "Low" }],
    history: ["Atrial fibrillation", "Prior TIA (2024)"],
  },
  {
    id: "P-1031", name: "Priya Nair", age: 28, gender: "Female", complaint: "High fever, vomiting",
    severity: "high", wait: 12, arrived: "10:04 AM", source: "Walk-in",
    vitals: { hr: 112, spo2: 96, sys: 108, dia: 70, rr: 21 }, risk: 64,
    riskFactors: ["Fever 39.6°C", "Tachycardia (112 bpm)", "Dehydration signs"],
    concerns: ["Possible sepsis", "Dehydration"],
    actions: ["Physician review within 15 min", "Blood cultures", "Fluid assessment"],
    conditions: [{ name: "Sepsis", likelihood: "Medium" }, { name: "Gastroenteritis", likelihood: "Medium" }, { name: "Dengue", likelihood: "Low" }],
    history: ["No significant history recorded"],
  },
  {
    id: "P-1047", name: "Vikram Singh", age: 52, gender: "Male", complaint: "Head injury (fall)",
    severity: "high", wait: 15, arrived: "10:01 AM", source: "Referral",
    vitals: { hr: 92, spo2: 97, sys: 148, dia: 92, rr: 18 }, risk: 58,
    riskFactors: ["Head trauma", "On anticoagulants", "Elevated blood pressure"],
    concerns: ["Possible intracranial bleed"],
    actions: ["Physician review within 15 min", "CT head imaging", "Neuro observations"],
    conditions: [{ name: "Concussion", likelihood: "High" }, { name: "Subdural Hematoma", likelihood: "Medium" }, { name: "Skull Fracture", likelihood: "Low" }],
    history: ["On warfarin", "Prior knee surgery"],
  },
  {
    id: "P-1036", name: "Arjun Mehta", age: 19, gender: "Male", complaint: "Shortness of breath",
    severity: "high", wait: 18, arrived: "09:58 AM", source: "Walk-in",
    vitals: { hr: 104, spo2: 93, sys: 122, dia: 78, rr: 26 }, risk: 61,
    riskFactors: ["Low SpO₂ (93%)", "Respiratory rate 26/min", "Wheeze"],
    concerns: ["Possible acute asthma"],
    actions: ["Physician review within 15 min", "Assess oxygen requirements", "Peak flow measurement"],
    conditions: [{ name: "Acute Asthma", likelihood: "High" }, { name: "Pneumothorax", likelihood: "Low" }, { name: "Pneumonia", likelihood: "Low" }],
    history: ["Asthma since childhood"],
  },
  {
    id: "P-1050", name: "Meera Iyer", age: 45, gender: "Female", complaint: "Severe migraine",
    severity: "high", wait: 21, arrived: "09:55 AM", source: "Walk-in",
    vitals: { hr: 88, spo2: 98, sys: 142, dia: 90, rr: 17 }, risk: 48,
    riskFactors: ["Sudden onset headache", "Elevated blood pressure"],
    concerns: ["Rule out subarachnoid hemorrhage"],
    actions: ["Physician review within 15 min", "Neurological assessment"],
    conditions: [{ name: "Migraine", likelihood: "High" }, { name: "Subarachnoid Hemorrhage", likelihood: "Low" }, { name: "Hypertensive Headache", likelihood: "Low" }],
    history: ["Recurrent migraines"],
  },
  {
    id: "P-1052", name: "Rahul Verma", age: 61, gender: "Male", complaint: "Palpitations",
    severity: "high", wait: 24, arrived: "09:52 AM", source: "Walk-in",
    vitals: { hr: 132, spo2: 96, sys: 134, dia: 84, rr: 19 }, risk: 55,
    riskFactors: ["Irregular rhythm", "Heart rate 132 bpm"],
    concerns: ["Possible arrhythmia"],
    actions: ["Physician review within 15 min", "12-lead ECG", "Continuous cardiac monitoring"],
    conditions: [{ name: "Atrial Fibrillation", likelihood: "High" }, { name: "SVT", likelihood: "Medium" }, { name: "Thyrotoxicosis", likelihood: "Low" }],
    history: ["Hypertension"],
  },
  {
    id: "P-1033", name: "Kavita Rao", age: 38, gender: "Female", complaint: "Forearm laceration",
    severity: "moderate", wait: 34, arrived: "09:42 AM", source: "Walk-in",
    vitals: { hr: 84, spo2: 99, sys: 124, dia: 80, rr: 16 }, risk: 18,
    riskFactors: ["Bleeding controlled"], concerns: ["Wound care required"],
    actions: ["Wound assessment", "Tetanus status check"],
    conditions: [{ name: "Simple Laceration", likelihood: "High" }, { name: "Tendon Injury", likelihood: "Low" }, { name: "Wound Infection", likelihood: "Low" }],
    history: ["No significant history recorded"],
  },
  {
    id: "P-1029", name: "Deepak Joshi", age: 72, gender: "Male", complaint: "Urinary retention",
    severity: "moderate", wait: 41, arrived: "09:35 AM", source: "Referral",
    vitals: { hr: 90, spo2: 97, sys: 138, dia: 86, rr: 17 }, risk: 26,
    riskFactors: ["Age > 65", "Abdominal discomfort"], concerns: ["Bladder distension"],
    actions: ["Bladder scan", "Physician review"],
    conditions: [{ name: "BPH-related Retention", likelihood: "High" }, { name: "UTI", likelihood: "Medium" }, { name: "Medication Effect", likelihood: "Low" }],
    history: ["Benign prostatic hyperplasia"],
  },
  {
    id: "P-1027", name: "Sneha Gupta", age: 25, gender: "Female", complaint: "Ankle sprain",
    severity: "moderate", wait: 52, arrived: "09:24 AM", source: "Walk-in",
    vitals: { hr: 78, spo2: 99, sys: 118, dia: 76, rr: 15 }, risk: 9,
    riskFactors: ["Localized swelling"], concerns: ["Rule out fracture"],
    actions: ["X-ray assessment", "Pain management"],
    conditions: [{ name: "Ankle Sprain", likelihood: "High" }, { name: "Ankle Fracture", likelihood: "Low" }, { name: "Ligament Tear", likelihood: "Low" }],
    history: ["No significant history recorded"],
  },
  {
    id: "P-1024", name: "Amit Desai", age: 41, gender: "Male", complaint: "Mild rash",
    severity: "low", wait: 68, arrived: "09:08 AM", source: "Walk-in",
    vitals: { hr: 72, spo2: 99, sys: 120, dia: 78, rr: 14 }, risk: 4,
    riskFactors: ["No airway involvement"], concerns: ["Possible allergic reaction"],
    actions: ["Routine review", "Antihistamine assessment"],
    conditions: [{ name: "Contact Dermatitis", likelihood: "High" }, { name: "Urticaria", likelihood: "Medium" }, { name: "Viral Exanthem", likelihood: "Low" }],
    history: ["Seasonal allergies"],
  },
];

export const getPatient = (id: string) => patients.find((p) => p.id === id);

export const vitalRanges = {
  hr: { label: "Heart Rate", unit: "bpm", range: "60–100", min: 60, max: 100 },
  spo2: { label: "SpO₂", unit: "%", range: "≥95", min: 95, max: 100 },
  bp: { label: "Blood Pressure", unit: "mmHg", range: "90/60–120/80", min: 90, max: 120 },
  rr: { label: "Respiratory Rate", unit: "/min", range: "12–20", min: 12, max: 20 },
};

export function vitalStatus(key: "hr" | "spo2" | "bp" | "rr", v: Vitals): "Normal" | "High" | "Low" {
  const r = vitalRanges[key];
  const val = key === "bp" ? v.sys : v[key];
  if (val > r.max) return "High";
  if (val < r.min) return "Low";
  return "Normal";
}

// Deterministic pseudo-random so SSR and client render the same series.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export interface TrendPoint {
  time: string;
  hr: number;
  spo2: number;
  sys: number;
  rr: number;
}

export function vitalsTrend(p: Patient, minutes: 1 | 5 | 30): TrendPoint[] {
  const points = 13;
  const seed = parseInt(p.id.slice(2), 10) + minutes;
  const rand = seeded(seed);
  const stepSec = (minutes * 60) / (points - 1);
  const end = 10 * 3600 + 16 * 60;
  return Array.from({ length: points }, (_, i) => {
    const t = end - (points - 1 - i) * stepSec;
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = Math.floor(t % 60);
    const progress = i / (points - 1);
    const j = () => (rand() - 0.5) * 4;
    return {
      time: minutes === 1 ? `${m}:${String(s).padStart(2, "0")}` : `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      hr: Math.round(p.vitals.hr - 8 * (1 - progress) + j()),
      spo2: Math.round(Math.min(100, p.vitals.spo2 + 3 * (1 - progress) + j() / 2)),
      sys: Math.round(p.vitals.sys - 12 * (1 - progress) + j()),
      rr: Math.round(p.vitals.rr - 3 * (1 - progress) + j() / 2),
    };
  });
}

export interface AlertItem {
  id: string;
  patientId: string;
  factor: string;
  time: string;
  severity: "critical" | "high";
  acknowledged: boolean;
  resolved: boolean;
}

export const initialAlerts: AlertItem[] = [
  { id: "A-1", patientId: "P-1042", factor: "SpO₂ dropped to 92%", time: "10:16 AM", severity: "critical", acknowledged: false, resolved: false },
  { id: "A-2", patientId: "P-1045", factor: "GCS decreased, BP 182/104", time: "10:13 AM", severity: "critical", acknowledged: false, resolved: false },
  { id: "A-3", patientId: "P-1038", factor: "Systolic BP below 100", time: "10:12 AM", severity: "critical", acknowledged: false, resolved: false },
  { id: "A-4", patientId: "P-1052", factor: "Heart rate above 130 bpm", time: "10:05 AM", severity: "high", acknowledged: true, resolved: false },
  { id: "A-5", patientId: "P-1036", factor: "Respiratory rate 26/min", time: "10:02 AM", severity: "high", acknowledged: true, resolved: true },
];

export const volumeData = [
  { hour: "04:00", patients: 4 }, { hour: "05:00", patients: 3 }, { hour: "06:00", patients: 6 },
  { hour: "07:00", patients: 9 }, { hour: "08:00", patients: 12 }, { hour: "09:00", patients: 15 },
  { hour: "10:00", patients: 12 },
];

export const waitData = [
  { hour: "06:00", wait: 22 }, { hour: "07:00", wait: 26 }, { hour: "08:00", wait: 31 },
  { hour: "09:00", wait: 34 }, { hour: "10:00", wait: 28 },
];

export const criticalByDay = [
  { day: "Mon", cases: 7 }, { day: "Tue", cases: 5 }, { day: "Wed", cases: 9 }, { day: "Thu", cases: 6 },
  { day: "Fri", cases: 8 }, { day: "Sat", cases: 11 }, { day: "Sun", cases: 3 },
];
