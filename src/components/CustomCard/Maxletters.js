import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Maxletters = ({ description, id, path }) => {
  const max = 135;
  if (description != null && description.length >= max) {
    description = description.slice(0, max);
    description = (
      <>
        {description}
        <Link to={`${path}/${id}`} style={{ textDecoration: "none" }}>
          ...ver Mas
        </Link>
      </>
    );
  }
  return (
    <Typography
      align="left"
      variant="body1"
      style={{ color: "#555", marginTop: "5px" }}
    >
      {description}
    </Typography>
  );
};

export default Maxletters;
