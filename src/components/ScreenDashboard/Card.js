import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

const Card = ({ element }) => {
  return (
    <Grid
      item
      xs={2}
      style={{
        boxShadow: "0px 0px 3px #ccc",
        maxWidth: "300px",
        borderRadius: "7px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box height="20%">
        <Typography variant="h6">{element.section}</Typography>
      </Box>
      <Box height="60%">
        <img style={{ width: "50%", maxWidth: "85px" }} src={element.image} />
      </Box>
      <Box height="20%">
        <Link
          to={element.path}
          component={Button}
          variant="contained"
          color="primary"
        >
          ingresar
        </Link>
      </Box>
    </Grid>
  );
};
export default Card;
