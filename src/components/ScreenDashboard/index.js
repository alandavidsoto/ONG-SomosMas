import { Box, Grid, Typography } from "@material-ui/core";
import Card from "./Card";
import React from "react";

const sections1 = [
  {
    section: "Actividades",
    path: "/backoffice/activities",
    image:
      "https://res.cloudinary.com/dcea83ydd/image/upload/v1636035715/carpeta%20de%20pruebas%28%20no%20importante%29/activities_nidisp.png",
  },
  {
    section: "Categorias",
    path: "/backoffice/categories",
    image:
      "https://res.cloudinary.com/dcea83ydd/image/upload/v1636037544/carpeta%20de%20pruebas%28%20no%20importante%29/options_ggj4xm.png",
  },
  {
    section: "Miembros",
    path: "/backoffice/members",
    image:
      "https://res.cloudinary.com/dcea83ydd/image/upload/v1636037653/carpeta%20de%20pruebas%28%20no%20importante%29/team_n3eu4f.png",
  },
  {
    section: "Novedades",
    path: "/backoffice/news",
    image:
      "https://res.cloudinary.com/dcea83ydd/image/upload/v1636035763/carpeta%20de%20pruebas%28%20no%20importante%29/newspaper_rb5cad.png",
  },
];

const sections2 = [
  {
    section: "Slides",
    path: "/backoffice/slides",
    image:
      "https://res.cloudinary.com/dcea83ydd/image/upload/v1635971214/carpeta%20de%20pruebas%28%20no%20importante%29/slides_fos2kq.png",
  },
  {
    section: "Usuarios",
    path: "/backoffice/users",
    image:
      "https://res.cloudinary.com/dcea83ydd/image/upload/v1636036661/carpeta%20de%20pruebas%28%20no%20importante%29/team-member_fc9fvl.png",
  },
  {
    section: "Organización",
    path: "/backoffice/organization",
    image:
      "https://res.cloudinary.com/dcea83ydd/image/upload/v1636037773/carpeta%20de%20pruebas%28%20no%20importante%29/organization-chart_ze4hue.png",
  },

  {
    section: "Testimonios",
    path: false,
    image:
      "https://res.cloudinary.com/dcea83ydd/image/upload/v1636036361/carpeta%20de%20pruebas%28%20no%20importante%29/testimonial_fs3spr.png",
  },
];

const index = () => {
  return (
    <Box height="20%">
      <Typography variant="h4" color="primary">
        Bienvenido al Dashboard!
      </Typography>
      <Grid
        container
        justifyContent="space-around"
        style={{ margin: "25px 0px" }}
      >
        {sections1.map((section) => (
          <Card element={section} key={section.section} />
        ))}
      </Grid>
      <Grid
        container
        justifyContent="space-around"
        style={{ marginTop: "20px" }}
      >
        {sections2.map((section) => (
          <Card element={section} key={section.section} />
        ))}
      </Grid>
    </Box>
  );
};

export default index;
