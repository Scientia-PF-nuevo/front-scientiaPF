import React from 'react';
import Avatar from '@mui/material/Avatar';
import { getUsers } from '../../../../actions/actions';
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../../actions/actions'
import './AdminDashboard.css'

const AdminDashboard = (props) => {

    
    const dispatch = useDispatch();

    dispatch(getUsers());

    if (props.user.firstName) {
    }
    return (
      <div className="div-admindashboard">
          <h1>You're welcome!</h1>
          <Avatar sx={{ width: 200, height: 200, bgcolor: '#090062', fontSize: 100 }}>{"👁️‍🗨️"}</Avatar>
            <h1>Admin</h1>
            <h2>{props.user.firstName}</h2>
            <h3>{props.user.email}</h3> 
      </div>
    );
  };


function mapStateToProps(state) {
  return {
    login: state.rootReducer.login,
    user: state.rootReducer.user,
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)