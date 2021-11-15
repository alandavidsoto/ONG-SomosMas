import * as Yup from "yup";
export const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
export const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, "It's too short").required("Required"),
  image: Yup.mixed()
    .required("You need to provide a file")
    .test(
      "type",
      "Only the following formats are accepted: .jpg, .png",
      (value) => {
        return value && supportedFormats.includes(value.type);
      }
    ),
});
