import { api } from "../../api/client.js";

export async function submitClinicalForm(formType, payload) {
  return api.post("/clinical-forms/submit/", { form_type: formType, ...payload });
}
