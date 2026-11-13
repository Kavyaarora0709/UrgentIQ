import { A as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Route } from "./_app.patients._id-Cd79GFQi.mjs";
import { t as PatientDetailView } from "./_ssr/PatientDetailView-BCTrg5_4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.patients._id-h-v9p1A-.js
var import_jsx_runtime = require_jsx_runtime();
function PatientByIdPage() {
	const { patient } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatientDetailView, { currentId: patient.id });
}
//#endregion
export { PatientByIdPage as component };
