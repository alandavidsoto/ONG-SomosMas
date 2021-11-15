import React from "react";
import { Paper, Typography } from "@material-ui/core";

import styles from "./styles.module.scss";

const CardItem = ({ name, image }) => {
  return (
    <Paper className={styles.itemContainer} variant="outlined" square>
      <Typography className={styles.nameTypography}>{name}</Typography>

      <img src={image} alt={name} className={styles.imageItem} />
    </Paper>
  );
};

export default CardItem;
