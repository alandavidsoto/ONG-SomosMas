import React, { useEffect, useState } from "react";
import { Typography, Box, Divider } from "@material-ui/core";
import { activitiesAPI } from "../../../api/methods";
import { useSpinner } from "../../../hooks/useSetupSpinner";
import { SweetAlert } from "../../../utils/SetupAlert";
import ReactHtmlParser from "react-html-parser";

const ActivityDetail = ({ title, content, match }) => {
  const spinner = useSpinner();
  const [activity, setActivity] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    spinner.set();
    if (match.params.id) {
      activitiesAPI
        .getByID(match.params.id)
        .then((res) => {
          const { data } = res.data;
          setActivity(data);
          spinner.remove();
        })
        .catch((err) => {
          spinner.remove();
          SweetAlert("error");
          setError(true);
        });
    }
  }, []);

  if (match.params.id && !activity) {
    return (
      <Box>
        <Box mt={2}>
          {!error && spinner.loader}
          <Typography variant="body1">
            {!error
              ? "Aguarde mientras buscamos la actividad"
              : "No pudimos encontrar la actividad, por favor intente nuevamente."}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h2">{title || activity.name}</Typography>
      <Divider style={{ marginTop: ".5rem" }} />
      <Box mt={2}>
        <Typography variant="body1">
          {content || ReactHtmlParser(activity.description)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ActivityDetail;
