import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Link,
  List,
  ListItem,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Menu,
  Button,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logout from "../LogoutButton";
import { logout } from "../../app/auth/authReducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
/* const role =
  JSON.parse(localStorage.getItem("dataUser")) &&
  JSON.parse(localStorage.getItem("dataUser")).role === "admi"; */

// campaigns:
const campaigns = [
  {
    id: 1,
    name: "Materiales escolares",
    link: "/campañas/materiales-escolares",
  },
  {
    id: 2,
    name: "Juguetes",
    link: "/campañas/juguetes",
  },
];

const useStyles = makeStyles({
  navbar: {
    height: "70px",
  },
  active: {
    color: "#fff",
    fontWeight: "600",
  },
  inactive: {
    color: "rgba(0,0,0,0.5)",
  },
});

const index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const data = useSelector((state) => state.auth.data);
  const location = useLocation();
  const theme = useTheme();
  const matchBreakpoint = useMediaQuery(theme.breakpoints.down("md"));
  const matchMobile = useMediaQuery(theme.breakpoints.down("xs"));

  // Sidebar Menu
  const [showMenu, setShowMenu] = useState(false);
  const toggleDrawer = (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) return;
    setShowMenu(false);
  };

  // Dropdown campaigns
  const [anchorEl, setAnchorEl] = useState(null);
  const showDropdown = (e) => setAnchorEl(e.currentTarget);
  const closeDropdown = () => setAnchorEl(null);

  // Get active color if current path is equal to header item path
  const getActiveClass = (path) => {
    return location.pathname === path ? classes.active : classes.inactive;
  };
  const getActiveColor = (path) => {
    return location.pathname === path ? "primary" : "initial";
  };
  const logoutUser = useCallback(() => {
    dispatch(logout(null));
    history.push("/");
  }, [history, dispatch]);

  return (
    <>
      <AppBar color="primary" position="sticky">
        <Toolbar
          className={classes.navbar}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box width="10%">
            <img
              style={{ width: "120px" }}
              src="images/ong/colorfullLogo.png"
            />
          </Box>
          <Box
            width="50%"
            alignItems="center"
            justifyContent={matchBreakpoint ? "flex-end" : "center"}
            display={matchBreakpoint ? "none" : "flex"}
          >
            <Link
              to="/"
              variant="h6"
              component={RouterLink}
              className={getActiveClass("/")}
              underline="none"
            >
              Inicio
            </Link>
            <Link
              style={{ marginLeft: "1rem" }}
              to="/activities"
              variant="h6"
              component={RouterLink}
              className={getActiveClass("/activities")}
              underline="none"
            >
              Actividades
            </Link>
            <Link
              style={{ marginLeft: "1rem" }}
              to="/news"
              variant="h6"
              component={RouterLink}
              className={getActiveClass("/news")}
              underline="none"
            >
              Novedades
            </Link>
            <Link
              style={{ marginLeft: "1rem" }}
              to="/donar"
              variant="h6"
              component={RouterLink}
              className={getActiveClass("/donar")}
              underline="none"
            >
              Donar
            </Link>
            <Link
              style={{ marginLeft: "1rem" }}
              to="/contacto"
              variant="h6"
              component={RouterLink}
              className={getActiveClass("/contacto")}
              underline="none"
            >
              Contacto
            </Link>

            <Link
              style={{ marginLeft: "1rem" }}
              variant="h6"
              className={
                location.pathname.includes("campañas")
                  ? classes.active
                  : classes.inactive
              }
              underline="none"
              onClick={showDropdown}
            >
              Campañas
            </Link>
            {data.role == "admi" && (
              <Link
                style={{ marginLeft: "1rem" }}
                to=""
                variant="h6"
                component={RouterLink}
                color="textSecondary"
                underline="none"
                onClick={() => {
                  window.location.pathname = "/backoffice";
                }}
              >
                Backoffice
              </Link>
            )}
            {/* DROPDOWN CAMPAIGNS */}
            <Menu
              anchorEl={anchorEl}
              onClose={closeDropdown}
              open={Boolean(anchorEl)}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Box onMouseLeave={closeDropdown}>
                <List>
                  {campaigns.map((camp) => (
                    <ListItem
                      button
                      key={camp.id}
                      to={camp.link}
                      component={RouterLink}
                    >
                      <Typography
                        color={getActiveColor(camp.link, true)}
                        variant="h6"
                      >
                        {camp.name}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Menu>
          </Box>
          <Box
            marginLeft={matchBreakpoint ? "auto" : 0}
            width="20%"
            display={matchMobile ? "none" : "flex"}
            justifyContent="space-between"
            maxWidth="280px"
            minWidth="260px"
          >
            {!auth ? (
              <>
                <RouterLink
                  to="/login"
                  style={{ marginRight: ".5rem" }}
                  component={Button}
                  variant="outlined"
                >
                  Iniciar Sesion
                </RouterLink>
                <RouterLink
                  to="/register"
                  component={Button}
                  variant="contained"
                >
                  Registrarse
                </RouterLink>
              </>
            ) : (
              <>
                <Box display="flex" alignItems="center">
                  <AccountCircleIcon color="action" fontSize="large" /> ¡Hola{" "}
                  {data.user}!
                </Box>
                <Button
                  style={{ marginLeft: "1rem" }}
                  variant="contained"
                  color="secondary"
                  onClick={logoutUser}
                >
                  Salir
                </Button>
              </>
            )}
          </Box>
          {matchBreakpoint && (
            <IconButton onClick={() => setShowMenu(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* MENU */}
      <Drawer onClose={toggleDrawer} open={showMenu} anchor="right">
        <Box onClick={toggleDrawer} width={300}>
          <IconButton onClick={() => setShowMenu(false)} color="primary">
            <CloseIcon />
          </IconButton>
          <List>
            {/* if device screen is small header basic items will render on menu */}
            {matchBreakpoint && (
              <>
                <ListItem component={RouterLink} to="/" button>
                  <Typography color={getActiveColor("/", true)} variant="h6">
                    Inicio
                  </Typography>
                </ListItem>
                <ListItem component={RouterLink} to="/activities" button>
                  <Typography
                    color={getActiveColor("/activities", true)}
                    variant="h6"
                  >
                    Actividades
                  </Typography>
                </ListItem>
                <ListItem component={RouterLink} to="/news" button>
                  <Typography
                    color={getActiveColor("/news", true)}
                    variant="h6"
                  >
                    Novedades
                  </Typography>
                </ListItem>
                <ListItem component={RouterLink} to="/donar" button>
                  <Typography
                    color={getActiveColor("/donar", true)}
                    variant="h6"
                  >
                    Donar
                  </Typography>
                </ListItem>
                <ListItem component={RouterLink} to="/contacto" button>
                  <Typography
                    color={getActiveColor("/contacto", true)}
                    variant="h6"
                  >
                    Contacto
                  </Typography>
                </ListItem>
                {campaigns.map((camp) => (
                  <ListItem
                    button
                    key={camp.id}
                    to={camp.link}
                    component={RouterLink}
                  >
                    <Typography
                      color={getActiveColor(camp.link, true)}
                      variant="h6"
                    >
                      {camp.name}
                    </Typography>
                  </ListItem>
                ))}
              </>
            )}
          </List>
          <Box
            marginLeft="1rem"
            width="20%"
            display={!matchMobile ? "none" : "flex"}
            justifyContent="space-between"
            maxWidth="280px"
            minWidth="260px"
          >
            {!auth ? (
              <>
                <RouterLink
                  to="/login"
                  style={{ marginRight: ".5rem" }}
                  component={Button}
                  variant="outlined"
                >
                  Iniciar Sesion
                </RouterLink>
                <RouterLink
                  to="/register"
                  component={Button}
                  variant="contained"
                >
                  Registrarse
                </RouterLink>
              </>
            ) : (
              <>
                <Box display="flex" alignItems="center">
                  <AccountCircleIcon color="action" fontSize="large" /> ¡Hola{" "}
                  {data.user}!
                </Box>
                <Button
                  style={{ marginLeft: "1rem" }}
                  variant="contained"
                  color="secondary"
                  onClick={logoutUser}
                >
                  Salir
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default index;
