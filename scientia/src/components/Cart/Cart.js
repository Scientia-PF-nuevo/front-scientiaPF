import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory, Link } from "react-router-dom";
import {
  removeCart,
  addDetails,
  confirmOrder,
  clearCart,
  getUserInfo,
  deleteCartLogged,
  addGift,
  removeGift,
  removeAllGift
} from "../../actions/actions";
import { Redirect } from 'react-router'
import { Modal, Button, Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Checkbox from '@mui/material/Checkbox';
import styles from './modal.css.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Cart.css'
import axios from "axios"

export function Cart(props) {
  useEffect(() => {
    window.addEventListener('mousemove', () => { });
    props.removeAllGift()
    return () => {
      window.removeEventListener('mousemove', () => { })
    }
  }, [])

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariantOk = () => {
    enqueueSnackbar('YOUR GIFT ADDED CORRECTLY', {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      TransitionComponent: Slide,
      variant: 'success',
    })
  }

  const handleClickVariantWrongEmail = () => {
    enqueueSnackbar('INCORRECT EMAIL OR MISSED', {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      TransitionComponent: Slide,
      variant: 'error',
    })
  }

  const handleClickVariantWrongRemovedGift = () => {
    enqueueSnackbar('ITEM REMOVED', {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      TransitionComponent: Slide,
      variant: 'warning',
    })
  }

  const {
    cart,
    user,
    login,
    removeCart,
    addDetails,
    deleteCartLogged,
    clearCart,
    addGift,
    removeGift,
    gift
  } = props;

  const [redirect, setRedirect] = useState(false)

  const [checked, setChecked] = React.useState({

    gift: false,
    courseId: 0,
    price: 0,
    orderId: 0,
    emailGift: ""
  });

  const [show2, setShow2] = useState(false);

  const handleClose3 = () => {
    setShow2(false)
  };

  const handleChange = (event) => {

    if (login) {

      if (cart.length > 0) {
        var [selectedCourse] = cart.filter((course) => course.coursesId === parseInt(event.target.name))
      }

      setChecked({
        ...checked,
        gift: event.target.checked,
        courseId: parseInt(event.target.name),
        price: selectedCourse.price || 0,
        orderId: selectedCourse.id || 0,
        emailGift: "",
        [event.target.name]: event.target.checked
      });

      if (checked[event.target.name]) {
        handleClickVariantWrongRemovedGift()
      }

      if (!checked[event.target.name])
        setShow2(true)
      removeGift(parseInt(event.target.name))
    } else {
      history.push("/login")
    }


  };

  const [state, setState] = React.useState({ emailGift: "" })



  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleClose2 = (email) => {
    if (validateEmail(email)) {
      addGift(checked)
      handleClickVariantOk('success')
      setShow2(false)
    } else {
      handleClickVariantWrongEmail('error')
    }

  };
  const handleChangeGift = (e) => setChecked({ ...checked, [e.target.name]: e.target.value })

  let history = useHistory();

  const usuario = useSelector(state => state.rootReducer.userInfo.coursesAndData)


  useEffect(() => {
    user.email && getUserInfo(user.email)
  }, [])

  var result = 0;
  var taxs = 0;
  var total = 0;
  function Total() {
    result = cart.reduce((a, b) => ({ offerPrice: a.offerPrice + b.offerPrice })).offerPrice
    taxs = parseFloat((result * 0.21).toFixed(2));
    total = parseFloat(result + taxs).toFixed(2);
    return `$ ${parseFloat(result.toFixed(2))}`;
  }

  if (cart.length >= 1) {
    Total()
  }

  const handledSubmitOrder = () => {

    if (usuario && usuario.length >= 1) {
      var arrIDCourses = usuario.map((course) => course.course.courseId)
    }

    const userCart = {
      email: "",
      courseId: []
    }
   const Giftorders = {Giftorders : gift};

    if (cart.length >= 1 && login) {

      userCart.courseId = cart.map((course) => course.id)
      userCart.email = user.email

      const res = axios.post(`/purchase/orders_destroy/${user.email}`, Giftorders);
      
      clearCart()
      setRedirect(true)

    }

    else if (!login) {
      history.push("/login")
    }
  }


  const haddleRemoveItem = (id) => {
    if (login) {
      const data = { id: id, email: user.email }
      removeGift(id)
      deleteCartLogged(data)
      handleClickVariantWrongRemovedGift('removed')
    } else {
      removeCart(id)
      handleClickVariantWrongRemovedGift()
    }
  }


  return (
    <div >
      <div className="title-cart-div">
        <h1>Shopping Cart</h1>
      </div>
      <div className="wrapper-cart">
        <div className="cart-div">
          <div className="shopping-cart-div">
          </div>
          <h3>{cart && cart.length > 0 ? cart.length : 0} Courses in Cart</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Course</th>
                <th style={{ textAlign: "center" }}>Course Name</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>Gift a Course</th>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Remove</th>
              </tr>
            </thead>
            {cart.length >= 1 ? (
              cart.map((course) => (
                <tbody className="tbody-div">
                  <tr>
                    <td className="photo-div">
                      <img className="cart-img" src={course.url} />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div className="div-center2">
                        <Link
                          to="/details"
                          onClick={() => addDetails(course.coursesId)}
                          className="link-div-cart"
                        >
                          {course.name && course.name.toUpperCase()}
                        </Link>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {course.percentageDiscount > 0 ? (
                        <div>
                          <h3
                            style={{
                              color: "red",
                              textDecoration: "line-through",
                            }}
                          >
                            ${course.price !== null && parseFloat(course.price.toFixed(2))}
                          </h3>
                          <p>{course.percentageDiscount}% OFF</p>
                          <h3 style={{ color: "green" }}>
                            $
                            {course.price !== null &&
                              parseFloat((course.price -((course.percentageDiscount / 100) * course.price)).toFixed(2))}
                          </h3>
                        </div>
                      ) : (
                        <div className="div-center">
                          <h3 style={{ color: "green" }}> ${course.price !== null && parseFloat(course.price.toFixed(2))}</h3>
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div className="div-center3">
                        <Checkbox
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                          name={course.coursesId}
                          checked={
                            checked.hasOwnProperty(course.coursesId)
                              ? checked[course.coursesId]
                              : false
                          }
                          onChange={handleChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        <p>GIFT</p>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div className="div-center">
                        <p>#{course.coursesId}</p>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {
                        <div className="div-center">
                          <DeleteRoundedIcon
                            onClick={() => haddleRemoveItem(course.coursesId)}
                            style={{ cursor: "pointer", fontSize: 40 }}
                          />
                        </div>
                      }
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <div></div>
            )}
          </Table>
          <div>
            {gift && gift.length >= 1 ? (
              gift.map((g) => (
                <div>
                  <p><strong>COURSE ID :</strong> (#{g.courseId}) - <strong> GIFT TO EMAIL : </strong>{g.emailGift}</p>
                </div>
              ))
            ) : (
              <p>ANY COURSE HAS BEEN SELECTED FOR GIFT</p>
            )}
          </div>
          <p>
            <strong>SUB - TOTAL:</strong> $ {parseFloat(result.toFixed(2))}
          </p>
          <p>
            <strong>TAXs (21%):</strong> $ {taxs}
          </p>
          <p>
            <strong>TOTAL:</strong> $ {total}
          </p>
          <div className="confirm-order-div">
            <button className="confirm-button" onClick={handledSubmitOrder}>
              CHECKOUT
            </button>
          </div>
          <br></br>
          <br></br>
        </div>
      </div>

      {redirect ? <Redirect to="/payment" /> : <></>}
      <Modal show={show2} onHide={handleClose3} style={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>INSERT THE E-MAIL TO GIFT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label style={{ marginLeft: "10" }}>E-MAIL: </Form.Label>
            <Form.Control
              type="email"
              name="emailGift"
              onChange={handleChangeGift}
              value={state.name}
              placeholder="email@email.com"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleClose2(checked.emailGift)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.rootReducer.cart,
    user: state.rootReducer.user,
    userStatus: state.rootReducer.login,
    login: state.rootReducer.login,
    gift: state.rootReducer.gift
  }
}

export default connect(mapStateToProps, {
  removeCart,
  addDetails,
  confirmOrder,
  clearCart,
  deleteCartLogged,
  getUserInfo,
  addGift,
  removeGift,
  removeAllGift
})(Cart);

