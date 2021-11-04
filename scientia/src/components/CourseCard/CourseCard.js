import React from 'react'
import { Link , useHistory } from 'react-router-dom'
import './CourseCard.css'
import { connect } from 'react-redux'
import { addCart, addCartLogged, addDetails, addFreeCourse} from '../../actions/actions'
import TextRating from './Qualify'
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import dicount from '../../assets/discount.png'
import bestSeller from '../../assets/bestSeller.jpg'
import topSeller from '../../assets/topSeller.jpg'
import goodSeller from '../../assets/goodSeller.jpg'

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
    login,
    cart,
    addDetails,
    addCartLogged,
    addFreeCourse,
    solds,
    userInfo,
    numbersOfDiscounts,
    percentageDiscount,
    // coursesTopSeller,
    // coursesBestSeller,
    // coursesGoodSeller
  } = props;

  const { enqueueSnackbar } = useSnackbar();

const handleClickVariantOk = () => {
        enqueueSnackbar('COURSE ADDED CORRECTLY', {
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'left',              
          },
          TransitionComponent: Slide,
          variant: 'success',
      })
}

const handleClickVariantWrong = () => {
  enqueueSnackbar('PLEASE LOGIN FIRST', {
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',              
    },
    TransitionComponent: Slide,
    variant: 'error',
})
}


  const validarCart = (id) => {
    const alreadyAdded = cart.some(courseID => courseID.coursesId === id);
    if (alreadyAdded) {
      return;
    } else {
      if (!login){
        addCart({
          email: userInfo.email,
          name: name,
          coursesId: id,
          price: price,
          url: url,
          percentageDiscount: percentageDiscount,
          state: "carrito",
          offerPrice: offer === 0 ? price : offer,
        });
      } else {
        addCartLogged({
          email: userInfo.email,
          name: name,
          id: id,
          price: price,
          url: url,
          state: "carrito",
          percentageDiscount: percentageDiscount,
          offerPrice: offer === 0 ? price : offer,
        });
      }
    }
  }

  var offer = 0;
  if (percentageDiscount > 0) {

    offer = price - ((percentageDiscount / 100) * price)
  }


   
    var alreadyBothCoursesId = []
    var bothIds = []
    if(login && userInfo.coursesAndData){
    alreadyBothCoursesId = userInfo.coursesAndData.filter((c) => c.course.courseId)
    bothIds = alreadyBothCoursesId.map((c) => c.course.courseId )
    }

    let history = useHistory();

    const handdleAddFreeCourse = (email, id) => {
      addFreeCourse(email, id)
      handleClickVariantOk()
      history.push('/mylearning')
    }
    const handdlePlay = () => {
      history.push(`/mylearning`)
    }

    // console.log(coursesTopSeller)
    // console.log(coursesBestSeller)
    // console.log(coursesGoodSeller)

    // var top = false
    // for(let i=0; i <coursesTopSeller.length; i++) {
    //   if(coursesTopSeller[i] === solds) {
    //     top = true;
    //   }
    // }

    // var best = false
    // for(let i=0; i <coursesBestSeller.length; i++) {
    //   if(coursesBestSeller[i] === solds) {
    //     best = true;
    //   }
    // }

    // var good = false
    // for(let i=0; i <coursesGoodSeller.length; i++) {
    //   if(coursesGoodSeller[i] === solds) {
    //     good = true;
    //   }
    // }
    
  return (
    <div className="container-course">
      <div className="left-container">
        {/* <IconButton color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon onClick={() => validarCart(id)} />
        </IconButton> */}
        <div className="title-course">
          <h5>COURSE OF {name && name.toUpperCase()}</h5>
        </div>

        <div className="course-div-card">
          {url ? (
            <>
              <img src={`${url}`} alt="Course" className="Img"></img>
            </>
          ) : (
            {
              /* <img src={noImage} alt="Course" className="Img"></img> */
            }
          )}
        </div>
      </div>
      <div className="detaiils-card-container">
        <div className="info-cat-div">
          <p>
            <strong>Category</strong>:{" "}
            {`${(categories && categories?.toUpperCase()) || ""}`}
          </p>
        </div>
        <div className="info-price-div2">
          <p>
            <strong>Level</strong>:{" "}
            {level ? level.toUpperCase() : "No level Defined"}
          </p>
        </div>
        <div className="info-price-div2">
          <p>
            <strong>Language</strong>:{" "}
            {language ? language.toUpperCase() : "No Language Defined"}
          </p>
        </div>

        <div className="info-price-div2">
          <p>
            <strong>Date</strong>: {`${date.slice(0,10)}`}
          </p>
        </div>
        <div className="info-price-div2">
          <p>
            {price === 0 ? (
              <strong>Price : FREE </strong>
            ) : percentageDiscount > 0 ? (
              <>
                <strong style={{ textDecoration: "line-through" }}>
                  Price : ${price}
                </strong>{" "}
                <strong>
                  ({percentageDiscount}% OFF) : ${offer.toFixed(2)}
                </strong>
              </>
            ) : (
              <strong>Price : ${price}</strong>
            )}
            {/* {percentageDiscount > 0 ? (
              <>
                <strong style={{ textDecoration: "line-through" }}>
                  Price : ${price}
                </strong>{" "}
                <strong>({percentageDiscount}% OFF) : ${offer.toFixed(2)}</strong>
              </>
            ) : (
              <strong>Price : ${price}</strong>
            )} */}
          </p>
        </div>
        <div className="info-price-div2">
          <p>solds:({solds})</p>
        </div>
        <TextRating score={score} />
        <div className="button-container">
          {id && (
            <Link to="/details">
              <button
                className="confirm-button2"
                onClick={() => addDetails(id)}
              >
                DETAILS
              </button>
            </Link>
          )}
          {price == 0 ? (
            bothIds.filter((bId) => bId === id)[0] === id ? (
              <button onClick={handdlePlay} className="cart-button-play">
                PLAY
              </button>
            ) : (
              <button
                className="cart-button-add"
                onClick={
                  login
                    ? () => handdleAddFreeCourse(userInfo.email, id)
                    : () => handleClickVariantWrong()
                }
              >
                ADD COURSE
              </button>
            )
          ) : bothIds.filter((bId) => bId === id)[0] === id ? (
            <button onClick={handdlePlay} className="cart-button-play">
              PLAY
            </button>
          ) : (
            <button className="cart-button2" onClick={() => validarCart(id)}>
              ADD CART
            </button>
          )}
        </div>
      </div>
      <div className="description-container">
        <p>{description}</p>
        {numbersOfDiscounts > 0 ? (
          <img src={dicount} alt="disc" className="discount"></img>
        ) : null}
        {(solds > 170 && price !== 0) ? (
          <img src={topSeller} alt="disc" className="discount"></img>
        ) : null}
        {(solds > 120 && solds < 170 && price !== 0)? (
          <img src={bestSeller} alt="disc" className="discount"></img>
        ) : null}
        {(solds > 100 && solds < 120 && price !== 0)? (
          <img src={goodSeller} alt="disc" className="discount"></img>
        ) : null}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.rootReducer.cart,
    login: state.rootReducer.login,
    userInfo: state.rootReducer.userInfo,
    courses: state.rootReducer.allCourses
  }
}

export default connect(mapStateToProps, {
  addCart,
  addDetails,
  addCartLogged,
  addFreeCourse,
})(CourseCard);