import React from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'
import { connect } from 'react-redux'
import { addCart, addDetails } from '../../actions/actions'
import TextRating from './Qualify'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';


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
    level,
    language,
    date,
    cart,
    addDetails
  } = props;


  const validarCart = (id) => {
    const alreadyAdded = cart.some(courseID => courseID.id === id);
    if (alreadyAdded) {
      return;
    } else {
      addCart({ name: name, id: id, price: price, url: url })
    }
  }

  return (
    <div className="container-course">
      <div className="left-container">
          <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon
                onClick={() => validarCart(id)}
              />
            </IconButton>
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
      </div>
        <div className="detaiils-card-container">
        <div className="info-price-div2">
          {
            <p>
              <strong>Level</strong>: {level ? level.toUpperCase() : "No level Defined"}
            </p>
          }
        </div>
        <div className="info-price-div2">
          {
            <p>
              <strong>Language</strong>: {language ? language.toUpperCase() : "No Language Defined"}
            </p>
          }
        </div>

        <div className="info-cat-div">
          <p>
            <strong>Category</strong>:{" "}
            {`${categories && categories?.toUpperCase() || ""}`}
          </p>
        </div>
        <div className="info-price-div2">
          {
            <p>
              <strong>Date</strong>: {`${date}`}
            </p>
          }
        </div>
        <div className="info-price-div2">
          {
            <p>
              <strong>Price</strong>: $ {`${price}`}
            </p>
          }
        </div>
        <TextRating score={score} />
        <div className="button-container">
          {id && (
            <Link to="/details">
              <button className="confirm-button2" onClick={() => addDetails(id)} >DETAILS</button>
            </Link>
          )}
          { (
          <>
            <button className="cart-button2"  onClick={() => validarCart(id)} >ADD CART</button>
            </>
          )}
        </div>
      </div>
      <div className="description-container">
        <p>{description}</p>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.rootReducer.cart,
    login: state.rootReducer.login,
  }
}

export default connect(mapStateToProps, { addCart, addDetails })(CourseCard);