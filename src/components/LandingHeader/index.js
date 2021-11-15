import React from "react";
import {
  Box,
  makeStyles,
  Divider,
  useMediaQuery,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "70px",
  },
  point_smart_TV: {
    [theme.breakpoints.up("xl")]: {
      backgroundColor: "rgba(50, 150, 253, 0.74)",
    },
  },
}));

const LandingHeader = () => {
  const classes = useStyles();
  const matchMobile = useMediaQuery("(min-width:0px)");
  const matchTablet = useMediaQuery("(min-width:600px)");
  const matchDesktop = useMediaQuery("(min-width:960px)");
  return (
    <>
      <Box
        component="header"
        boxShadow={3}
        className={`${classes.point_smart_TV} ${classes.flex}`}
      >
        {matchMobile && (
          <Box sx={{ width: "55px" }}>
            <img
              style={{ width: "100%" }}
              src="https://res.cloudinary.com/dcea83ydd/image/upload/v1634941394/carpeta%20de%20pruebas%28%20no%20importante%29/Logotipo_campa%C3%B1a_materiales_escolares_cybytl.png"
            />
          </Box>
        )}
        {matchDesktop && <Typography variant="h5">Slogan Campaña </Typography>}
        {matchTablet && (
          <Box sx={{ width: "110px" }}>
            <img
              style={{ width: "100%" }}
              src="https://res.cloudinary.com/dcea83ydd/image/upload/v1634941775/carpeta%20de%20pruebas%28%20no%20importante%29/LOGO-SOMOS_MAS_srxf8q.png"
            />
          </Box>
        )}
      </Box>
    </>
  );
};
export default LandingHeader;
