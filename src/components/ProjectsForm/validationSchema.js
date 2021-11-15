import * as Yup from "yup";
const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Requerido"),
  image: Yup.mixed()
    .required("Requerido")
    .test("type", "Formatos aceptados: .jpg, .png", (value) => {
      return value && supportedFormats.includes(value.type);
    }),
  description: Yup.string().required("Requerido"),
});
export default validationSchema;
