import React from "react";
import "./LandingFooter.scss";

import {
  SvgIcon,
  Box,
  makeStyles
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  LandingFooter_Container: {
    position: "fixed",
    bottom: 0,
    height: "30vh",
    width: "100%",
    backgroundColor: "#9AC9FB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    [theme.breakpoints.up("lg")]: {
      padding: "2rem",
      height: "10vh",
    }
  },
  Ong_Logo: {
    width: "75%",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%"
    },
  },
  Logo: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
      margin: "0 auto"
    }
  },
  Ong_Name: {
    width: "30%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around"
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "40%",
    },
  },
  Link: {
    display: "none",
    fontSize: "24px",
    textDecoration: "none",
    color: "#FAFAFA",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  campaign: {
    display: "none",
    fontSize: "24px",
    textDecoration: "none",
    color: "#FAFAFA",
    [theme.breakpoints.up("xl")]: {
      display: "block",
    },
  },
  Social_Media: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      width: "20%",
    },
  },
  Network: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FAFAFA",
    textDecoration: "none",
    margin: "5px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "24px"
    },
    [theme.breakpoints.up("lg")]: {
      margin: "1px",
    },
  },
  Network_Name: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      marginLeft: "5px"
    },
  },

}));

const LandingFooter = () => {
  const classes = useStyles();
  return (
    <Box className={classes.LandingFooter_Container}>
      <Box my={2} />
      <Box component="div" className={classes.Ong_Logo}>
        <img
          className={classes.Logo}
          src="./images/ong/outlinedLogo.png"
          alt="logo"
        />
      </Box>
      <Box component="div" className={classes.Ong_Name}>
        <a href="/" className={classes.Link} >Ingresá a<br />Somos Más</a>
        <a href="/" className={classes.campaign} >Campaña Alimentos</a>
        <a href="/" className={classes.campaign} >Campaña Deportes</a>
      </Box>
      <Box component="div" className={classes.Social_Media}>
        <a href="" className={classes.Network}><SvgIcon component={FacebookIcon} /> <p className={classes.Network_Name}>Facebook</p></a>
        <a href="" className={classes.Network}><SvgIcon component={InstagramIcon} /> <p className={classes.Network_Name}>Instagram</p></a>
      </Box>
    </Box>
  )
}

export default LandingFooter;
