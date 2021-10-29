import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";
import { Table } from 'react-bootstrap';
import {
  removeCart,
  addDetails,
  confirmOrder,
  pendingOrder,
  clearCart,
  getUserInfo
} from "../../actions/actions";
import { Link } from 'react-router-dom'
import './Cart.css'
import { Redirect } from 'react-router'
import { Modal, Button } from 'react-bootstrap'


export function Cart(props) {
  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  let history = useHistory();

  const usuario = useSelector(state => state.rootReducer.userInfo.coursesAndData)

  const {
    cart,
    user,
    login,
    removeCart,
    addDetails,
    confirmOrder,
    pendingOrder,
    clearCart,
  } = props;


  useEffect(() => {
    getUserInfo(user.email)
  }, [])

  function mensajeModel(id) {
    return `Ya posees el/los curso/s!`
  }

  var result = 0;
  var taxs = 0;
  var total = 0;
  function Total() {
    result = cart.reduce((a, b) => ({ offerPrice: a.offerPrice + b.offerPrice })).offerPrice
    taxs = parseFloat((result * 0.21).toFixed(2));
    total = parseFloat(result + taxs).toFixed(2);
    return `$ ${result}`;
  }


  const handledSubmitOrder = () => {

    if (usuario && usuario.length >= 1) {
      var arrIDCourses = usuario.map((course) => course.course.courseId)
    }

    const userCart = {
      email: "",
      courseId: []
    }

    if (cart.length >= 1 && login) {
      userCart.courseId = cart.map((course) => course.id)
      userCart.email = user.email

      var matchedIDs = []
      var sameId = false;
      if (arrIDCourses) {
        for (let i = 0; i < userCart.courseId.length; i++) {
          for (let j = 0; j < arrIDCourses.length; j++) {
            if (userCart.courseId[i] === arrIDCourses[j]) {
              sameId = true;
              matchedIDs.push(userCart.courseId[i])
            }
          }
        }
      }

      if (sameId) {
        handleShow()
      } else {
        confirmOrder(userCart)
        clearCart()
        setRedirect(true)
      }

    }

    else if (!login) {
      history.push("/login")
    }
  }

  const handledPendingOrder = () => {

    if (usuario.length >= 1) {
      var arrIDCourses = usuario.map((course) => course.courseId)
    }

    const userCart = {
      email: "",
      courseId: []
    }

    if (cart.length >= 1 && login) {
      userCart.courseId = cart.map((course) => course.id)
      userCart.email = user.email

      var matchedIDs = []
      var sameId = false;
      for (let i = 0; i < userCart.courseId.length; i++) {
        for (let j = 0; j < arrIDCourses.length; j++) {
          if (userCart.courseId[i] === arrIDCourses[j]) {
            var sameId = true;
            matchedIDs.push(userCart.courseId[i])
          }
        }
      }

      if (sameId) {
        handleShow()
      } else {
        pendingOrder(userCart)
        clearCart()
      }

    }

    else if (!login) {
      history.push("/login")
    }
  }

  return (
    <>
      <div className="cart-div">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Course</th>
              <th style={{ textAlign: "center" }}>Course Name</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>CUPON</th>
              <th style={{ textAlign: "center" }}>Sub-Total</th>
              <th style={{ textAlign: "center" }}>Remove</th>
            </tr>
          </thead>
          {cart.length >= 1 ? (
            cart.map((course) => (

              <tbody className="tbody-div">
                <tr style={{}}>
                  <td className="photo-div">
                    <img className="cart-img" src={course.url} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Link
                      to="/details"
                      onClick={() => addDetails(course.id)}
                      className="link-div-cart"
                    >
                      {course.name && course.name.toUpperCase()}
                    </Link>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {course.percentageDiscount > 0 ? (
                      <>
                        <h3
                          style={{
                            color: "red",
                            textDecoration: "line-through",
                          }}
                        >
                          ${course.price}
                        </h3>
                        <p>{course.percentageDiscount}% OFF</p>
                        <h3 style={{ color: "green" }}>${course.price - ((course.percentageDiscount / 100) * course.price)}</h3>
                      </>
                    ) : (
                      <>
                        <h3 style={{ color: "green" }}>
                          $
                          {course.price}
                        </h3>
                      </>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      label="ID Number"
                      variant="standard"
                    />
                    <Button color="secondary">Validar</Button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <h3 style={{ color: "red" }}>{Total()}</h3>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      <DeleteRoundedIcon
                        onClick={() => removeCart(course.id)}
                        style={{ cursor: "pointer" }}
                      />
                    }
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <div></div>
          )}
        </Table>
      </div>
      <p>
        <strong>SUB - TOTAL:</strong> $ {result}
      </p>
      <p>
        <strong>TAXs (21%):</strong> $ {taxs}
      </p>
      <p>
        <strong>TOTAL:</strong> $ {total}
      </p>
      <button className="confirm-button" onClick={handledSubmitOrder}>
        {" "}
        CONFIRM ORDER{" "}
      </button>
      <br></br>
      <br></br>

      {/* <button className="confirm-button-later" onClick={handledPendingOrder}> CONFIRM LATER </button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mensajeModel()}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok!
          </Button>
        </Modal.Footer>
      </Modal>

      {redirect ? <Redirect to="/payment" /> : <></>}
    </>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.rootReducer.cart,
    user: state.rootReducer.user,
    userStatus: state.rootReducer.login,
    login: state.rootReducer.login
  }
}

export default connect(mapStateToProps, {
  removeCart,
  addDetails,
  confirmOrder,
  pendingOrder,
  clearCart,
  getUserInfo
})(Cart);
