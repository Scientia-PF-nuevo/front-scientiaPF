import React from 'react';
import './MyProfile.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserInfo } from '../../../../actions/actions';
import { useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';





const MyProfile = ({userInfo, photo}) => {
  console.log('userInfo', userInfo)

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

  // let initialFirstName = userInfo.firstName.charAt(0)
  // let initialLastName = userInfo.lastName.charAt(0)
  // let initials = initialFirstName + initialLastName
  let initials = "a"

  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: "",
    phone: userInfo.phone,
    country: userInfo.country,
    province: userInfo.province,
    city: userInfo.city,
    address: userInfo.address,
    postalcode: userInfo.postalcode
  })

  const [changePassword, setChangePassword] = React.useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: ""
  })

  const [validations, setValidations] = React.useState({
    firstName: '',
    lastName: '',
    password: ''
  })

  const [validationsPassword, setValidationsPassword] = React.useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: ""
  })

  const validateAll = () => {
    const { firstName, lastName } = values
    const validations = { firstName: '', lastName: '', password: '' }
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

    if (!password) {
      validations.password = 'Password is required'
      isValid = false
    }

    if (password && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password)) {
      validations.password = 'Password format must be as afQ1221$@$'
      isValid = false
    }

    if (!isValid) {
      setValidations(validations)
    }

    return isValid
  }

  const validateAllPassword = () => {
    const { oldPassword, newPassword, newPassword2 } = changePassword
    const validationsPassword = { oldPassword: '', newPassword: '', newPassword2: '' }
    let isValid = true

    if (!oldPassword) {
      validationsPassword.password = 'Password is required'
      isValid = false
    }

    if (oldPassword && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(oldPassword)) {
      validationsPassword.oldPassword = 'Password format must be as afQ1221$@$'
      isValid = false
    }

    if (!newPassword) {
      validationsPassword.newPassword = 'New password is required'
      isValid = false
    }

    if (newPassword && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(newPassword)) {
      validationsPassword.newPassword = 'The new password format must be as afQ1221$@$'
      isValid = false
    }

    if (!newPassword2) {
      validationsPassword.newPassword2 = 'New password is required'
      isValid = false
    }

    if (newPassword !== newPassword2) {
      validationsPassword.newPassword2 = 'The new password does not match'
      isValid = false
    }

    if (!isValid) {
      setValidationsPassword(validationsPassword)
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

    if (value && name === 'password' && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(value)) {
      message = 'The password must be •8 to 16 characters •at least one digit •at least one lowercase •at least one uppercase.'
    }

    setValidations({ ...validations, [name]: message })
  }

  const validateOnePassword = (e) => {
    const { name } = e.target
    const value = changePassword[name]
    let message = ''

    if (!value) {
      message = `${name} is required`
    }

    if (value && name === 'oldPassword' && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(value)) {
      message = 'The password must be •8 to 16 characters •at least one digit •at least one lowercase •at least one uppercase.'
    }

    if (value && name === 'newPassword' && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(value)) {
      message = 'The password must be •8 to 16 characters •at least one digit •at least one lowercase •at least one uppercase.'
    }

    if (value && name === 'newPassword2' && !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(value)) {
      message = 'The password must be •8 to 16 characters •at least one digit •at least one lowercase •at least one uppercase.'
    }

    setValidationsPassword({ ...validationsPassword, [name]: message })
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleChangePassword = (e) => {
    const { name, value } = e.target
    setChangePassword({ ...changePassword, [name]: value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const isValid = validateAll()

    if (!isValid) {
      return false
    }

    await axios.put(`http://localhost:3001/users/updateInfo/${email}`, values);
    console.log('put exitoso')

    dispatch(getUserInfo(email));
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
  
    const isValid = validateAllPassword()

    if (!isValid) {
      return false
    }

    await axios.put(`http://localhost:3001/users/updatePW/${email}`, changePassword);
    console.log('put change password exitoso')

    dispatch(getUserInfo(email));
  }

  const { firstName, lastName, email, password, phone, country, city, province, address, postalcode } = values

  const { oldPassword, newPassword, newPassword2 } = changePassword

  const {
    firstName: firstNameVal,
    lastName: lastNameVal,
    password: passwordVal
  } = validations

  const {
    oldPassword: oldPasswordVal,
    newPassword: newPasswordVal,
    newPassword2: newPassword2Val
  } = validationsPassword

  const cloud_name = "divya1qba";
  const upload_preset = "yfyfeypn"; 
  const handleClickU = () => {
    console.log('entré')
  const { files } = document.querySelector(".app_uploadInput");
  const formData = new FormData();
  console.log(formData)
  formData.append("file", files[0]);
  formData.append("upload_preset", upload_preset);
  const options = {
    method: "POST",
    body: formData,
  };
  console.log(formData)
    return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options
  )
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
  };

  return userInfo ? (
      <div className="div-userinfo">
        <div className="subdiv">
              
         <h2>Profile</h2>
          <div >
            <form className="form-user">

              <div className="form-row">

                <Root>
                  <Divider>
                    <Chip label="Personal information" />
                  </Divider>
                </Root>

                <div className="inputdiv">
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

                <div className="inputdiv">
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
                  <div className="legend">{lastNameVal}</div>
                </div>

                <div className="inputdiv">
                  <label>Phone:
                    <input
                      className="form-control"
                      type="number"
                      name="phone"
                      value={phone}
                      placeholder="4382929282"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="inputdiv">
                  <label>Country:
                    <input
                      className="form-control"
                      type="text"
                      name="country"
                      value={country}
                      placeholder="Argentina"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="inputdiv">
                  <label>Province:
                    <input
                      className="form-control"
                      type="text"
                      name="province"
                      value={province}
                      placeholder="Ciudad de Buenos Aires"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="inputdiv">
                  <label>City:
                    <input
                      className="form-control"
                      type="text"
                      name="city"
                      value={city}
                      placeholder="Mar del Plata"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="inputdiv">
                  <label>Address:
                    <input
                      className="form-control"
                      type="text"
                      name="address"
                      value={address}
                      placeholder="Av. Santa Fe 4362"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="inputdiv">
                  <label>Postal Code:
                    <input
                      className="form-control"
                      type="text"
                      name="postalcode"
                      value={postalcode}
                      placeholder="B7600"
                      onChange={handleChange}
                    />
                  </label>
              </div>

              <div className="inputdiv">
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

              <div className="save">
                <button className="btn btn-primary mx-auto w-50" onClick={handleSubmit} type="submit">Save</button>
              </div>

              <Root>
                <Divider>
                  <Chip label="Change Password" />
                </Divider>
              </Root>

              <div className="inputdiv">
                  <label>*Current Password:
                    <input
                      className="form-control"
                      type="password"
                      name="oldPassword"
                      value={oldPassword}
                      placeholder="***********"
                      onChange={handleChangePassword}
                      onBlur={validateOnePassword}
                    />
                  </label>
                  <div className="legend">{oldPasswordVal}</div>
                </div>

                <div className="inputdiv">
                  <label>*New Password:
                    <input
                      className="form-control"
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      placeholder="***********"
                      onChange={handleChangePassword}
                      onBlur={validateOnePassword}
                    />
                  </label>
                  <div className="legend">{newPasswordVal}</div>
                </div>

                <div className="inputdiv">
                  <label>*Confirm Password:
                    <input
                      className="form-control"
                      type="password"
                      name="newPassword2"
                      value={newPassword2}
                      placeholder="***********"
                      onChange={handleChangePassword}
                      onBlur={validateOnePassword}
                    />
                  </label>
                  <div className="legend">{newPassword2Val}</div>
                </div>

              <div className="save">
                <button className="btn btn-primary mx-auto w-50" type="submit" onClick={handleSubmitPassword}>Save</button>
              </div>
            </div>

            <div>
                {
                userInfo.photoURL >= 1 ?
                <Avatar src={userInfo.photoURL} sx={{ width: 180, height: 180, bgcolor: 'orange', fontSize: 100 }}></Avatar> :
                <Avatar sx={{ width: 250, height: 250, bgcolor: 'orange', fontSize: 100 }}>{initials}</Avatar>
                }
              </div>
              
              <div className="appp">
                <input type="file" className="app_uploadInput" />
                <button className="app_uploadButton" onClick={handleClickU}>Upload</button>
              </div>
            </form>           
          </div>
          </div>
      </div>
    ) : (
    <div className="div-userinfo">
      <CircularProgress disableShrink />
    </div>
  );
}

    const mapStateToProps = (state) => {
    return {
      userInfo: state.rootReducer.userInfo,
      photo: state.rootReducer.user.photoURL
    }
  };


  export default connect(mapStateToProps, null)(MyProfile)