import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Countdown from "react-countdown";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "350px",
    display: "flex",
    flexDirection: "column",
    paddingTop: "2.5rem",
    boxSizing: "border-box",
    [theme.breakpoints.up("xl")]: {
      backgroundColor: "rgba(154, 201, 251, 0.25)",
    },
  },
  countdown: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  data: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  dataTexts: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1rem",
    },
  },
  img1: {
    display: "none",
    width: "100px",
    position: "absolute",
    top: "-100%",
    left: "-100px",
    transform: "rotate(45deg)",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  img2: {
    display: "none",
    width: "80px",
    position: "absolute",
    left: "-50px",
    transform: "rotate(15deg)",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  img3: {
    display: "none",
    width: "60px",
    position: "absolute",
    left: "50%",
    transform: "rotate(45deg)",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  img4: {
    display: "none",
    width: "80px",
    position: "absolute",
    right: "-10%",
    transform: "rotate(45deg)",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  img5: {
    display: "none",
    width: "50px",
    position: "absolute",
    top: "-100%",
    right: "-10%",
    transform: "rotate(65deg)",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

const dateRenderer = ({ hours, minutes, days, completed }) => {
  if (completed)
    return <Typography variant="h5">Termino la espera!</Typography>;
  else
    return (
      <Typography variant="h5">
        Te quedan: {days}d {hours}h {minutes}m para participar
      </Typography>
    );
};

const index = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} py={2} textAlign="center">
      <Box mb={2} className={classes.data}>
        <Typography variant="h5">20/1/2022</Typography>
        <Typography className={classes.dataTexts} variant="h5">
          13:15hs
        </Typography>
        <Typography className={classes.dataTexts} variant="h6">
          Calle 123, Localidad, Provincia.
        </Typography>
      </Box>
      <Box mb={2} className={classes.countdown}>
        <Countdown
          renderer={dateRenderer}
          date={new Date(2022, 1, 20, 13, 15)}
        />
      </Box>
      <Box position="relative" mx="auto" maxWidth={600}>
        <Typography align="center">
          Descripcion Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Vel tempore eveniet error architecto, natus et, excepturi nemo ab hic
          vitae rem quia eius iste temporibus ea provident, maiores magnam
          tenetur.
        </Typography>
        <img
          className={classes.img1}
          src="./images/campaña-escolar/1.png"
          alt="utiles"
        />
        <img
          className={classes.img2}
          src="./images/campaña-escolar/2.png"
          alt="utiles"
        />
        <img
          className={classes.img3}
          src="./images/campaña-escolar/3.png"
          alt="utiles"
        />
        <img
          className={classes.img4}
          src="./images/campaña-escolar/4.png"
          alt="utiles"
        />
        <img
          className={classes.img5}
          src="./images/campaña-escolar/5.png"
          alt="utiles"
        />
      </Box>
    </Box>
  );
};

export default index;
