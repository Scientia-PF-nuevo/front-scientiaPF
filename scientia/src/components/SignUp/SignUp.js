import React from 'react';
import './SignUp.css';
import { connect } from 'react-redux'
import * as actionCreators from './../../actions/actions'
import { bindActionCreators } from 'redux';
import { useDispatch } from "react-redux";
import { createUser } from '../../actions/actions';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    province: '',
    city: '',
    address: '',
    postalcode: ''
  })

  const [validations, setValidations] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const validateAll = () => {
    const { firstName, lastName } = values
    const validations = { firstName: '', lastName: '', email: '', password: '' }
    let isValid = true

    if (!firstName) {
      validations.firstName = 'First Name is required'
      isValid = false
    }

    if (firstName && firstName.length < 3 || firstName.length > 50) {
      validations.firstName = 'Name must contain between 3 and 50 characters'
      isValid = false
    }

    if (!lastName) {
      validations.lastName = 'Last Name is required'
      isValid = false
    }

    if (lastName && firstName.length < 3 || firstName.length > 50) {
      validations.lastName = 'Last must contain between 3 and 50 characters'
      isValid = false
    }

    if (!email) {
      validations.email = 'Email is required'
      isValid = false
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      validations.email = 'Email format must be as example@mail.com'
      isValid = false
    }

    if (!password) {
      validations.password = 'Password is required'
      isValid = false
    }

    if (password && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password)) {
      validations.password = 'Password format must be as $@$!%*?&'
      isValid = false
    }

    if (!isValid) {
      setValidations(validations)
    }

    return isValid
  }

  const validateOne = (e) => {
    const { name } = e.target
    const value = values[name]
    let message = ''

    if (!value) {
      message = `${name} is required`
    }

    if (value && name === 'firstName' && (value.length < 3 || value.length > 50)) {
      message = 'First Name must contain between 3 and 50 characters'
    }

    if (value && name === 'lastName' && (value.length < 3 || value.length > 50)) {
      message = 'Last Name must contain between 3 and 50 characters'
    }

    if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      message = 'Email format must be as henry@mail.com'
    }

    if (value && name === 'password' && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(value)) {
      message = 'The password must be •8 to 16 characters •at least one digit •at least one lowercase •at least one uppercase.'
    }

    setValidations({ ...validations, [name]: message })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    const isValid = validateAll()

    if (!isValid) {
      return false
    }

    dispatch(createUser(values));
  }

  const { firstName, lastName, email, password, phone, country, city, province, address, postalcode } = values

  const {
    firstName: firstNameVal,
    lastName: lastNameVal,
    email: emailVal,
    password: passwordVal
  } = validations

  return (
    <>
      <div className="titleLoginDiv">
        <h1>Sign Up!</h1>
      </div>
      <div className="div-signup" >
        <h1 id="h1">Fill with your information</h1>
        <form>
          <div className="form-row">
            <div>
              <label>*First Name:
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={firstName}
                  placeholder="Henry"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
              <div className="legend">{firstNameVal}</div>
            </div>

            <div>
              <label>*Last Name:
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={lastName}
                  placeholder="Boom"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
              <div className="legend" v>{lastNameVal}</div>
            </div>

            <div>
              <label>*Email:
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="henry@mail.com"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
              <div className="legend">{emailVal}</div>
            </div>

            <div>
              <label>*Password:
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="***********"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
              <div className="legend">{passwordVal}</div>
            </div>

            <div >
              <label>Phone:
                <input
                  className="form-control"
                  type="number"
                  name="phone"
                  value={phone}
                  placeholder="4382929282"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
            </div>

            <div>
              <label>Country:
                <input
                  className="form-control"
                  type="text"
                  name="country"
                  value={country}
                  placeholder="Argentina"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
            </div>

            <div>
              <label>Province:
                <input
                  className="form-control"
                  type="text"
                  name="province"
                  value={province}
                  placeholder="Ciudad de Buenos Aires"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
            </div>

            <div>
              <label>City:
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  value={city}
                  placeholder="Mar del Plata"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
            </div>

            <div>
              <label>Address:
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  value={address}
                  placeholder="Av. Santa Fe 4362"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
            </div>

            <div>
              <label>Postal Code:
                <input
                  className="form-control"
                  type="text"
                  name="postalcode"
                  value={postalcode}
                  placeholder="B7600"
                  onChange={handleChange}
                  onBlur={validateOne}
                />
              </label>
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleSubmit} type="submit">Submit</button>
          <p><b>Already have an account? <a href="/login">Sign-In</a></b></p>
        </form>
      </div>
    </>
  )
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

function mapStateToProps(state) {
  return {
    user: state.rootReducer.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)