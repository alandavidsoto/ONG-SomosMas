import React, { useEffect, useState } from "react";
import { activitiesAPI } from "../../api/methods";
import DisplayTitle from "../../components/DisplayTitle/DisplayTitle";
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
import { SweetAlert } from "../../utils/SetupAlert";
import { useSpinner } from "../../hooks/useSetupSpinner";
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

const Activities = () => {
  const classes = useStyles();
  const [formInput, setFormInput] = useState("");
  const [toggleActivitiesAll, setToggleActivitiesAll] = useState(false);
  const [activities, setActivities] = useState([]);
  const { state, set, remove, loader } = useSpinner();

  useEffect(() => {
    const getData = async () => {
      try {
        set();
        const { data } = await activitiesAPI.getAll();
        setActivities(data.data);
        setToggleActivitiesAll(true);
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
      activitiesAPI.Get(`activities?search=${formInput}`).then((res) => {
        setActivities(res.data.data);
        setToggleActivitiesAll(false);
        remove();
      });
    } else {
      if (!toggleActivitiesAll) {
        set();
        activitiesAPI.Get("activities").then((res) => {
          setActivities(res.data.data);
          setToggleActivitiesAll(true);
          remove();
        });
      }
    }
  }, [formInput]);

  return (
    <Container>
      <DisplayTitle
        titleText="Actividades"
        backgroundImg="./images/actividades.jpg"
        fontColor="white"
      />
      <div className={classes.wrapper}>
        <InputBase
          placeholder="Buscar Actividad..."
          onChange={(e) => setFormInput(e.target.value)}
          inputProps={{ "aria-label": "search" }}
          className={classes.input}
        />
        <div className={classes.SearchIcon}>
          <SearchIcon />
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          {activities.map((item) => (
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
export default Activities;
