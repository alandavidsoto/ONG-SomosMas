import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Form, ErrorMessage, Field } from "formik";
import "../../common/common.scss";
import { TextEditor } from "../../common/form/TextEditor";
import { ImageInput } from "../../common/form/ImageInput";
import { getBase64 } from "../../../utils/getBase64";
import Alert from "@material-ui/lab/Alert";
import { FormBase } from "../../common/form/FormBase";
import { validationSchema } from "./validationShema";
import { activitiesAPI } from "../../../api/methods";

const initialValues = {
  name: "",
  image: "",
  description: "",
};
const FormActivity = (props) => {
  const { activity } = props;
  const type = activity ? "Edit" : "Add";
  const [message, setMessage] = useState({ type: null, content: null });

  const onSubmit = async (values, props) => {
    setMessage({ type: null, content: null });
    const imageBase64 = await getBase64(values.image);
    const formData = { ...values, image: imageBase64 };
    activity
      ? activitiesAPI.update(activity.id, formData)
      : activitiesAPI.create(formData);
    setMessage(formData);
    props.resetForm();
  };
  return (
    <FormBase
      titleType={`${type} Activity`}
      initialValues={activity ? { ...activity, image: "" } : initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form style={{ maxWidth: "500px", margin: "0 auto" }}>
          {Boolean(message.type) && (
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
          <ImageInput
            handleChange={(event) => setFieldValue("image", event)}
            // onChange={(event) => {
            //   form.setFieldValue(field.name, event.currentTarget.files[0])
            // }}
            value={values.image}
            error={touched.image ? errors.image : null}
          />
          <TextEditor
            handleChange={(value) => setFieldValue("description", value)}
            value={values.description}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Form>
      )}
    </FormBase>
  );
};
export default FormActivity;
