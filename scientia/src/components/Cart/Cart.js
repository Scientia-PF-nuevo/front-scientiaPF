import React from 'react'
import { connect } from 'react-redux'
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
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Cart)
