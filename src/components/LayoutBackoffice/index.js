import React from "react";
import Footer from "../../components/PublicFooter";
import BackofficeHeader from "../BackofficeHeader/index";
import clsx from "clsx";
import BackofficeSidebarMenu from "../BackOfficeSidebarMenu";
import { useStyles } from "./style.js";
import "../../assets/structure.scss";

const index = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = (e) => {
    setOpen(true);
  };

  const handleDrawerClose = (e) => {
    setOpen(false);
  };
  return (
    <>
      <div
        className={`${classes.root}`}
        style={{ maxHeight: "70vh", minHeight: "70vh" }}
      >
        <BackofficeHeader handleDrawerOpen={handleDrawerOpen} open={open} />
        <BackofficeSidebarMenu
          handleDrawerClose={handleDrawerClose}
          open={open}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </>
  );
};

export default index;
