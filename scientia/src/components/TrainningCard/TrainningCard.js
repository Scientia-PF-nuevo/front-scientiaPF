import React from 'react'
import { Link } from 'react-router-dom'
import './TrainningCard.css'
import {connect} from 'react-redux'
import {addDetails} from '../../actions/actions'
import LinearWithValueLabel from '../Progress/Progress'
import RadioGroupRating from '../RatingUser/RatingUser'

function TrainningCard(props) {
    const {
      name,
      url,
      categories,
    } = props;
    
    return (
      <div className="container-course">
        <div className="title-course"><h5>{name && name.toUpperCase()}</h5></div>
        <div className="course-div-card">
          {url ? (
            <img src={`${url}`} alt="Course" className="Img"></img>
          ) : (
            {
              /* <img src={noImage} alt="Course" className="Img"></img> */
            }
          )}
        </div>
        <div className="info-price-div">
          {
            <p>
              <strong>STATE</strong>: {/*{`${price}`}*/} STARTED
            </p>
          }
        </div>
        {/* <div className="info-price-div">
          {
            <p>
              <strong>Date</strong>: {`${date}`}
            </p>
          }
        </div> */}
        <div className="info-cat-div">
          <p>
            <strong>Category</strong>:{" "}
            {`${categories && categories.toUpperCase()}`}
          </p>
        </div>
        {/* <TextRating score={score} /> */}
          <LinearWithValueLabel/>
        <div className="button-container">

          <Link to='/player'>
          <button>PLAY COURSE</button>
          </Link>
        </div>
        <div className="rating-div">
            <RadioGroupRating/>
        </div>
      </div>
    );
}

function mapStateToProps(state) {
  return {
    cart : state.rootReducer.cart
  }
}

export default connect(mapStateToProps, {addDetails})(TrainningCard);