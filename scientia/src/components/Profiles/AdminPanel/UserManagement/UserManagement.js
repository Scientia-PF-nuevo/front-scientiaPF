import React from 'react';
import './UserManagement.css';
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
      <div className="div-usermanagement" style={{ width: 1060 }}>
      <Carousel show={3}>
      {myCourses.map((myCourse) => (
        <div>
          <div style={{padding: 8}}>
        <Card style={{width: '95%', height: '340px', marginTop: 80, marginLeft: 10, marginRight: 10, background: "#373737", color: "white" }}>
        <CardMedia
          component="img"
          height="240"
          image={myCourse.url}
          alt={myCourse.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <h2>{myCourse.name}</h2>
          </Typography>
        </CardContent>
      </Card>
      </div>
      </div>
      ))}
     </Carousel>
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