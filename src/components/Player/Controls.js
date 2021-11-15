import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseArrowIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import { IconButton } from "@material-ui/core";
import React from "react";
import { Grid, makeStyles, Slider } from "@material-ui/core";

const useStyles = makeStyles({
  color: {
    color: "#8DCAFF",
  },
  controlPlayer: {
    position: "absolute",
    bottom: "0",
    right: "0",
    left: "0",
    height: "50px",
    background: "#0009",
    width: "100%",
  },
  controlProgress: {
    position: "absolute",
    bottom: "0",
    right: "0",
    left: "0",
    height: "45px",
    width: "98%",
    margin: "0px auto",
    color: "rgb(253, 75, 68)",
  },
});
const Controls = ({
  handlerPlaychange,
  handleChangeVolume,
  handlerProgressBar,
  handlerChangeScreen,
  state,
  times,
}) => {
  const classes = useStyles();
  const { playing, volume, fullScreen } = state;

  return (
    <div>
      {/* CONTROLS */}
      <Grid container className={classes.controlPlayer}>
        {/* CONTROLPROGRESS */}
        <Grid item>
          <Slider
            className={classes.controlProgress}
            onChange={handlerProgressBar}
            value={times.currentSeconds}
            max={times.totalSeconds}
          ></Slider>
        </Grid>
        {/* CONTROLPLAY */}
        <Grid item xs={1}>
          <IconButton onClick={() => handlerPlaychange()}>
            {playing ? (
              <PauseArrowIcon className={classes.color} />
            ) : (
              <PlayArrowIcon className={classes.color} />
            )}
          </IconButton>
        </Grid>
        {/* VOLUME */}
        <Grid container alignItems="center" xs={6}>
          <IconButton>
            {volume >= 0.6 && <VolumeUpIcon className={classes.color} />}
            {volume < 0.6 && volume > 0.0 && (
              <VolumeDownIcon className={classes.color} />
            )}
            {volume == 0.0 && <VolumeMuteIcon className={classes.color} />}
          </IconButton>
          <Slider
            className={classes.color}
            style={{ width: "50px" }}
            value={volume * 100}
            onChange={handleChangeVolume}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        {/* FULLSCREEN */}
        <Grid container justifyContent="flex-end" xs={5}>
          <IconButton onClick={handlerChangeScreen}>
            {fullScreen ? (
              <FullscreenExit className={classes.color} />
            ) : (
              <FullscreenIcon className={classes.color} />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
export default Controls;
