import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import DisplayTitle from "../../DisplayTitle/DisplayTitle";
import Comments from "./Comments";
import { useParams } from "react-router";
import { newsAPI } from "../../../api/methods";
import { useSpinner } from "../../../hooks/useSetupSpinner";
import { SweetAlert } from "../../../utils/SetupAlert";

const DetailsNews = () => {
  const [newInfo, setNewInfo] = useState({ name: "", content: "", image: "" });
  const { set, remove, state, loader } = useSpinner();
  const { id } = useParams();
  const mockCommentsData = [
    {
      name: "Hello world",
      image: "/images/author-01.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis, quam vel sodales varius, neque ante maximus libero, non porta libero nunc non est. Donec rutrum ultricies porttitor. Vivamus sed ligula imperdiet, accumsan lacus sed, lobortis lectus. Sed viverra tincidunt nulla, eu suscipit mi pulvinar sed. Quisque semper blandit massa, et blandit risus lobortis ac. Nulla pulvinar, ligula et eleifend mollis, sapien ex tristique libero, accumsan maximus erat lacus feugiat lacus. Proin maximus nunc eu ligula commodo consectetur. Ut rhoncus sollicitudin odio, et hendrerit quam euismod ut. In sed placerat lectus.",
    },
    {
      name: "Hello world",
      image: "/images/author-02.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis, quam vel sodales varius, neque ante maximus libero, non porta libero nunc non est. Donec rutrum ultricies porttitor. Vivamus sed ligula imperdiet, accumsan lacus sed, lobortis lectus. Sed viverra tincidunt nulla, eu suscipit mi pulvinar sed. Quisque semper blandit massa, et blandit risus lobortis ac. Nulla pulvinar, ligula et eleifend mollis, sapien ex tristique libero, accumsan maximus erat lacus feugiat lacus. Proin maximus nunc eu ligula commodo consectetur. Ut rhoncus sollicitudin odio, et hendrerit quam euismod ut. In sed placerat lectus.",
    },
    {
      name: "Hello world",
      image: "/images/author-03.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis, quam vel sodales varius, neque ante maximus libero, non porta libero nunc non est. Donec rutrum ultricies porttitor. Vivamus sed ligula imperdiet, accumsan lacus sed, lobortis lectus. Sed viverra tincidunt nulla, eu suscipit mi pulvinar sed. Quisque semper blandit massa, et blandit risus lobortis ac. Nulla pulvinar, ligula et eleifend mollis, sapien ex tristique libero, accumsan maximus erat lacus feugiat lacus. Proin maximus nunc eu ligula commodo consectetur. Ut rhoncus sollicitudin odio, et hendrerit quam euismod ut. In sed placerat lectus.",
    },
    {
      name: "Hello world",
      image: "/images/author-01.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis, quam vel sodales varius, neque ante maximus libero, non porta libero nunc non est. Donec rutrum ultricies porttitor. Vivamus sed ligula imperdiet, accumsan lacus sed, lobortis lectus. Sed viverra tincidunt nulla, eu suscipit mi pulvinar sed. Quisque semper blandit massa, et blandit risus lobortis ac. Nulla pulvinar, ligula et eleifend mollis, sapien ex tristique libero, accumsan maximus erat lacus feugiat lacus. Proin maximus nunc eu ligula commodo consectetur. Ut rhoncus sollicitudin odio, et hendrerit quam euismod ut. In sed placerat lectus.",
    },
    {
      name: "Hello world",
      image: "/",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis, quam vel sodales varius, neque ante maximus libero, non porta libero nunc non est. Donec rutrum ultricies porttitor. Vivamus sed ligula imperdiet, accumsan lacus sed, lobortis lectus. Sed viverra tincidunt nulla, eu suscipit mi pulvinar sed. Quisque semper blandit massa, et blandit risus lobortis ac. Nulla pulvinar, ligula et eleifend mollis, sapien ex tristique libero, accumsan maximus erat lacus feugiat lacus. Proin maximus nunc eu ligula commodo consectetur. Ut rhoncus sollicitudin odio, et hendrerit quam euismod ut. In sed placerat lectus.",
    },
    {
      name: "",
      image: "",
      text: "",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        set();
        const { data } = await newsAPI.getByID(id);
        setNewInfo(data.data);
        console.log(newInfo);
      } catch (err) {
        SweetAlert("error");
      } finally {
        remove();
      }
    };
    getData();
  }, []);

  return (
    <Container maxWidth="xl">
      {state ? (
        loader
      ) : (
        <>
          <DisplayTitle
            titleText={newInfo.name}
            backgroundImg="./images/actividades.jpg"
          />
          <Grid
            container
            direction="column"
            alignItems="center"
            component="section"
            style={{ marginTop: "5vh", marginBottom: "5vh" }}
          >
            {/* TITLE */}
            {/* DESCRIPTIVE BOX  */}
            <Box overflow="hidden" mt={3} sx={{ width: "100%", height: "50%" }}>
              <Grid container style={{ height: "100%" }} spacing={8}>
                {/* CONTENT */}
                <Grid item container xs={12} lg={7}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ color: "#555" }}
                  >
                    {newInfo.content.replace(/<[^>]*>/g, " ")}
                  </Typography>
                </Grid>
                {/* IMAGE */}
                <Grid item xs={12} lg={5} style={{ padding: "5px" }}>
                  <img
                    className="img"
                    src={newInfo.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="img"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </>
      )}
      <Comments commentsData={mockCommentsData} />
    </Container>
  );
};
export default DetailsNews;
