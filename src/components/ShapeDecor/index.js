import { Box } from "@material-ui/core";
import React from "react";

const index = ({
  rotation,
  variant,
  width,
  color,
  top,
  left,
  bottom,
  right,
}) => {
  const getColor = () => {
    switch (color) {
      case "primary":
        return "#C8E3FF";
      case "secondary":
        return "#FD938F";
      case "third":
        return "#FAFA88";
    }
  };
  if (variant === "rectangle") {
    return (
      <Box
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center",
        }}
        zIndex={-1}
        top={top}
        left={left}
        bottom={bottom}
        right={right}
        position="absolute"
        width={width}
        height={width}
        bgcolor={getColor()}
      ></Box>
    );
  } else if (variant === "triangle") {
    return (
      <Box
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center",
        }}
        zIndex={-1}
        top={top}
        left={left}
        bottom={bottom}
        right={right}
        position="absolute"
        width={width}
        height={width}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 445.17 416.06">
          <g data-name="Capa 2">
            <path
              fill={getColor()}
              strokeMiterlimit={10}
              d="M.83 415.56h443.5L222.59 1.06.83 415.56z"
              data-name="Capa 1"
            />
          </g>
        </svg>
      </Box>
    );
  } else {
    return (
      <Box
        zIndex={-1}
        top={top}
        left={left}
        bottom={bottom}
        right={right}
        borderRadius="50%"
        position="absolute"
        width={width}
        height={width}
        bgcolor={getColor()}
      ></Box>
    );
  }
};

export default index;
