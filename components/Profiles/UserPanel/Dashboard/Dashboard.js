import React from 'react';
import Avatar from '@mui/material/Avatar';

import { connect } from 'react-redux'
import './Dashboard.css'

const Dashboard = (props) => {
      // let initialFirstName = props.user.firstName.charAt(0)
      // let initialLastName = props.user.lastName.charAt(0)
      // let initials = initialFirstName + initialLastName
      let initials = "b"
      
    return (
      <div className="div-dashboard">
          <h1>You're welcome!</h1>
         {
          props.user.photoURL >= 1 ?
          <Avatar src={props.user.photoURL} sx={{ width: 250, height: 250, bgcolor: 'orange', fontSize: 100 }}></Avatar> :
          <Avatar sx={{ width: 250, height: 250, bgcolor: 'orange', fontSize: 100 }}>{initials}</Avatar>
          }

            <h2>{props.user.firstName + " " + props.user.lastName}</h2>
            <h3>{props.user.email}</h3> 
      </div>
    );
  };


function mapStateToProps(state) {
    return {
        login: state.rootReducer.login,
        user: state.rootReducer.userInfo,
    }
    
}

export default connect(mapStateToProps)(Dashboard)