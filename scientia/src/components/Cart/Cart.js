import React from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TextField from '@mui/material/TextField';
import { Table, CloseButton } from 'react-bootstrap';
import {
  removeCart,
  addDetails,
  confirmOrder,
  pendingOrder,
  clearCart,
} from "../../actions/actions";
import {Link} from 'react-router-dom'
import './Cart.css'


var userIDCounter = 0;  //! SOLO PARA TESTING

export function Cart({cart,users, removeCart, addDetails, confirmOrder, pendingOrder, clearCart}) {

    var result=0;
    var taxs=0;
    var total=0;
    function Total() {
      result = cart.reduce((a, b) => ({price: a.price + b.price})).price
      taxs = result * 0.21;
      total= result + taxs;
      return `$ ${result}`;
    }

    const handledSubmitOrder = () => {

      const userCart = {
        email: "",
        courseId: []
      }

      if (cart.length >=1 && users.length >=1) {
        userIDCounter++  //! SOLO PARA TESTING
        userCart.courseId = cart.map((course) => course.id )
        userCart.email = users[userIDCounter].email //! SOLO PARA TESTING
  
        confirmOrder(userCart)
        alert("ORDER PROCESS OK ORDER:.......")
        clearCart()
        
      }
    }

    const handledPendingOrder = () => {

      const userCart = {
        email: "",
        courseId: []
      }

      if (cart.length >=1 && users.length >=1) {
        userIDCounter++  //! SOLO PARA TESTING
        userCart.courseId = cart.map((course) => course.id )
        userCart.email = users[userIDCounter].email  //! SOLO PARA TESTING
  
        pendingOrder(userCart)
        alert("SAVED ORDER")
        clearCart()
        
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
                  <tr style={{ }}>
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
                    <td style={{ textAlign: "center" }}>${course.price}</td>
                    <td style={{ textAlign: "center" }}>
                    <TextField id="standard-basic" label="ID Number" variant="standard" />
                      <Button color="secondary">Validar</Button>
                    </td>
                    <td style={{ textAlign: "center" }}>{Total()}</td>
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
      </>
    );
}

function mapStateToProps(state) {
    return {
        cart: state.rootReducer.cart,
        users: state.rootReducer.users
    }
}

export default connect(mapStateToProps, {
  removeCart,
  addDetails,
  confirmOrder,
  pendingOrder,
  clearCart,
})(Cart);
