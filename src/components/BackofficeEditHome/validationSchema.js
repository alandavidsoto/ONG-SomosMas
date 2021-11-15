import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  welcomeText: Yup.string()
    .min(20, " Mínimo de 20 caracteres")
    .required("Requirido"),
});
export default validationSchema;
