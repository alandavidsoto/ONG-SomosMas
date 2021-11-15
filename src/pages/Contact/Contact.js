import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Container,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";
import DisplayTitle from "../../components/DisplayTitle/DisplayTitle";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { getOrganization } from "../../app/organization/organizationAsyncActions";
import iconCreator from "./iconCreator ";
import icon from "./iconsMarkerPosition/map-pin-red.svg";
import { SweetAlert } from "../../utils/SetupAlert";
import { useHistory } from "react-router";
import imagen1 from "./imagen1.jpg";
import ContactForm from "../../components/ContactForm/ContactForm";
import {
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
} from "@material-ui/icons";

const Contact = ({ contactData }) => {
  const role =
    JSON.parse(localStorage.getItem("dataUser")) &&
    JSON.parse(localStorage.getItem("dataUser")).role === "admi";
  const history = useHistory();
  const dispatch = useDispatch();
  const ongData = useSelector((state) => state.organization.organization[0]);

  useEffect(() => {
    dispatch(getOrganization()).catch(() => SweetAlert("error"));
  }, []);
  return (
    <>
      {ongData && (
        <Container>
          <DisplayTitle
            titleText={"Contacto"}
            fontColor={"white"}
            backgroundImg={imagen1}
          />
          <Grid container style={{ marginTop: "30px" }}>
            <Grid md={6} /* style={{ padding: "10px" }} */>
              <ContactForm />
            </Grid>
            <Grid item md={6}>
              <Typography variant="h3" align="center">
                Ubicación
              </Typography>
              {ongData && (
                <MapContainer
                  center={ongData ? JSON.parse(ongData.address) : null}
                  zoom={14}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    title="Av. Dr. Ricardo Balbín 3126, Buenos Aires"
                    alt="Direccion"
                    position={ongData ? JSON.parse(ongData.address) : null}
                    icon={iconCreator(icon)}
                  >
                    <Popup>ONG - Somos Más.</Popup>
                  </Marker>
                </MapContainer>
              )}
              <Box m={2}>
                <Typography variant="h6" align="left">
                  Direccion:{" "}
                  <span style={{ color: "#444" }}>
                    Av. Dr. Ricardo Balbín 3126, Buenos Aires
                  </span>
                </Typography>
                <Divider />
                <Divider />
                <Typography variant="h6" align="left">
                  Correo Electronico:{" "}
                  <span style={{ color: "#444" }}>{contactData.email}</span>
                </Typography>
                <Divider />
                <Divider />
                <Typography variant="h6" align="left">
                  Telefono:{" "}
                  <span style={{ color: "#444" }}>+549{ongData.cellphone}</span>
                </Typography>
                <Divider />
                <Divider />
                <Typography variant="h6" align="left">
                  Nuestras redes Sociales:
                  <Box display="flex" alignItems="center" margin="5px 0px">
                    <FacebookIcon style={{ color: "#395498" }} />
                    <Typography
                      component={Link}
                      href={"http://" + ongData.facebook_url}
                      variant="body1"
                      style={{ textDecoration: "none" }}
                    >
                      &nbsp;{ongData.facebook_url}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" margin="5px 0px">
                    <LinkedInIcon style={{ color: "#0073B1" }} />
                    <Typography
                      component={Link}
                      href={"http://" + ongData.linkedin_url}
                      variant="body1"
                      style={{ textDecoration: "none" }}
                    >
                      &nbsp;{ongData.linkedin_url}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" margin="5px 0px">
                    <InstagramIcon style={{ color: "#DD3627" }} />
                    <Typography
                      component={Link}
                      href={"http://" + ongData.instagram_url}
                      variant="body1"
                      style={{ textDecoration: "none" }}
                    >
                      &nbsp;{ongData.instagram_url}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" margin="5px 0px">
                    <TwitterIcon style={{ color: "#00A6E8" }} />
                    <Typography
                      component={Link}
                      href={"http://" + ongData.twitter_url}
                      variant="body1"
                      style={{ textDecoration: "none" }}
                    >
                      &nbsp;{ongData.twitter_url}
                    </Typography>
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Contact;
