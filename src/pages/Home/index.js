import "./IndexHome.scss";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Divider,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CarouselSlide from "../../components/Carousel/CarouselSlide";
import { useDispatch, useSelector } from "react-redux";
import { newsAPI, slidesAPI, testimonialsAPI } from "../../api/methods";
import { getOrganization } from "../../app/organization/organizationAsyncActions";
import { SweetAlert } from "../../utils/SetupAlert";
import { useSpinner } from "../../hooks/useSetupSpinner";
import { Link } from "react-router-dom";
import CustomCard from "../../components/CustomCard/CustomCard";

const useStyles = makeStyles({
  mancha: {
    minWidth: "45%",
    margin: "0px auto",
    backgroundSize: "100%",
    backgroundPositionY: "center",
    backgroundImage:
      "url('https://res.cloudinary.com/dcea83ydd/image/upload/v1635917311/carpeta%20de%20pruebas%28%20no%20importante%29/mancha_amarilla_2_tgstmo.png')",
  },
});

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ongData = useSelector((state) => state.organization.organization[0]);
  const [slides, setSlides] = useState(null);
  const [news, setNews] = useState(null);
  const [testimonials, setTestimonials] = useState(null);
  const spinner = useSpinner();

  useEffect(() => {
    spinner.set();
    // organization
    dispatch(getOrganization());
    // slides
    slidesAPI
      .getAll()
      .then((res) => {
        setSlides(res.data.data.slice(0, 3));
        spinner.remove();
      })
      .catch((error) => {
        spinner.remove();
        SweetAlert("error");
      });
    // news
    newsAPI
      .getAll()
      .then((res) => {
        setNews(res.data.data.slice(0, 3));
        spinner.remove();
      })
      .catch((error) => {
        spinner.remove();
        SweetAlert("error");
      });
    // testimonials
    testimonialsAPI
      .getAll()
      .then((res) => {
        setTestimonials(res.data.data.slice(0, 4));
        spinner.remove();
      })
      .catch((error) => {
        spinner.remove();
        SweetAlert("error");
      });
  }, []);
  return (
    <>
      {/* WELCOME TEXT */}
      <Box m={3}>
        <Typography variant="h2" className={classes.mancha}>
          {ongData ? ongData.welcome_text : null}
        </Typography>
      </Box>
      {/* SLIDER */}
      <Box boxShadow={1} mt={3} mb={3} sx={{ width: "100%" }}>
        {slides && <CarouselSlide items={slides} />}
      </Box>

      {/* NEWS LIST */}
      <Box m={3}>
        <Box m={3}>
          <Typography variant="h3" className={classes.mancha}>
            Ultimas Novedades
          </Typography>
        </Box>
        <Grid container spacing={5} justifyContent="space-around">
          {news &&
            news.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  style={{
                    minHeight: "300px",
                    boxShadow:
                      "0px 2px 40px -1px rgb(0 0 0 / 20%), 0px 4px 50px 0px rgb(0 0 0 / 14%), 0px 1px 50px 0px rgb(0 0 0 / 12%)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography noWrap align="left" variant="h3">
                      {item.name}
                    </Typography>
                    <Divider />
                    <Box marginTop="25px">
                      <Link
                        to={`news/${item.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          my={10}
                          variant="contained"
                          fullWidth
                          color="primary"
                        >
                          Detalles
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          {/* <Item element={element} key={element.id} /> */}
        </Grid>
        <Box m={4}>
          <Link
            to="/news"
            component={Button}
            variant="outlined"
            size="large"
            color="secondary"
          >
            Ver todas
          </Link>
        </Box>
      </Box>

      {/* TESTIMONIALS  LIST */}
      <Box m={3}>
        <Box m={3}>
          <Typography variant="h3" className={classes.mancha}>
            Testimonios
          </Typography>
        </Box>
        <Grid container spacing={5} justifyContent="space-around">
          {testimonials &&
            testimonials.map(({ id, name, description, image }) => (
              <Grid item key={id}>
                <CustomCard
                  title={name}
                  description={description}
                  image={image}
                  direction={id % 2 === 0}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};
export default Home;

export const Item = ({ element }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      style={{ maxHeight: "400px", minHeight: "200px" }}
    >
      <img
        src={element.image}
        alt={element.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Grid>
  );
};
