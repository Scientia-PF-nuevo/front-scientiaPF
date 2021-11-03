import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import TextRating from "../components/CourseCard/Qualify";
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
      {courses && courses.map((course) => (
        <div className="carousel-item-container">
          <Link to={`/details/${course.id}`}>
            <img
              src={course.url}
              alt={course.url}
              className="carousel-item-image"
            />
          </Link>
          <div className="carousel-item-info">
            <br></br>
            <h3 className="carousel-item-title">{course.name.toUpperCase()}</h3>
            <p className="carousel-item-description"><strong>DESCRIPTION :</strong> {course.description}</p>
            <div className="carousel-item-features">
              {/* <span className="carousel-item-lenguaje-text">
                Lenguage: {course.language}
              </span> */}
              {/* <span className="carousel-item-level-text">
                Nivel: {course.level}
              </span> */}
            </div>
            <div className="carousel-item-price">
              {/* <span className="carousel-item-price-text">
                Precio: {course.price}
              </span> */}
              <span className="carousel-item-solds">
                <strong>CATEGORY:</strong>{course.categories?.toUpperCase()}
              </span>
            </div>
            <br></br>
            <div className="carousel-item-rating">
              <TextRating score={course.score} />
            </div>
            <br></br>
            <br></br>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
