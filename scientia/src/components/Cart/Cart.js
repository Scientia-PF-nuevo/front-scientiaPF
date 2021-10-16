import React from 'react'
import { connect } from 'react-redux'

export function Cart({cart}) {
  
        return (
            <div className="course-div-cards">
              {cart.length > 1 ? (
                cart.map((course) => (
                 <ul>
                     {<li>{course.name}</li>}
                 </ul>
                ))
              ) : (
                <div>
                  {/* <img className="loading" src={loading} alt=""></img> */}
                </div>
              )}
            </div>
          );
    

import CourseCard from '../CourseCard/CourseCard'

export function Cart() {
    return (
        <div>
            <h1>CART</h1>
        </div>
    )

}

function mapStateToProps(state) {
    return {
        cart: state.rootReducer.cart
    }
}

export default connect(mapStateToProps)(Cart)
