import * as Yup from "yup";

const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
export const initValues = {
  title: "",
  content: "",
  categoryId: "",
  image: "",
};
export const validation = Yup.object().shape({
  title: Yup.string()
    .required("Debes ingresar un título")
    .min(4, "El título es muy corto"),
  content: Yup.string().required("Debes ingresar un contenido"),
  categoryId: Yup.string().required("Debes elegir una categoría"),
  image: Yup.mixed()
    .required("Debes elegir una imagen")
    .test(
      "fileFormat",
      "Solo puedes subir imágenes png, jpg o jpeg",
      (value) => value && supportedFormats.includes(value.type)
    ),
});
