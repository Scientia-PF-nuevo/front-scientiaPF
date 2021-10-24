import React from 'react';
import Avatar from '@mui/material/Avatar';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../../actions/actions'
import './Dashboard.css'

const Dashboard = (props) => {
    if (props.user.displayName) {
      let inicialNombre = props.user.displayName.split(' ')[0][0]
      let inicialApellido = props.user.displayName.split(' ')[1][0]
      var iniciales = inicialNombre + inicialApellido
    }
    return (
      <div className="div-dashboard">
          <h1>You're welcome!</h1>
          <Avatar src={props.user.photoURL} sx={{ width: 130, height: 130, bgcolor: 'orange', fontSize: 100 }}></Avatar>

            <h2>{props.user.displayName}</h2>
            <h3>{props.user.email}</h3> 
      </div>
    );
  };


function mapStateToProps(state) {
  console.log(state.rootReducer)
    return {
        login: state.rootReducer.login,
        user: state.rootReducer.user,
    }
    
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)