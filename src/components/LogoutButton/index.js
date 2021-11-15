import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../app/auth/authReducer";

const index = () => {
  const dispatch = useDispatch();
  /* const user = true; */ // TEMPORAL: user is not defined at current dev time
  const handlerClick = () => {
    dispatch(logout());
  };
  return (
    <Button onClick={handlerClick} color="primary" variant="outlined">
      Cerrar sesión
    </Button>
  );
};

export default index;
