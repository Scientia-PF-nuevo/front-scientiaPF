import React from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'
import {connect} from 'react-redux'
import {addCart} from '../../actions/actions'
import TextRating from './Qualify'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Alert } from 'react-alert'


function CourseCard(props) {
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
    } = props;


    const validarCart = (id) => {
      const alreadyAdded = cart.some(courseID => courseID.id === id);
       if(alreadyAdded) {
           return;
      } else {
        addCart({ name: name, id: id, price: price })
      }
    }
    
    return (
      <div className="container-course">
        <div className="title-course">{name && name.toUpperCase()}</div>
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
              <strong>Price</strong>: $ {`${price}`}
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
            <strong>Category</strong>:{" "}
            {`${categories && categories.toUpperCase()}`}
          </p>
        </div>
        <TextRating score={score} />
        <div className="button-container">
          {id && (
            <Link to={`/courses/${id}`}>
              <HelpOutlineOutlinedIcon className="button-detail"/>
            </Link>
          )}
          {id && (
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon
                onClick={() => validarCart(id)}
              />
            </IconButton>
          )}
        </div>
      </div>
    );
}

function mapStateToProps(state) {
  return {
    cart : state.rootReducer.cart
  }
}

export default connect(mapStateToProps, {addCart})(CourseCard);