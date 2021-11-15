import { Grid, Paper } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { TitleCenter } from "../TitleCenter";

export const FormBase = (props) => {
  const { children, titleType, ...rest } = props;
  return (
    <Grid>
      <Paper elevation={5} className="paper">
        <TitleCenter titleType={titleType} />
        <Formik {...rest}>{children}</Formik>
      </Paper>
    </Grid>
  );
};
