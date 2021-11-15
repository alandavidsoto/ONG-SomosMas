import React, { useRef, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import TextField from "../TextField";
import Alert from "@material-ui/lab/Alert";
import { usersAPI } from "../../api/methods";

import styles from "./styles.module.scss";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UserForm = ({ onSubmit, titleForm, initialValues }) => {
  const [errorApi, setErrorApi] = useState();

  const image = useRef();
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "El email es requerido.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "El email es invalido";
    }
    if (!values.password) {
      errors.password = "Contraseña requerida.";
    }
    if (values.password.length < 8) {
      errors.password = "Tu contraseña debe tener minimo 8 caracteres.";
    }

    if (!values.name) {
      errors.name = "El nombre es requerido.";
    }
    if (values.name.length < 4) {
      errors.name = "Tu nombre debe tener minimo 4 caracteres.";
    }
    if (!values.role) {
      errors.role = "Elija un rol.";
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    if (initialValues) {
      await usersAPI
        .update(values.id, values)
        .then(() => console.log("User updated successfully"))
        .catch((error) => setErrorApi(error.response.data.errors));
    } else {
      await usersAPI
        .create(values)
        .then(() => console.log("User created successfully"))
        .catch((error) => setErrorApi(error.response.data.errors));
    }
  };

  const formik = useFormik({
    initialValues: initialValues || {
      email: "@",
      password: "",
      name: "",
      role: 0,
      profile_image: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
  });

  const handleOnChangeImage = async (ev) => {
    const [file] = ev.currentTarget.files;

    if (file) {
      image.current.src = URL.createObjectURL(file);
    }
    const image64 = await toBase64(file);
    formik.setFieldValue("profile_image", image64);
  };

  return (
    <Card variant="outlined" className={styles.userFormContainer}>
      <Container className={styles.formHeader}>
        <Typography variant="h3">{titleForm}</Typography>
      </Container>
      <form onSubmit={formik.handleSubmit} className={styles.userForm}>
        <CardMedia className={styles.imageContainer}>
          <InputLabel>
            <img
              className={styles.imageUser}
              ref={image}
              alt={formik.values.profile_image}
              id="profile_image"
            />
            <Input
              type="file"
              accept="image.jpg image.png"
              name="profile_image"
              onChange={handleOnChangeImage}
            />
          </InputLabel>
        </CardMedia>
        <CardContent>
          <TextField
            onChange={formik.handleChange}
            value={formik.values.name}
            controlId="name"
            label="Nombre"
            placeholder="Nombre"
            id="name"
            error={formik.errors.name}
            onBlur={formik.handleBlur}
          />
          <TextField
            onChange={formik.handleChange}
            value={formik.values.email}
            controlId="email"
            type="email"
            id="email"
            label="Email"
            placeholder="Email"
            error={formik.errors.email}
            onBlur={formik.handleBlur}
          />
          <TextField
            type="password"
            label="Contraseña"
            controlId="password"
            placeholder="Contraseña"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            onBlur={formik.handleBlur}
          />
          <FormControl controlId="role">
            <InputLabel id="role">Rol</InputLabel>
            <Select
              value={formik.values.role}
              error={formik.errors.role}
              label="Rol"
              name="role"
              labelId="role"
              onChange={formik.handleChange}
            >
              <MenuItem value={0}>Administrador</MenuItem>
              <MenuItem value={1}>Regular</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" className={styles.button}>
            Guardar
          </Button>
          {errorApi && (
            <Alert severity="Error"> {Object.values(errorApi)}</Alert>
          )}
        </CardContent>
      </form>
    </Card>
  );
};
export default UserForm;
