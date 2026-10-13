import { setState } from "./store";

// DEMO ONLY — client-side check for prototype purposes. Not secure authentication.
// Replace `signIn` with a call to a real identity provider later.
export const DEMO_CREDENTIALS = {
  hospital: "City General Hospital",
  username: "doctor",
  password: "Demo@123",
};

export const HOSPITALS = [
  "City General Hospital",
  "St. Mary's Medical Center",
  "Riverside Regional Hospital",
  "Metro Trauma Institute",
];

export async function signIn(hospital: string, username: string, password: string) {
  await new Promise((r) => setTimeout(r, 700));
  const ok =
    hospital === DEMO_CREDENTIALS.hospital &&
    username.trim().toLowerCase() === DEMO_CREDENTIALS.username &&
    password === DEMO_CREDENTIALS.password;
  if (!ok) throw new Error("Invalid hospital, username or password.");
  setState((s) => ({
    ...s,
    user: { name: "Dr. Rahul Mehta", role: "ER Physician", initials: "DR", hospital },
    prefs: { ...s.prefs, hospital },
  }));
}

export function signOut() {
  setState((s) => ({ ...s, user: null }));
}
