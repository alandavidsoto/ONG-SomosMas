import React, { useState } from "react";
import "./FormRegister.scss";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Dialog,
  Container,
} from "@material-ui/core";
import Terms from "./Terms";
import Map from "../Map";

const FormRegister = () => {
  //initialized the constant
  const [formSuccess, setFormSuccess] = useState(null);
  const [showMarker, setShowMarker] = useState(false);
  const [markerPosition, setMarkerPosition] = useState();
  const [ixsodalOpen, setIxsodalOpen] = useState(false);
  const handleOpenModal = () => {
    setIxsodalOpen((prevState) => !prevState);
  };
  const body = <Terms />;

  return (
    <div style={{ width: "90%", maxWidth: "300px", margin: "0px auto" }}>
      <Typography variant="h4">Registro</Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
          conditions: false,
        }}
        // validation of values with yup
        validationSchema={yup.object({
          email: yup
            .string()
            .email("Introduzca un email válido")
            .required("No puedes dejar el campo email vacío"),
          password: yup
            .string()
            .min(6, "Debe contener al menos 6 caracteres")
            .matches(/[0-9]/, "La contraseña debe contener al menos 1 dígito")
            .matches(/\W/, "Debe contener al menos 1 símbolo(#@-/)")
            .required("No puedes dejar el campo contraseña vacío"),
          repeatPassword: yup
            .string()
            .required("No puedes dejar este campo vacío")
            .oneOf([yup.ref("password")], "Las contraseña debe ser igual"),
          conditions: yup
            .boolean()
            .isTrue("Debes aceptar los términos y condiciones"),
        })}
        onSubmit={(formdata, options) => {
          setFormSuccess(formdata); // if everything is fine. Set the values in form Success
          options.resetForm(); // clean form
        }}
      >
        {({ handleChange, values }) => (
          <Form>
            <Grid container spacing={2}>
              {/* EMAIL */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type="text"
                    name="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <span className="error">
                    <ErrorMessage name="email" />
                  </span>
                </FormControl>
              </Grid>
              {/* PASSWORD */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type="password"
                    name="password"
                    id="password"
                    label="Contraseña"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <span className="error">
                    <ErrorMessage name="password" />
                  </span>
                </FormControl>
              </Grid>
              {/* REPEAT PASSWORD */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    label="Repetir Contraseña"
                    variant="outlined"
                    value={values.repeatPassword}
                    onChange={handleChange}
                  />
                  <span className="error">
                    <ErrorMessage name="repeatPassword" />
                  </span>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <InputLabel style={{ marginBottom: ".5rem" }}>
                  Dirección
                </InputLabel>
                <Field name="location" id="location">
                  {({ field, form }) => (
                    <Map
                      onClick={(e) => {
                        form.setFieldValue(field.name, e.latLng.toString());
                        setShowMarker(true);
                        setMarkerPosition(e.latLng);
                      }}
                      showMarker={showMarker}
                      markerPosition={markerPosition}
                      defaultZoom={12}
                      defaultCenter={{ lat: -34.60376, lng: -58.38162 }}
                      containerElement={<div style={{ height: "300px" }}></div>}
                    />
                  )}
                </Field>
              </Grid> */}
              {/* SUBMIT */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.conditions}
                      onChange={handleChange}
                      name="conditions"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Acepto los{" "}
                      <a href="#" onClick={handleOpenModal}>
                        términos y condiciones.
                      </a>
                    </Typography>
                  }
                />
                <div className="error" style={{ marginBottom: "5px" }}>
                  <ErrorMessage name="conditions" />
                </div>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Registrarse
                </Button>
                {formSuccess && (
                  <Typography>Se ha registrado correctamente</Typography>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Dialog
        open={ixsodalOpen}
        onClose={handleOpenModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        scroll="body"
      >
        {body}
      </Dialog>
    </div>
  );
};
export default FormRegister;
