import React from 'react'
import { connect } from 'react-redux'
import { Table, CloseButton } from 'react-bootstrap';
import './Cart.css'




export function Cart({cart}) {

    function Total() {
        let result = cart.reduce((a, b) => ({price: a.price + b.price})).price
        return `$ ${result}`;
    }
    return (
        <div className="cart-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Price</th>
            <th>Total</th>
            <th>Quitar</th>
          </tr>
        </thead>
        {cart.length > 1 ? (
        cart.map((course) => (
            <tbody>
          <tr>
          <td>{course.id}</td>
          <td>{course.name.toUpperCase()}</td>
          <td>${course.price}</td>
          <td>{Total()}</td>
          <td>{<CloseButton/>}</td>
        </tr>
        </tbody>
        ))
      ) : (
        <div>
          {/* <img className="loading" src={loading} alt=""></img> */}
        </div>
      )}
      </Table>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        cart: state.rootReducer.cart
    }
}

export default connect(mapStateToProps)(Cart)
