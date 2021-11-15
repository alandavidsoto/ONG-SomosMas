import React from "react";
import defaultImage from "./defaultImage.jpg";
import { Container, Typography } from "@material-ui/core";

const DisplayTitle = ({ titleText, fontColor, backgroundImg }) => {
  const image = backgroundImg || defaultImage;

  const color = fontColor || "black";

  const styles = {
    containerStyles: {
      background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      marginTop: "20px",
      borderRadius: "1em",
      color: color,
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    typography: {
      /* fontFamily: "aracned", */
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textShadow: color == "white" ? "0px 0px 3px #222" : "none",
    },
  };
  return (
    <Container style={styles.containerStyles}>
      <Typography variant="h1" style={styles.typography}>
        {titleText}
      </Typography>
    </Container>
  );
};

export default DisplayTitle;
