import React, { useRef, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import ReactPlayer from "react-player/youtube";
import Controls from "./Controls";

const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "50%",
    height: "360px",
  },
  fullScreen: {
    position: "fixed",
    top: "0px",
    left: "0px",
    bottom: "0px",
    right: "0px",
    width: "100%",
    height: "100%",
    border: "none",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    zIndex: "999999",
    background: "#000",
    transition: "all 300ms",
  },
});

const Player = () => {
  const classes = useStyles();
  const playerRef = useRef();
  const controlRef = useRef();
  const [times, setTimes] = useState({
    totalSeconds: 0,
    currentSeconds: null,
  });
  const [state, setState] = useState({
    playing: false,
    fullScreen: false,
    volume: 0.5,
  });

  const { playing, volume, fullScreen } = state;

  const handlerPlaychange = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleChangeVolume = (e, value) => {
    setState({ ...state, volume: value / 100 });
  };

  const handlerProgressBar = (e, value) => {
    setTimes({ ...times, currentSeconds: value });
    playerRef.current.seekTo(value, "seconds");
  };

  const handlerChangeScreen = () => {
    setState({ ...state, fullScreen: !state.fullScreen });
  };

  const handlerCurrentTime = (time) => {
    setTimes({
      ...times,
      currentSeconds: Math.floor(time.playedSeconds),
    });
  };

  const handlerMouseOver = () => {
    controlRef.current.style.visibility = "visible";
  };
  const handlerMouseDown = () => {
    controlRef.current.style.visibility = "hidden";
  };
  return (
    <Box justifyContent="center" display="flex" margin="30px 0px">
      <div
        onMouseOver={handlerMouseOver}
        onMouseLeave={handlerMouseDown}
        className={fullScreen ? classes.fullScreen : classes.container}
      >
        <ReactPlayer
          ref={playerRef}
          onPlay={() => {
            setState({ ...state, playing: true });
          }}
          onPause={() => {
            setState({ ...state, playing: false });
          }}
          onDuration={(number) => {
            setTimes({ ...times, totalSeconds: number });
          }}
          onProgress={handlerCurrentTime}
          playing={playing}
          volume={volume}
          width="100%"
          height="100%"
          url="https://www.youtube.com/watch?v=4YnSk1gI_Oo"
        ></ReactPlayer>
        <div ref={controlRef} style={{ visibility: "hidden" }}>
          <Controls
            handlerPlaychange={handlerPlaychange}
            handleChangeVolume={handleChangeVolume}
            handlerProgressBar={handlerProgressBar}
            handlerChangeScreen={handlerChangeScreen}
            state={state}
            times={times}
          />
        </div>
      </div>
    </Box>
  );
};
export default Player;
