import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./HeartIcon.scss";
const LINK_PAYMENT = "https://mpago.la/2Ab6t13";

const Donation = ({ donationText }) => {
  const redirectToCheckout = () => {
    window.open(LINK_PAYMENT);
    /* window.location.href = LINK_PAYMENT; */
  };

  return (
    <Grid
      container
      style={{ height: "100vh", display: "flex", alignContent: "center" }}
    >
      <Grid item xs={12} sm={6} align="center" style={{ alignSelf: "center" }}>
        <Button
          variant="outlined"
          size="large"
          onClick={redirectToCheckout}
          style={{
            borderRadius: 10,
            boxShadow: "none",
            borderColor: "#9AC9FB",
            color: "#9AC9FB",
            fontSize: "28px",
          }}
        >
          D<FavoriteIcon style={{ color: "#DB5752" }} className="throb" />
          NAR
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        style={{
          height: "90vh",
          marginTop: "20px",
          borderRadius: "5rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#59C371",
          color: "#fafafa",
        }}
      >
        <Typography variant="h2" style={{ padding: 100 }}>
          {donationText ||
            "Si queres hacer una contribución a nuestro proyecto, podes hacerla a través de Mercado Pago haciendo click en el botón DONAR."}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Donation;
