import React, { useState, useEffect } from "react";
import { Button, Container, FormHelperText } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Form, ErrorMessage, Field } from "formik";
import { TextEditor } from "../common/form/TextEditor";
import { ImageInput } from "../common/form/ImageInput";
import Alert from "@material-ui/lab/Alert";
import { FormBase } from "../common/form/FormBase";
import { validationSchema } from "./validationSchema";
import "../common/common.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrganization,
  createOrganization,
} from "../../app/organization/organizationAsyncActions";

const UpdateOrganizationDataForm = () => {
  const [message, setMessage] = useState({ type: null, content: null });
  const dispatch = useDispatch();
  const ongData = useSelector((state) => state.organization.organization[0]);
  const initialValues = ongData || {
    name: "",
    shortDescription: "",
    long_description: "",
    logo: "",
    facebook_url: "",
    linkedin_url: "",
    instagram_url: "",
    twitter_url: "",
  };
  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  const onSubmit = (values) => {
    dispatch(createOrganization(values));
  };
  return (
    <Container maxWidth="md">
      <FormBase
        titleType="Editar datos de la organizacion"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            {message.type === "error" && (
              <FormHelperText error>{message.content}</FormHelperText>
            )}
            {(Boolean(message.type) || message.type === "error") && (
              <Alert severity={message.type}>{message.content}</Alert>
            )}
            <Field
              as={TextField}
              name="name"
              inputProps={{ "data-testid": "nameInput" }}
              label="Name"
              fullWidth
              error={errors.name && touched.name}
              helperText={<ErrorMessage name="name" />}
            />
            <ImageInput
              handleChange={(event) => setFieldValue("logo", event)}
              value={values.logo}
              error={touched.logo ? errors.logo : null}
            />
            <Field
              as={TextField}
              name="long_description"
              label="LongDescription"
              inputProps={{ "data-testid": "longDescriptionTest" }}
              fullWidth
              error={errors.long_description && touched.long_description}
              helperText={<ErrorMessage name="long_description" />}
            />
            <TextEditor
              handleChange={(value) =>
                setFieldValue("short_description", value)
              }
              value={values.short_description}
            />
            <div style={{ marginBottom: "5px" }}>
              <FormHelperText error>
                {" "}
                <ErrorMessage name="short_description" />
              </FormHelperText>
            </div>
            <Field
              as={TextField}
              name="facebook_url"
              label="Facebook"
              inputProps={{ "data-testid": "facebookTest" }}
              fullWidth
              error={errors.facebook_url && touched.facebook_url}
              helperText={<ErrorMessage name="facebook_url" />}
            />
            <Field
              as={TextField}
              name="linkedin_url"
              label="LinkedIn"
              inputProps={{ "data-testid": "linkedinTest" }}
              fullWidth
              error={errors.linkedin_url && touched.linkedin_url}
              helperText={<ErrorMessage name="linkedin_url" />}
            />
            <Field
              as={TextField}
              name="instagram_url"
              label="Instagram"
              fullWidth
              inputProps={{ "data-testid": "instagramTest" }}
              error={errors.instagram_url && touched.instagram_url}
              helperText={<ErrorMessage name="instagram_url" />}
            />
            <Field
              as={TextField}
              name="twitter_url"
              label="Twitter"
              fullWidth
              inputProps={{ "data-testid": "twitterTest" }}
              error={errors.twitter_url && touched.twitter_url}
              helperText={<ErrorMessage name="twitter_url" />}
            />

            <Button my={10} type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </Form>
        )}
      </FormBase>
      <br /> <br />
    </Container>
  );
};
export default UpdateOrganizationDataForm;
