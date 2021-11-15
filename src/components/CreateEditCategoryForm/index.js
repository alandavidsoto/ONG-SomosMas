import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Button,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { Field, Formik } from "formik";
import { getBase64 } from "../../utils/getBase64";
import { initValues, validation } from "./validationSchema";
import { useDispatch } from "react-redux";
import {
  createCategory,
  editCategory,
} from "../../app/categories/categoriesAsyncActions";

//to edit a category, the data of that category must be recived by url params, not from props.
//in order to get all data, use useParams hook to get the category-id and then make a getById request to the API
const CreateEditCategoryForm = ({ category }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitForm = async (values) => {
    setIsSubmitting(true);
    const parsedImage = await getBase64(values.image);
    const formData = { ...values, image: parsedImage };
    category
      ? dispatch(editCategory({ category, formData }))
      : dispatch(createCategory(formData));
    setIsSubmitting(false);
  };

  return (
    <Formik
      initialValues={category ? { ...category, image: "" } : initValues}
      validationSchema={validation}
      onSubmit={(values) => submitForm(values)}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
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
              <Field name="description" id="description">
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
            </Grid>
            <Grid item xs={12}>
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
                {category ? "Editar" : "Crear"} categoría
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CreateEditCategoryForm;
