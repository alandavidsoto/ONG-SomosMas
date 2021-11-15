import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, Avatar, Grid, Paper, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const Comments = ({ commentsData }) => {
  return (
    <div>
      <Typography align="left" variant="h3">
        Comentarios
      </Typography>
      {commentsData.map((comment, index) => {
        return (
          <Box
            key={index}
            borderRadius={"20px"}
            marginBottom={"15px"}
            marginTop={"15px"}
          >
            <Paper style={{ padding: "40px 20px", borderRadius: "20px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  {comment.image ? (
                    <Avatar src={comment.image} />
                  ) : (
                    <Skeleton variant="circle" width={40} height={40} />
                  )}
                </Grid>
                <Grid item xs zeroMinWidth>
                  {comment.name ? (
                    <h4 style={{ margin: 0, textAlign: "left" }}>
                      {comment.name}
                    </h4>
                  ) : (
                    <Skeleton variant="text" />
                  )}
                  {comment.text ? (
                    <p style={{ textAlign: "left" }}>{comment.text}</p>
                  ) : (
                    <Skeleton
                      variant="rect"
                      height={20}
                      style={{ marginTop: "7px" }}
                    />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      })}
    </div>
  );
};
export default Comments;
