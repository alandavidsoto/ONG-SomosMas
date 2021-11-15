import React, { useState } from "react";
import { Button, FormHelperText, makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Form, ErrorMessage, Field } from "formik";
import { TextEditor } from "../common/form/TextEditor";
import { ImageInput } from "../common/form/ImageInput";
import { getBase64 } from "../../utils/getBase64";
import Alert from "@material-ui/lab/Alert";
import { FormBase } from "../common/form/FormBase";
import { validationSchema } from "./validationSchema";
import "../common/common.scss";
import { ServiceSlide } from "./ServiceSlide";
import { useDispatch, useSelector } from "react-redux";
import { createSlide, editSlide } from "../../app/slides/slidesAsyncActions";
import { SweetAlert } from "../../utils/SetupAlert";
const initialValues = {
  name: "",
  order: "",
  image: "",
  description: "",
};

const useStyles = makeStyles({
  root: {
    maxWidth: "500px",
    margin: "0 auto",
  },
});

const FormSlide = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { slide } = props;
  const type = slide ? "Edit" : "Add";
  const [message, setMessage] = useState({ type: null, content: null });
  const status = useSelector((state) => state.slides.status);

  const onSubmit = async (values, props) => {
    setMessage({ type: null, content: null });
    const imageBase64 = await getBase64(values.image);
    const formData = { ...values, image: imageBase64 };
    slide
      ? dispatch(editSlide({ slide, formData }))
      : dispatch(createSlide(formData));

    status === "success" ? SweetAlert("success") : SweetAlert("error");
    setTimeout(() => {
      window.location.pathname = "/backoffice/slides";
    }, 1000);
    setMessage(formData);
    props.resetForm();
  };

  return (
    <FormBase
      titleType={`${type} Slide`}
      initialValues={slide ? slide : initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className={classes.root}>
          {message.type === "error" && (
            <FormHelperText error>{message.content}</FormHelperText>
          )}
          {(Boolean(message.type) || message.type === "error") && (
            <Alert severity={message.type}>{message.content}</Alert>
          )}
          <Field
            as={TextField}
            name="name"
            label="Name"
            fullWidth
            error={errors.name && touched.name}
            helperText={<ErrorMessage name="name" />}
          />
          <Field
            as={TextField}
            type="number"
            my={12}
            name="order"
            label="Order"
            fullWidth
            error={errors.order && touched.order}
            helperText={<ErrorMessage name="order" />}
          />

          <ImageInput
            handleChange={(event) => setFieldValue("image", event)}
            value={values.image}
            error={touched.image ? errors.image : null}
          />
          <TextEditor
            handleChange={(value) => setFieldValue("description", value)}
            value={values.description}
          />
          <div style={{ marginBottom: "5px" }}>
            <FormHelperText error>
              {" "}
              <ErrorMessage name="description" />
            </FormHelperText>
          </div>

          <Button my={10} type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Form>
      )}
    </FormBase>
  );
};
export default FormSlide;
