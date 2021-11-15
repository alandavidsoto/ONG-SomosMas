import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";

const About = ({ about }) => {
  return (
    <Box>
      <Typography variant="h2">Nosotros</Typography>
      <Divider style={{ marginTop: ".5rem" }} />
      <Box mt={2}>{about}</Box>
    </Box>
  );
};

export default About;
