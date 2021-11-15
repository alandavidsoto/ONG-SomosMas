import { Grid, Typography } from "@material-ui/core";
import React from "react";

export const TitleCenter = (props) => {
  const { titleType } = props;
  return (
    <Grid align="center">
      <Typography variant="h6">{titleType}</Typography>
    </Grid>
  );
};
