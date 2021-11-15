import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./ItemCarousel";

const CarouselSlide = ({ items }) => {
  return (
    <Carousel
      animation="slide"
      navButtonsAlwaysVisible={true}
      indicators={true}
      autoPlay={false}
      interval="5000"
      className="container-carousel"
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};
export default CarouselSlide;
