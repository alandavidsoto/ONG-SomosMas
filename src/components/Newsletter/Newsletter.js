import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Snackbar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as Yup from "yup";
import { useHistory } from "react-router";

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Email Invalido").required("Requerido"),
});
const token = localStorage.getItem("token");
const Newsletter = () => {
  const history = useHistory();
  const [isSubscribed, setisSubscribed] = useState(
    localStorage.getItem("subscribed")
  );
  function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }
  const redirectAndAlert = () => {
    setTimeout(() => {
      history.push("/");
    }, 5000);
    return (
      <div>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error">
            Debes estar autenticado para poder subscribirte
          </Alert>
        </Snackbar>
      </div>
    );
  };
  const onSubmit = () => {
    localStorage.setItem("subscribed", true);
    setisSubscribed(true);
  };
  return (
    <div>
      {(!token && redirectAndAlert()) ||
        (!isSubscribed && (
          <>
            <Typography variant="body1" align="center">
              Subcribirse al Newsletter
            </Typography>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={emailSchema}
              onSubmit={onSubmit}
            >
              {({ errors }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    margin="dense"
                    id="outlined-basic"
                    name="email"
                    type="text"
                    label="Email"
                    variant="outlined"
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="small"
                  >
                    Enviar
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        ))}
    </div>
  );
};

export default Newsletter;
