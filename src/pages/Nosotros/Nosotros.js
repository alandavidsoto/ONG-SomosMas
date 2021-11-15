import React, { useEffect, useState } from "react";
import About from "../../components/About";
import { Box, Button, Typography } from "@material-ui/core";
import { getOrganization } from "../../app/organization/organizationAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllOrganization } from "../../app/organization/organizationSelector";
import { SweetAlert } from "../../utils/SetupAlert";
import { useSpinner } from "../../hooks/useSetupSpinner";
import { Timeline } from "react-twitter-widgets";
import { makeStyles } from "@material-ui/core/styles";
import { Facebook, Instagram, LinkedIn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  socials: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
  },
  buttons: {
    marginTop: ".5rem",
  },
  socialButton: {
    marginBottom: ".5rem",
  },
  twitter: {
    padding: ".5rem",
  },
}));

const Nosotros = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const organizationData = useSelector(selectAllOrganization);
  const organizationStatus = useSelector((state) => state.organization.status);
  const spinner = useSpinner();

  useEffect(() => {
    if (organizationStatus === "idle") {
      dispatch(getOrganization());
    }
  }, []);

  if (organizationStatus === "loading") {
    return spinner.loader;
  }
  if (organizationStatus === "error") {
    SweetAlert("error");
  }

  return (
    <>
      <About about="" />
      <Box className={classes.socials}>
        <Typography variant="h5">Redes sociales</Typography>
        <Box className={classes.buttons}>
          <Button
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.linkedin.com/in/somos-mas-059668225/"
            className={classes.socialButton}
            fullWidth
            color="secondary"
            variant="contained"
          >
            <LinkedIn /> LinkedIn
          </Button>
          <Button
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.facebook.com/Somos-Más-Fundación-104277135400243"
            className={classes.socialButton}
            fullWidth
            color="secondary"
            variant="contained"
          >
            <Facebook /> Facebook
          </Button>
          <Button
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.instagram.com/somosmas_fund/"
            className={classes.socialButton}
            fullWidth
            color="secondary"
            variant="contained"
          >
            <Instagram /> Instagram
          </Button>
        </Box>
        <Box className={classes.twitter}>
          <Timeline
            dataSource={{ sourceType: "profile", screenName: "somosmas_fund" }}
            options={{ height: "500" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Nosotros;
