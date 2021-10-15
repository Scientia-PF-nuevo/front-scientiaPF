import React from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'
// import {noImage} from '../../assets/noimage.jpg'


export default function CourseCard(props) {
    const {name, url, id, price, category} = props
    
    return (
      <div className="container-course">
        <div className="title-course">{name}</div>
        <div className="course-div">
          {url ? (
            <img src={`${url}`} alt="Course" className="Img"></img>
          ) : (
            {/* <img src={noImage} alt="Course" className="Img"></img> */}
          )}
        </div>
        <div className="infoRating">
          {
            <p>
              <strong>Price</strong>: ★ {`${price}`}
            </p>
          }
        </div>
        <div className="infoContGenres">
        <p>
              <strong>category</strong>: ★ {`${category}`}
        </p>
        </div>
        <div className="div-button">
          {id && (
            <Link to={`/courses/${id}`}>
              <button className="Link">Details</button>
            </Link>
          )}
        </div>
      </div>
    );
}