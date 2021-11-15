import React from "react";
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
/* import Maxletters from "./maxletters"; */
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Maxletters from "./Maxletters";

const CustomCard = ({ title, description, image, direction }) => {
  const getColor = () => {
    const number = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    if (number === 3) return "#dbeafa";
    if (number === 2) return "#fbc5c3";
    if (number === 1) return "#fefec0";
  };
  const flexDirection = direction ? "row" : "row-reverse";
  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      flexDirection: flexDirection,
      /* backgroundColor: getColor(), */
      width: "90vw",
      boxShadow:
        "0px 2px 40px -1px rgb(0 0 0 / 20%), 0px 4px 50px 0px rgb(0 0 0 / 14%), 0px 1px 50px 0px rgb(0 0 0 / 12%)",
    },
    media: {
      maxWidth: "25vw",
      height: "35vh",
    },
  }));
  const classes = useStyles();
  const cardImage = image || "/images/placeholder/150x150.png";
  return (
    <Card className={classes.container}>
      <CardMedia
        className={classes.media}
        component="img"
        width="300"
        image={cardImage}
        alt={title}
      />
      <CardContent>
        <Typography align="left" variant="h5">
          {title}
        </Typography>
        <Divider />

        <Typography align="left" style={{ color: "#555" }}>
          &ldquo;{description ? description.replace(/<[^>]*>/g, " ") : null}
          &rdquo;
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
