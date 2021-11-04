import React from 'react';
import Avatar from '@mui/material/Avatar';

import { connect } from 'react-redux'
import './Dashboard.css'

const Dashboard = (props) => {
  console.log(props.user)
      let initialFirstName = props.user.firstName.charAt(0)
      let initialLastName = props.user.lastName.charAt(0)
      let initials = initialFirstName + initialLastName
      
    return (
      <div className="div-dashboard">
          <h1>You're welcome!</h1>
         {/* {
          props.user.profilePicture && props.user.profilePicture > 0 ?
          <Avatar src={props.user.profilePicture} sx={{ width: 250, height: 250, bgcolor: 'orange', fontSize: 100 }}></Avatar> : 
          <Avatar  sx={{ width: 250, height: 250, bgcolor: 'orange', fontSize: 100 }}>{initials}</Avatar>
          } */}
          {
          props.photo && props.photo !== 0 ?
          <Avatar src={props.photo} sx={{ width: 250, height: 250, bgcolor: 'orange', fontSize: 100 }}></Avatar> : 
          <Avatar sx={{ width: 250, height: 250, bgcolor: 'orange', fontSize: 100 }}>{initials}</Avatar>
          }

            <h2>{props.user.firstName + " " + props.user.lastName}</h2>
            <h3>{props.user.email}</h3> 
      </div>
    );
  };


function mapStateToProps(state) {
    return {
        user: state.rootReducer.user,
        photo: state.rootReducer.userInfo.profilePicture
    }
    
}

export default connect(mapStateToProps)(Dashboard)

