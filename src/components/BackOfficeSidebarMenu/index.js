import { Divider, Drawer, List, ListItem } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { LinksBackOffice } from "./LinksBackOffice.js";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import ChromeReaderModeRoundedIcon from "@material-ui/icons/ChromeReaderModeRounded";
const drawerWidth = 240;
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
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
  const { handleDrawerClose, open } = props;
  const classes = useStyles();
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {LinksBackOffice.map((item, index) => (
          <>
            <ListItem button key={index} component={RouterLink} to={item.link}>
              <ListItemIcon>
                <ChromeReaderModeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        {drawer}
      </Drawer>
    </>
  );
};

export default index;
index.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
};
