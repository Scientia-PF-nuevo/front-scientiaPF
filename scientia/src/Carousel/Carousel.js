import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.css";
export default function CarouselCourses(props) {
  const { courses = [] } = props;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
    >
      {courses.map((course, index) => (
        <div className="carousel-item-container">
          <img
            src={course.image}
            alt={course.image}
            className="carousel-item-image"
          />
          <div className="carousel-item-info">
            <h3 className="carousel-item-title">{course.name}</h3>
            <p className="carousel-item-description">{course.description}</p>
            <div className="carousel-item-features">
              <span className="carousel-item-lenguaje-text">
                Lenguaje: {course.lenguaje}
              </span>
              <span className="carousel-item-level-text">
                Nivel: {course.level}
              </span>
            </div>
            <div className="carousel-item-price">
              <span className="carousel-item-price-text">
                Precio: {course.price}
              </span>
              <span className="carousel-item-solds">
                Total vendidos: {course.solds}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
