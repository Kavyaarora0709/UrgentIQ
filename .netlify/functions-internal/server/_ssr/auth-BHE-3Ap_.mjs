import { o as setState } from "./store-B_Jr4tEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BHE-3Ap_.js
var DEMO_CREDENTIALS = {
	hospital: "City General Hospital",
	username: "doctor",
	password: "Demo@123"
};
var HOSPITALS = [
	"City General Hospital",
	"St. Mary's Medical Center",
	"Riverside Regional Hospital",
	"Metro Trauma Institute"
];
async function signIn(hospital, username, password) {
	await new Promise((r) => setTimeout(r, 700));
	if (!(hospital === DEMO_CREDENTIALS.hospital && username.trim().toLowerCase() === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password)) throw new Error("Invalid hospital, username or password.");
	setState((s) => ({
		...s,
		user: {
			name: "Dr. Harleen Kaur",
			role: "ER Physician",
			initials: "HK",
			hospital
		},
		prefs: {
			...s.prefs,
			hospital
		}
	}));
}
function signOut() {
	setState((s) => ({
		...s,
		user: null
	}));
}
//#endregion
export { signOut as i, HOSPITALS as n, signIn as r, DEMO_CREDENTIALS as t };
