import React from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'
import {connect} from 'react-redux'
import {addCart} from '../../actions/actions'
import { Card, Button } from 'react-bootstrap'
// import {noImage} from '../../assets/noimage.jpg'


function CourseCard(props) {
    const {name, url, id, price, categories, description, addCart, score, date} = props
    
    return (
      <div className="container-course">
        <div className="title-course">{name && name.toUpperCase()}</div>
        <div className="course-div-card">
          {url ? (
            <img src={`${url}`} alt="Course" className="Img"></img>
          ) : (
            {/* <img src={noImage} alt="Course" className="Img"></img> */}
          )}
        </div>
        <div className="info-price-div">
          {
            <p>
              <strong>Price</strong>: $ {`${price}`}
            </p>
          }
        </div>
        <div className="info-price-div">
          {
            <p>
              <strong>Score</strong>: ★ {`${score && Math.ceil(score)}`}
            </p>
          }
        </div>
        <div className="info-price-div">
          {
            <p>
              <strong>Date</strong>: {`${date}`}
            </p>
          }
        </div>
        <div className="info-cat-div">
        <p>
              <strong>Category</strong>: ★ {`${categories && categories.toUpperCase()}`}
        </p>
        </div>
        <div className='button-container'>
          {id && (
            <Link to={`/courses/${id}`}>
              <button className="link">DETAILS</button>
            </Link>
          )}
          {id && <button className="add" onClick={() => addCart({name: name, id: id, price: price})}>ADD</button>}
        </div>
      </div>
    );
}

export default connect(null, {addCart})(CourseCard);