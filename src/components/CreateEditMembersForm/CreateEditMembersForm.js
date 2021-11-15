import React, { useState } from "react";
import { TextEditor } from "../common/form/TextEditor";
import {
  Button,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Formik } from "formik";
import { getBase64 } from "../../utils/getBase64";
import { membersAPI } from "../../api/methods";
import * as Yup from "yup";

const CreateEditMembersForm = ({ member }) => {
  //This could be replaced by a redux fetching state
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Initial values and validation
  const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
  const initValues = {
    name: "",
    description: "",
    image: "",
    facebookUrl: "",
    linkedinUrl: "",
  };

  const validation = Yup.object().shape({
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
    facebookUrl: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Ingrese una URL valida"
    ),
    linkedinUrl: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Ingrese una URL valida"
    ),
  });

  //Form submit
  const submitForm = async (values, props) => {
    const { image } = values;
    const parsedImage = await getBase64(image);
    values.image = parsedImage;
    //if member is passed in props, edits that member otherwise creates new member
    member ? membersAPI.update(member.id, values) : membersAPI.create(values);
    props.resetForm({});
  };

  return (
    <Formik
      initialValues={member ? { ...member, image: "" } : initValues}
      validationSchema={validation}
      onSubmit={(values, props) => submitForm(values, props)}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
      }) => (
        <form
          style={{ maxWidth: "500px", margin: "0 auto" }}
          onSubmit={handleSubmit}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                id="name"
                label="Nombre"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel
                error={touched.description && Boolean(errors.description)}
                style={{ marginBottom: ".5rem" }}
              >
                Descripción
              </InputLabel>
              <TextEditor
                handleChange={(value) => setFieldValue("description", value)}
                value={values.description}
              />
              <FormHelperText
                error={touched.description && Boolean(errors.description)}
              >
                {errors.description}
              </FormHelperText>
            </Grid>

            <Grid item xs={12}>
              <FormGroup variant="outlined">
                <InputLabel
                  error={touched.image && Boolean(errors.image)}
                  style={{ marginBottom: ".5rem" }}
                >
                  Imagen
                </InputLabel>
                <Field name="image" id="image">
                  {({ field, form }) => (
                    <input
                      accept="image/png, image/jpg, image/jpeg"
                      type="file"
                      data-testid="imageInput"
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
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <FormGroup variant="outlined" row>
                <Typography variant="h6" gutterBottom>
                  Redes sociales:
                </Typography>
                <TextField
                  name="facebookUrl"
                  id="facebookUrl"
                  label="Facebook"
                  variant="outlined"
                  value={values.facebookUrl}
                  onChange={handleChange}
                  error={touched.facebookUrl && Boolean(errors.facebookUrl)}
                  helperText={touched.facebookUrl && errors.facebookUrl}
                  fullWidth
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup variant="outlined" row>
                <TextField
                  name="linkedinUrl"
                  id="linkedinUrl"
                  label="LinkedIn"
                  variant="outlined"
                  value={values.linkedinUrl}
                  onChange={handleChange}
                  error={touched.linkedinUrl && Boolean(errors.linkedinUrl)}
                  helperText={touched.linkedinUrl && errors.linkedinUrl}
                  fullWidth
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isSubmitting}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                {member ? "Editar " : "Crear "} Miembro
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CreateEditMembersForm;
