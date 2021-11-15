import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  Link,
} from "@material-ui/core";
const MenuResponsive = (props) => {
  const {
    toggleDrawer,
    showMenu,
    matchBreakpoint,
    RouterLink,
    getActive,
    campaigns,
    items,
    setShowMenu,
    isAdmi,
    isUser,
    logoutUser,
  } = props;
  return (
    <>
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
                {!isUser && (
                  <>
                    <ListItem component={RouterLink} to="/login" button>
                      <Typography
                        color={getActive("/login", true)}
                        variant="h6"
                      >
                        Login
                      </Typography>
                    </ListItem>

                    <ListItem component={RouterLink} to="/register" button>
                      <Typography
                        color={getActive("/register", true)}
                        variant="h6"
                      >
                        Registrarse
                      </Typography>
                    </ListItem>
                  </>
                )}
                {isUser && (
                  <>
                    <ListItem component={RouterLink} to="/perfil" button>
                      <Typography
                        color={getActive("/perfil", true)}
                        variant="h6"
                      >
                        Perfil
                      </Typography>
                    </ListItem>
                  </>
                )}
                {isAdmi && (
                  <ListItem component={RouterLink} to="/escritorio" button>
                    <Typography
                      color={getActive("/escritorio", true)}
                      variant="h6"
                    >
                      Escritorio
                    </Typography>
                  </ListItem>
                )}

                <ListItem component={RouterLink} to="/" button>
                  <Typography color={getActive("/", true)} variant="h6">
                    Inicio
                  </Typography>
                </ListItem>
                <ListItem component={RouterLink} to="/nosotros" button>
                  <Typography color={getActive("/nosotros", true)} variant="h6">
                    Nosotros
                  </Typography>
                </ListItem>
                {!isAdmi && (
                  <>
                    <ListItem component={RouterLink} to="/contacto" button>
                      <Typography
                        color={getActive("/contacto", true)}
                        variant="h6"
                      >
                        Contacto
                      </Typography>
                    </ListItem>
                    <ListItem component={RouterLink} to="/donacion" button>
                      <Typography
                        color={getActive("/donacion", true)}
                        variant="h6"
                      >
                        Donacion
                      </Typography>
                    </ListItem>
                  </>
                )}

                {campaigns.map((camp) => (
                  <ListItem
                    button
                    key={camp.id}
                    to={camp.link}
                    component={RouterLink}
                  >
                    <Typography color={getActive(camp.link, true)} variant="h6">
                      {camp.name}
                    </Typography>
                  </ListItem>
                ))}
              </>
            )}

            {items.map((item, index) => {
              // if it's a private route and there isn't a user logged it will not render
              if (item.requiresAuth && !user) return null;
              else
                return (
                  <ListItem
                    component={RouterLink}
                    key={index}
                    to={item.link}
                    button
                  >
                    <Typography color={getActive(item.link, true)} variant="h6">
                      {item.name}
                    </Typography>
                  </ListItem>
                );
            })}
            {isUser && (
              <ListItem button onClick={logoutUser}>
                <Typography color={getActive("/salir", true)} variant="h6">
                  Salir
                </Typography>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MenuResponsive;
