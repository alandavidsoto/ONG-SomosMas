/** @jsx jsx */
import React from "react";
import { css, jsx, keyframes } from "@emotion/react";

/* 
Props:
  variant: "rectangle" | "circle" | "text"
  width: number
  height: number
  animation?: "none"
  className: string
  style: style
*/

const lightColor = "#ececec";
const darkColor = "#dadada";

const index = ({ variant, width, height, animation, className, style }) => {
  const pulse = keyframes`
    0% {background: ${lightColor}}
    100% {background: ${darkColor}}
  `;

  const rectangle = css`
    width: ${width ? `${width}px` : "100%"};
    height: ${height ? `${height}px` : "100%"};
    border-radius: 5px;
    background: ${lightColor};
    animation: ${!animation ? pulse : "none"} 1.5s alternate-reverse infinite
      ease-in-out;
  `;

  const circle = css`
    width: ${width ? `${width}px` : "100%"};
    height: ${height ? `${height}px` : "100%"};
    border-radius: 50%;
    background: ${lightColor};
    animation: ${!animation ? pulse : "none"} 1.5s alternate-reverse infinite
      ease-in-out;
  `;

  const text = css`
    width: ${width ? `${width}%` : "100%"};
    height: 1.2rem;
    border-radius: 5px;
    background: ${lightColor};
    animation: ${!animation ? pulse : "none"} 1.5s alternate-reverse infinite
      ease-in-out;
  `;

  const getStyles = () => {
    switch (variant) {
      case "rectangle":
        return rectangle;
      case "circle":
        return circle;
      case "text":
        return text;
      default:
        return rectangle;
    }
  };

  return <div css={getStyles} style={style} className={className}></div>;
};

export default index;
