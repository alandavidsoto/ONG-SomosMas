import CarouselSlide from "./CarouselSlide";
import schoolSlide1 from "./schoolSlide1.jpg";
import schoolSlide2 from "./schoolSlide2.jpg";
import schoolSlide3 from "./schoolSlide3.jpg";
import toysSlide1 from "./toysSlide1.jpg";
import toysSlide2 from "./toysSlide2.jpg";
import toysSlide3 from "./toysSlide3.jpg";

export const SchoolCarousel = () => {
  return (
    <CarouselSlide
      items={[
        {
          title: "School Slide1",
          image: schoolSlide1,
        },
        {
          title: "School Slide2",
          image: schoolSlide2,
        },
        {
          title: "School Slide3",
          image: schoolSlide3,
        },
      ]}
    />
  );
};
export const ToysCarousel = () => {
  return (
    <CarouselSlide
      items={[
        {
          title: "Toys Slide1",
          image: toysSlide1,
        },
        {
          title: "Toys Slide2",
          image: toysSlide2,
        },
        {
          title: "Toys Slide3",
          image: toysSlide3,
        },
      ]}
    />
  );
};
