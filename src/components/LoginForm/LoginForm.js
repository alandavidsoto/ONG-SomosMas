import { ErrorMessage, Formik, Form, Field } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import "./LoginForm.scss";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { loginExample } from "../../app/auth/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const userPrueba = {
  user: "juan perez",
  email: "juanperez23@gmail.com",
  role: "user",
  token: "YDutwpNXFQo5aejZ0GCfXWpH7rCXlXO1",
};
const admiPrueba = {
  user: "hann gomez",
  email: "hann23@gmail.com",
  role: "admi",
  token: "YDutwpNXFQo5aejZ0GCfXWpH7rCXlXO1",
};

const LoginForm = () => {
  let history = useHistory();
  // the object with the information will be saved in loginSucces
  const [loginSuccess, setLoginSuccess] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div style={{ width: "90%", maxWidth: "300px", margin: "0px auto" }}>
      <Typography variant="h4">Login</Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        // validation with YUP
        validationSchema={yup.object({
          email: yup
            .string()
            .email("Introduce un email valido")
            .required("No puedes dejar el campo email vacio"),

          password: yup
            .string()
            .min(6, "Debe contener al menos 6 caracteres")
            .matches(/[a-zA-Z]/, "Debe contener al menos una letra")
            .matches(/[0-9]/, "Debe contener al menos 1 Digito")
            .matches(/\W/, "Debe contener al menos 1 simbolo(#@-/)")
            .required("No puedes dejar el campo contraseña vacio"),
        })}
        onSubmit={(formdata, options) => {
          if (formdata.email.trim() === userPrueba.email) {
            dispatch(loginExample(userPrueba));
          }
          if (formdata.email.trim() === admiPrueba.email) {
            dispatch(loginExample(admiPrueba));
            window.location.pathname = "/backoffice";
          }
          setLoginSuccess(formdata); // if everything is fine.
          options.resetForm(); // clean form
        }}
      >
        {/* Render Form */}
        {({ handleChange }) => (
          <Form>
            <FormHelperText>
              *usuario de prueba: <strong>{userPrueba.email}</strong>
            </FormHelperText>
            <FormHelperText>
              *usuario de prueba(ADMI): <strong>{admiPrueba.email}</strong>
            </FormHelperText>
            <Grid container direction="column">
              {/* EMAIL */}
              <Grid
                sm={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid item sm={12} className="marginTop">
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    type="text"
                    name="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error"
                  />
                </FormControl>
              </Grid>
              {/* PASSWORD */}
              <Grid item sm={12} className="marginTop">
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    id="password"
                    label="Contraseña"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                  />
                </FormControl>
              </Grid>
              {/* SUBMIT */}
              <Grid item sm={12} className="marginTop">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Entrar
                </Button>
                {loginSuccess && <Typography>{"logeado (Prueba)"}</Typography>}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
