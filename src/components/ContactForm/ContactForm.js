import React from "react";
import { contactsAPI } from "../../api/methods";
import { Typography, TextField, Button } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { SweetAlert } from "../../utils/SetupAlert.js";

const phoneRegex = /^[0-9]*$/;

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Requerido"),
  email: Yup.string().email("Email Invalido").required("Requerido"),
  phone: Yup.string()
    .min(8, "Minimo 8 caracteres")
    .matches(phoneRegex, "Ingrese un número válido")
    .required("Requerido"),
  message: Yup.string().required("Requerido"),
});

const ContactForm = () => {
  const onSubmit = async (values, props) => {
    try {
      const response = await contactsAPI.create(values);
      SweetAlert("success");
      props.resetForm();
    } catch (error) {
      SweetAlert("error", " en la conexión, por favor intente más tarde");
    }
  };
  return (
    <div style={{ width: "90%" }}>
      <Typography variant="h3" align="center">
        Contáctenos
      </Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          message: "",
        }}
        onSubmit={onSubmit}
        validationSchema={ContactSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors }) => (
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
              helperText={errors.name}
              error={Boolean(errors.name)}
              inputProps={{ "data-testid": "nameInput" }}
            />
            <Field
              as={TextField}
              fullWidth
              margin="dense"
              id="outlined-basic"
              name="email"
              type="email"
              label="Correo Electronico"
              variant="outlined"
              helperText={errors.email}
              error={Boolean(errors.email)}
              inputProps={{ "data-testid": "emailInput" }}
            />
            <Field
              as={TextField}
              fullWidth
              margin="dense"
              id="outlined-basic"
              name="phone"
              type="text"
              label="Telefono"
              variant="outlined"
              helperText={errors.phone}
              error={Boolean(errors.phone)}
              inputProps={{ "data-testid": "phoneInput" }}
            />
            <Field
              as={TextField}
              fullWidth
              multiline
              margin="dense"
              rows={3}
              id="outlined-basic"
              name="message"
              type="text"
              label="Mensaje"
              variant="outlined"
              helperText={errors.message}
              error={Boolean(errors.message)}
              inputProps={{ "data-testid": "messageInput" }}
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

export default ContactForm;
