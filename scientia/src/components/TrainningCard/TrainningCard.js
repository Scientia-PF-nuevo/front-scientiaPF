import React from 'react'
import { Link } from 'react-router-dom'
import './TrainningCard.css'
import {connect} from 'react-redux'
import {addDetails} from '../../actions/actions'
import TextRating from '../CourseCard/Qualify'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LinearWithValueLabel from '../Progress/Progress'
import RadioGroupRating from '../RatingUser/RatingUser'

function TrainningCard(props) {
    const {
      name,
      url,
      id,
      price,
      categories,
      description,
      addCart,
      score,
      date,
      cart,
      addDetails
    } = props;




    // const validarCart = (id) => {
    //   const alreadyAdded = cart.some(courseID => courseID.id === id);
    //    if(alreadyAdded) {
    //        return;
    //   } else {
    //     addCart({ name: name, id: id, price: price })
    //   }
    // }
    
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
          {/* {id && (
            <Link to="/details">
              <HelpOutlineOutlinedIcon onClick={()=> addDetails(id)}/>
            </Link>
          )} */}
          {/* {id && (
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon
                onClick={() => validarCart(id)}
              />
            </IconButton>
          )} */}
          <button>PLAY COURSE</button>
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