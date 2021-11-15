import { Box, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React from "react";
import "./style.scss";
const Item = ({ item }) => {
  return (
    <div className="Carousel-container-item">
      <div className="centered">
        <Typography
          variant="h2"
          align="right"
          style={{ paddingRight: "100px" }}
        >
          {item.name}
        </Typography>
      </div>
      <img src={item.image} alt={item.title} className="Carousel-img" />
    </div>
  );
};

export default Item;
