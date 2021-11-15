import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import imgNotFound from "./404Cat.svg";
import "./index.scss";
import { Container, Grid } from "@material-ui/core";
import { useLocation, useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "normal",
  },
  imgStyle: {},
});

const index = (props) => {
  const location = useLocation();
  const name = location.state ? location.state.name : "";
  return (
    <>
      <Container maxWidth="sm" className="flex-container">
        <Paper elevation={4} className="item-paper">
          <Typography variant="h3">{name ? name : props.title}</Typography>
          <img src={imgNotFound} />
        </Paper>
      </Container>
    </>
  );
};

index.defaultProps = {
  title: "Lo sentimos, pagina no encontrada...",
};

export default index;
