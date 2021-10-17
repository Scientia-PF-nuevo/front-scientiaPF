import React from 'react'
import { connect } from 'react-redux'
import { Table, CloseButton, ButtonToolbar } from 'react-bootstrap';
import { removeCart, addDetails } from '../../actions/actions';
import {Link} from 'react-router-dom'
import './Cart.css'




export function Cart({cart, removeCart, addDetails}) {

    var result=0;
    var taxs=0;
    var total=0;
    function Total() {
      result = cart.reduce((a, b) => ({price: a.price + b.price})).price
      taxs = result * 0.21;
      total= result + taxs;
      return `$ ${result}`;
    }
    
    return (
        <>
        <div className="cart-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Price</th>
            <th>Sub-Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        {cart.length >= 1 ? (
        cart.map((course) => (
            <tbody>
          <tr>
          <td>{course.id}</td>
          <td><Link to="/details" onClick={()=> addDetails(course.id)}>{course.name && course.name.toUpperCase()}</Link></td>
          <td>${course.price}</td>
          <td>{Total()}</td>
          <td>{<CloseButton onClick={() => removeCart(course.id)} />}</td>
        </tr>
        </tbody>
        ))
      ) : (
        <div>
        </div>
      )}
      </Table>
        </div>
        <p>SUB - TOTAL: $ {result}</p>
        <p>TAXs: $ {taxs}</p>
        <p>TOTAL: $ {total}</p>
        <button> CONFIRM ORDER </button>
        <br></br>
        <br></br>
        <button> CONFIRM LATER </button>
        </>
    );
}

function mapStateToProps(state) {
    return {
        cart: state.rootReducer.cart
    }
}

export default connect(mapStateToProps, {removeCart, addDetails})(Cart)
