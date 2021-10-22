import React from 'react';
import './CourseManagement.css';
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Carousel from '../Carousel/Carousel';
import CoursesTable from './Table/Table';




const CourseManagement = ({myFavorites}) => {
  if (myFavorites.length === 1) {
    var arrCourse = []
    arrCourse.push(myFavorites)
  }

  return myFavorites === "" ? (
    <div>
      <h1></h1>
    </div>
    ) : 
    typeof myFavorites !== "undefined" && myFavorites.length >= 1 ? (
      <div className="div-coursesmanagement">
        <CoursesTable />
      </div>
    ) : (
    <div className="div-coursesmanagement">
      <CircularProgress disableShrink />
    </div>
  );
}

    const mapStateToProps = (state) => {
    return {
        myFavorites: state.rootReducer.allCourses
    }
  };


  export default connect(mapStateToProps, null)(CourseManagement)