import React, { useCallback, useState } from "react";
import clsx from "clsx";
import {
  IconButton,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Grid,
  Box,
  Link,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import { logout } from "../../app/auth/authReducer";
import { useHistory } from "react-router-dom";
import "./index.scss";
import PropTypes from "prop-types";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));
const index = (props) => {
  let history = useHistory();
  const { open, handleDrawerOpen } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const logoutUser = useCallback(() => {
    dispatch(logout(null));
    // history.push() no funciona xq piensa que las rutas como "/login" no existen
    window.location.pathname = "/login";
  }, [history, dispatch]);
  return (
    <>
      <CssBaseline />

      <AppBar
        style={{ background: "#000" }}
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
                style={{ color: "#fff" }}
              >
                <MenuIcon style={{ color: "#fff" }} />
              </IconButton>

              <img
                style={{ width: "120px", cursor: "pointer" }}
                src="/images/ong/blackLogo.png"
                onClick={() => history.push("/")}
              />
            </Toolbar>
          </Grid>

          <Grid item xs={6}>
            <Toolbar className="flex-container">
              <Button
                variant="contained"
                color="secondary"
                onClick={logoutUser}
              >
                Salir
              </Button>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
};

export default index;
index.propTypes = {
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
};
