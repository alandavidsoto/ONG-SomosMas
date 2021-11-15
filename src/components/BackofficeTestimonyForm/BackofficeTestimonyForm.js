import React from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Button,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { getBase64 } from "../../utils/getBase64";
import { Formik, Field, Form } from "formik";
import { SweetAlert } from "../../utils/SetupAlert";
import { validation, initialValues } from "./validationSchema";

const BackofficeTestimonyForm = ({ testimony }) => {
  const submitForm = async (values) => {
    const { image } = values;
    const parsedImage = await getBase64(image);
    values.image = parsedImage;
    //if member is passed in props, edits that member otherwise creates new member
    if (testimony) {
      await axios
        .patch(
          `http://ongapi.alkemy.org/api/testimonials/${testimony.id}`,
          values
        )
        .then(() => SweetAlert("success"))
        .catch(() => SweetAlert("error"));
    } else {
      await axios
        .post(`http://ongapi.alkemy.org/api/testimonials`, values)
        .then(() => SweetAlert("success"))
        .catch(() => SweetAlert("error"));
    }
  };

  return (
    <div>
      <Typography variant="h3" align="center">
        {testimony ? "Editar" : "Crear"} testimonio
      </Typography>
      <Formik
        initialValues={testimony ? { ...testimony, image: "" } : initialValues}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validation}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              margin="dense"
              id="outlined-basic"
              name="name"
              type="text"
              label="Nombre"
              variant="outlined"
              helperText={touched.name && errors.name}
              error={touched.name && Boolean(errors.name)}
            />
            <InputLabel
              error={touched.description && Boolean(errors.description)}
              style={{ textAlign: "center", marginBottom: ".5rem" }}
            >
              Descripción
            </InputLabel>
            <Field
              name="description"
              id="description"
              label="Descripcion"
              type="text"
            >
              {({ field, form }) => (
                <CKEditor
                  onChange={(event, editor) => {
                    form.setFieldValue(field.name, editor.getData());
                  }}
                  data={field.value}
                  editor={ClassicEditor}
                />
              )}
            </Field>
            <FormHelperText
              error={touched.description && Boolean(errors.description)}
            >
              {errors.description}
            </FormHelperText>
            <InputLabel
              error={touched.image && Boolean(errors.image)}
              style={{ textAlign: "center", marginBottom: ".5rem" }}
            >
              Imagen
            </InputLabel>
            <Field
              name="image"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              label="Imagen"
            >
              {({ field, form }) => (
                <Input
                  accept="image/png, image/jpg, image/jpeg"
                  type="file"
                  onChange={(event) => {
                    form.setFieldValue(
                      field.name,
                      event.currentTarget.files[0]
                    );
                  }}
                />
              )}
            </Field>
            <FormHelperText error={touched.image && Boolean(errors.image)}>
              {errors.image}
            </FormHelperText>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              size="large"
            >
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BackofficeTestimonyForm;
