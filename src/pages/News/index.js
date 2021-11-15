import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  InputBase,
  makeStyles,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@material-ui/core";
import DisplayTitle from "../../components/DisplayTitle/DisplayTitle";
import { Link } from "react-router-dom";
import { newsAPI } from "../../api/methods";
import Player from "../../components/Player/Player";
import { useSpinner } from "../../hooks/useSetupSpinner";
import { SweetAlert } from "../../utils/SetupAlert";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    boxShadow: "0px 0px 3px #aaa",
    width: "60%",
    margin: "40px auto",
    padding: "7px",
    borderRadius: "5px",
    position: "relative",
  },
  input: {
    width: "90%",
  },
  SearchIcon: {
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const News = () => {
  const classes = useStyles();
  const [formInput, setFormInput] = useState("");
  const [news, setNews] = useState([]);
  // "toggleNewsAll" works as a flag to get all the news only once
  const [toggleNewsAll, setToggleNewsAll] = useState(false);
  const { state, set, remove, loader } = useSpinner();

  useEffect(() => {
    const getData = async () => {
      try {
        set();
        const { data } = await newsAPI.getAll();
        setNews(data.data);
        setToggleNewsAll(true);
      } catch (err) {
        SweetAlert("error");
      } finally {
        remove();
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (formInput.length >= 3) {
      set();
      newsAPI.Get(`news?search=${formInput}`).then((res) => {
        setNews(res.data.data);
        setToggleNewsAll(false);
        remove();
      });
    } else {
      if (!toggleNewsAll) {
        set();
        newsAPI.Get("news").then((res) => {
          setNews(res.data.data);
          setToggleNewsAll(true);
          remove();
        });
      }
    }
  }, [formInput]);

  return (
    <Container>
      <DisplayTitle
        titleText="Novedades"
        backgroundImg="./images/fotos/Foto3.jpg"
        fontColor="white"
      />
      <div className={classes.wrapper}>
        <InputBase
          placeholder="Buscar Novedad..."
          onChange={(e) => setFormInput(e.target.value)}
          inputProps={{ "aria-label": "search" }}
          className={classes.input}
        />
        <div className={classes.SearchIcon}>
          <SearchIcon />
        </div>
      </div>
      <Box sx={{ width: "100%", margin: "50px 0px" }}>
        {state ? (
          loader
        ) : (
          <Grid
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{ minHeight: "70vh" }}
            justifyContent="center"
          >
            {news.length > 0 ? (
              news.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    style={{
                      minHeight: "300px",
                      margin: "30px",
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
                            alignItems="center"
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
              ))
            ) : (
              <Typography variant="h3">
                No se Encontro Ningun Resultado para{" "}
                <b>&#39;{formInput}&#39;</b>
              </Typography>
            )}
          </Grid>
        )}
      </Box>
      <Typography variant="h4">Último Evento</Typography>
      <Player />
    </Container>
  );
};
export default News;
