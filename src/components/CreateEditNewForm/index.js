import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import {
  Button,
  FormHelperText,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  TextField,
  Container,
} from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SweetAlert } from "../../utils/SetupAlert";
import { initValues, validation } from "./validationSchema";
import { getBase64 } from "../../utils/getBase64";
import { categoriesAPI, newsAPI } from "../../api/methods";

const CreateEditNewForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await categoriesAPI.getAll().then((res) => setCategories(res.data.data));
    };
    getData();
  }, []);

  const submitNew = async (values) => {
    const { title, image, content, categoryId } = values;
    const parsedImage = await getBase64(image);
    /* user_id and id are not defined at the current dev time */
    setIsSubmitting(true);
    if (!props.new) {
      await newsAPI
        .create({
          id: 0,
          name: title,
          slug: title.replace(" ", "-"),
          content: content,
          image: parsedImage,
          user_id: "tbd",
          category_id: Number(categoryId),
          created_at: new Date(Date.now()).toISOString(),
          updated_at: null,
          deleted_at: null,
        })
        .then(() => SweetAlert("success"))
        .catch(() => SweetAlert("error"));
    } else {
      await newsAPI
        .update(props.new.id, {
          id: 0,
          name: title,
          slug: title.replace(" ", "-"),
          content: content,
          image: parsedImage,
          user_id: "tbd",
          category_id: Number(categoryId),
          created_at: props.new.created_at,
          updated_at: new Date(Date.now()).toISOString(),
          deleted_at: null,
        })
        .then(() => SweetAlert("success"))
        .catch(() => SweetAlert("error"));
    }
    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="md">
      <Formik
        // If a New comes from props initial values will be the New object (except the image).
        initialValues={props.new ? { ...props.new, image: "" } : initValues}
        onSubmit={(values) => submitNew(values)}
        validationSchema={validation}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form
            style={{ maxWidth: "500px", margin: "0 auto" }}
            onSubmit={handleSubmit}
          >
            <Grid container direction="column" spacing={2}>
              <Grid xs={12} item>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Nombre"
                  variant="outlined"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  value={values.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  onChange={handleChange}
                  value={values.categoryId}
                  name="categoryId"
                  id="categoryId"
                  label="Categoría"
                  error={touched.categoryId && Boolean(errors.categoryId)}
                  helperText={touched.categoryId && errors.categoryId}
                >
                  <MenuItem value="" disabled selected>
                    Selecciona una categoría
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} item>
                <InputLabel
                  style={{ marginBottom: ".5rem" }}
                  error={touched.content && Boolean(errors.content)}
                >
                  Contenido
                </InputLabel>
                <Field name="content" id="content">
                  {({ field, form }) => (
                    <CKEditor
                      editor={ClassicEditor}
                      data={field.value}
                      onChange={(event, editor) => {
                        form.setFieldValue(field.name, editor.getData());
                      }}
                    />
                  )}
                </Field>
                <FormHelperText
                  style={{ marginTop: ".5rem" }}
                  error={touched.content && Boolean(errors.content)}
                >
                  {errors.content}
                </FormHelperText>
              </Grid>
              <Grid xs={12} item>
                <FormGroup variant="outlined" fullWidth>
                  <InputLabel
                    error={touched.image && Boolean(errors.image)}
                    style={{ marginBottom: ".5rem" }}
                  >
                    Imagen
                  </InputLabel>
                  <Field name="image" id="image">
                    {({ field, form }) => (
                      <Input
                        accept="image/png, image/jpg"
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
                  <FormHelperText
                    style={{ marginTop: ".5rem" }}
                    error={touched.image && Boolean(errors.image)}
                  >
                    {errors.image}
                  </FormHelperText>
                </FormGroup>
              </Grid>
              <Grid xs={12} item>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {props.new ? "Editar" : "Crear novedad"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateEditNewForm;
