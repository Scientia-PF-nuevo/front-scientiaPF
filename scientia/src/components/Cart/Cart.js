import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
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

export function Cart(props) {


  let history = useHistory();

  const usuario = useSelector(state => state.rootReducer.cart)

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

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    getUserInfo(user.email)
  }, [])

  var result = 0;
  var taxs = 0;
  var total = 0;
  function Total() {
    result = cart.reduce((a, b) => ({ price: a.price + b.price })).price
    taxs = parseFloat((result * 0.21).toFixed(2));
    total = result + taxs;
    return `$ ${result}`;
  }

  const handledSubmitOrder = () => {

    if (usuario && usuario.length >= 1) {
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
        alert("Ya posees este curso " + " ID: " + matchedIDs)
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
        alert("Ya posees este curso " + " ID: " + matchedIDs)
      } else {
        pendingOrder(userCart)
        alert("PENDING ORDER:.......")
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
                  <td style={{ textAlign: "center" }}><h3 style={{ color: "red" }}>${course.price}</h3><p>ID: {course.id && course.id}</p></td>
                  <td style={{ textAlign: "center" }}>
                    <TextField id="standard-basic" label="ID Number" variant="standard" />
                    <Button color="secondary">Validar</Button>
                  </td>
                  <td style={{ textAlign: "center" }}><h3 style={{ color: "red" }}>{Total()}</h3></td>
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
      <p><strong>SUB - TOTAL:</strong> $ {result}</p>
      <p><strong>TAXs:</strong> $ {taxs}</p>
      <p><strong>TOTAL:</strong> $ {total}</p>
      <button className="confirm-button" onClick={handledSubmitOrder}> CONFIRM ORDER </button>
      <br></br>
      <br></br>
      <button className="confirm-button-later" onClick={handledPendingOrder}> CONFIRM LATER </button>

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
