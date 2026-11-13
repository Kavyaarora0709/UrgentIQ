import { A as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as PatientDetailView } from "./_ssr/PatientDetailView-BCTrg5_4.mjs";
import { t as Route } from "./_app.patients.index-CLpJ6DJ_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.patients.index-DKIZrrod.js
var import_jsx_runtime = require_jsx_runtime();
function PatientsIndexPage() {
	const { id } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatientDetailView, { currentId: id || "P-1042" });
}
//#endregion
export { PatientsIndexPage as component };
