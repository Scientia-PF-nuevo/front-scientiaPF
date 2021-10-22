import React from 'react';
import './Statistics.css';
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Carousel from '../Carousel/Carousel';


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
      <div className="div-adminstatistics">
        <img src="https://images.vexels.com/media/users/3/206056/isolated/preview/9af07a2936f83c0318f29730f5907423-creciente-trazo-de-barras-de-grafico.png"/>
      </div>
    ) : (
    <div className="div-adminstatistics">
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