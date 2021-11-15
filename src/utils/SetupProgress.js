import React from "react";
import PropTypes from "prop-types";
import { LinearProgress } from "@material-ui/core";
import "./setupProgress.scss";

const SetupProgress = (props) => {
  const { progressStatus } = props;
  return (
    <>
      <LinearProgress className={progressStatus ? "" : "hide"} />
    </>
  );
};
export default SetupProgress;

SetupProgress.propTypes = {
  progressStatus: PropTypes.bool,
};
SetupProgress.defaultProps = {
  progressStatus: true,
};
