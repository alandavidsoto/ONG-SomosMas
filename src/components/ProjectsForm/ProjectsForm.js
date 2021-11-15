import React from "react";
import axios from "axios";
import { ImageInput } from "../common/form/ImageInput";
import { Typography, TextField, Button } from "@material-ui/core";
import { Formik, Field, ErrorMessage, Form } from "formik";
import validationSchema from "./validationSchema";
import "../common/common.scss";

const ProjectsForm = ({ project }) => {
  const initialValues = {
    title: "",
    description: "",
    image: "",
    due_date: "",
  };
  const handleSubmit = async (values) => {
    const formData = { ...values, image: "" };
    project
      ? await axios.patch(
          `http://ongapi.alkemy.org/api/projects/${project.id}`,
          formData
        )
      : await axios.post("http://ongapi.alkemy.org/api/projects", formData);
  };

  return (
    <div>
      <Typography variant="h3" align="center">
        {project ? "Editar Proyecto" : "Crear Proyecto"}
      </Typography>
      <Formik
        initialValues={project ? project : initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              margin="dense"
              id="outlined-basic"
              name="title"
              type="text"
              label="Titulo"
              variant="outlined"
              error={errors.title && touched.title}
              helperText={<ErrorMessage name="title" />}
            />
            <Field
              as={TextField}
              fullWidth
              margin="dense"
              id="outlined-basic"
              name="description"
              type="text"
              label="Descripcion"
              variant="outlined"
              error={errors.description && touched.description}
              helperText={<ErrorMessage name="description" />}
            />
            <ImageInput
              handleChange={(event) => setFieldValue("image", event)}
              value={values.image}
              error={errors.image && touched.image}
              helperText={<ErrorMessage name="image" />}
            />
            <Field
              as={TextField}
              fullWidth
              margin="dense"
              id="outlined-basic"
              name="due_date"
              type="date"
              label="Fecha de vencimiento"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
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
export default ProjectsForm;
