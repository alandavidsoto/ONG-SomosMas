import React, { useState } from "react";
import validationSchema from "./validationSchema";
import { Button, FormHelperText } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Form, ErrorMessage, Field } from "formik";
import { TextEditor } from "../common/form/TextEditor";
import { ImageInput } from "../common/form/ImageInput";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { FormBase } from "../common/form/FormBase";
import "../common/common.scss";

const BackofficeEditHome = ({ homeContent }) => {
  const initialValues = {
    welcomeText: homeContent.welcomeText,
    slide1Image: homeContent.slide1Image,
    slide1Text: homeContent.slide1Text,
    slide2Image: homeContent.slide2Image,
    slide2Text: homeContent.slide2Text,
    slide3Image: homeContent.slide3Image,
    slide3Text: homeContent.slide3Text,
  };
  return (
    <FormBase
      titleType={"Editar Home"}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <Field
            as={TextField}
            name="welcomeText"
            label="Texto de bienvenida"
            fullWidth
            error={errors.welcomeText && touched.welcomeText}
            helperText={<ErrorMessage name="welcomeText" />}
          />
          <Typography variant="body1">Imagen Slide 1</Typography>
          <ImageInput
            handleChange={(event) => setFieldValue("slide1Image", event)}
            value={values.slide1Image}
          />
          <Field
            as={TextField}
            name="slide1Text"
            label="Texto Slide 1"
            fullWidth
          />
          <Typography variant="body1">Imagen Slide 2</Typography>
          <ImageInput
            handleChange={(event) => setFieldValue("slide2Image", event)}
            value={values.slide2Image}
          />
          <Field
            as={TextField}
            name="slide2Text"
            label="Texto Slide 2"
            fullWidth
          />
          <Typography variant="body1">Imagen Slide 3</Typography>
          <ImageInput
            handleChange={(event) => setFieldValue("slide3Image", event)}
            value={values.slide3Image}
          />
          <Field
            as={TextField}
            name="slide3Text"
            label="Texto Slide 3"
            fullWidth
          />

          <Button my={10} type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Form>
      )}
    </FormBase>
  );
};

export default BackofficeEditHome;
