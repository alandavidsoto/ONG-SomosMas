import { Box } from "@material-ui/core";
import React, { useState } from "react";
import Loader from "react-loader-spinner";

export const useSpinner = () => {
  const [state, setState] = useState(false);
  const set = () => setState(true);
  const remove = () => setState(false);

  const loader = (
    <Box
      sx={{
        width: "100%",
        margin: "10% 0%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Loader type="Grid" color="#9AC9FB" height={100} width={100} />
    </Box>
  );
  return {
    state,
    set,
    remove,
    loader,
  };
};
