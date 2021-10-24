import React from 'react';
import './UserManagement.css';
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import UsersTable from './Table/Table';

const UserManagement = ({myCourses}) => {
  if (myCourses.length === 1) {
    var arrCourse = []
    arrCourse.push(myCourses)
  }

  return myCourses === "" ? (
    <div>
      <h1></h1>
    </div>
    ) : 
    typeof myCourses !== "undefined" && myCourses.length >= 1 ? (
      <div className="div-usermanagement">
        <UsersTable />
      </div>
    ) : (
    <div className="div-usermanagement">
      <CircularProgress disableShrink />
    </div>
  );
}

    const mapStateToProps = (state) => {
    return {
        myCourses: state.rootReducer.allCourses
    }
  };


  export default connect(mapStateToProps, null)(UserManagement)