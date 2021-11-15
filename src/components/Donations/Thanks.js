import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Container, Paper } from '@material-ui/core';
import "./Thanks.scss";
const Thanks = ({ donationText }) => {
  return (
    <Container maxWidth="lg" className="flex-container">
      <Paper>
        <Grid container className="flex-item">
          <Grid item xs={12}>
            <Typography
              variant="h2"
              style={{ padding: 50, backgroundColor: "#59C371", color: "#fafafa",}}
            >
              ¡GRACIAS!
            </Typography>
            <Typography variant="h4" style={{ padding: 10 }}>
              ¡Valoramos mucho el gesto que acabas de tener!
            </Typography>
            <Typography variant="body1" className="text">
              Cada apoyo que recibimos es un abrazo que nos motiva a seguir adelante
              con este proyecto.
              <br />
              Nos alegra mucho que seas parte de esto donando algo de vos, ya sea
              tiempo, dinero o espacio en tu vida.
              <br />
              Esperamos que este esfuerzo rinda sus frutos.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Thanks;
