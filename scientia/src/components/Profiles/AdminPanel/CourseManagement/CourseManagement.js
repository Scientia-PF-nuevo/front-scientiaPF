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




const CourseManagement = ({myFavorites}) => {
  if (myFavorites.length === 1) {
    var arrCourse = []
    arrCourse.push(myFavorites)
  }

  return myFavorites === "" ? (
    <div>
      <h1 > X </h1>
    </div>
    ) : 
    typeof myFavorites !== "undefined" && myFavorites.length >= 1 ? (
        <div className="div-favorite" style={{ width: 1060 }}>
        <h2 className="favorite">★ Start learning with your favorite courses</h2>
        <Carousel show={4}>
        {myFavorites.map((myFavorites) => (
          <div>
            <div style={{padding: 8}}>
          <Card style={{width: '95%', height: '240px', marginTop: 70, marginLeft: 10, marginRight: 10, background: "white" }}>
          <CardMedia
            component="img"
            height="140"
            image={myFavorites.url}
            alt={myFavorites.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            <p>{myFavorites.name}</p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ▪{myFavorites.categories}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
          </CardActions>
        </Card>
        </div>
        </div>
         ))}
          </Carousel>
      </div>
    ) : (
    <div className="div-mycourses">
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