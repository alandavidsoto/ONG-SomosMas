import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Escriba el nombre"),
  logo: Yup.mixed().required("Adjunte una imagen"),
  short_description: Yup.string().required("Escriba una breve descripcion"),
  long_description: Yup.string().required("Escriba una  descripcion"),
  linkedin_url: Yup.string().required("Escriba el link de LinkedIn"),
  instagram_url: Yup.string().required("Escriba el link de Instagram"),
  twitter_url: Yup.string().required("Escriba el link de Twitter"),
  facebook_url: Yup.string().required("Escriba el link de Facebook"),
});
