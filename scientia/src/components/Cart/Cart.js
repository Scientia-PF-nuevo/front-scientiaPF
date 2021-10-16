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
    
}

function mapStateToProps(state) {
    return {
        cart: state.rootReducer.cart
    }
}

export default connect(mapStateToProps)(Cart)
