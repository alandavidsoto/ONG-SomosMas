import * as Yup from "yup";

const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
export const initValues = {
  name: "",
  description: "",
  image: "",
};
export const validation = Yup.object().shape({
  name: Yup.string()
    .required("Debes ingresar un nombre")
    .min(4, "El nombre es muy corto"),
  description: Yup.string().required("Debes ingresar una descripción"),
  image: Yup.mixed()
    .required("Debes elegir una imagen")
    .test(
      "fileFormat",
      "Solo puedes subir imágenes png o jpg",
      (value) => value && supportedFormats.includes(value.type)
    ),
});
