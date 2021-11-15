import * as Yup from "yup";
export const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
export const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, "It's too short").required("Required"),
  image: Yup.mixed()
    .required("You need to provide a file")
    .test(
      "type",
      "Only the following formats are accepted: .jpg, .png",
      (value) => {
        return value && supportedFormats.includes(value.type);
      }
    ),
  order: Yup.number()
    .required("The order is required!")
    .test(
      "Is positive?",
      "The number must be greater than 0!",
      (value) => value > 0
    ),
  description: Yup.string().required("Description is Required"),
});
