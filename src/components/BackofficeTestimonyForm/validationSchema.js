import * as Yup from "yup";

export const initialValues = {
  name: "",
  description: "",
  image: "",
};

const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
export const validation = Yup.object().shape({
  name: Yup.string()
    .required("Debes ingresar un nombre")
    .min(4, "El nombre debe tener mínimo 4 caracteres"),

  description: Yup.string().required("Debes ingresar una descripción"),

  image: Yup.mixed()
    .required("Debes elegir una imagen")
    .test(
      "fileFormat",
      "Solo puedes subir imágenes png o jpg",
      (value) => value && supportedFormats.includes(value.type)
    ),
});
