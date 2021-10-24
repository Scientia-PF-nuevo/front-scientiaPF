import React from 'react';
import './CreatedCourses.css';
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import CoursesTable from './Table/Table';

const CreatedCourses = ({myFavorites}) => {
  if (myFavorites.length === 1) {
    var arrCourse = []
    arrCourse.push(myFavorites)
  }



  const prueba = myFavorites.map((myFavorites) => (
    { id: myFavorites.id, categories: myFavorites.categories, name: myFavorites.name }
    ))
    console.log(myFavorites[0].name, prueba, 'nuevo consol')

  return myFavorites.length >= 1 ? (
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
      console.log(state.rootReducer.courseDetails.newCourse, 'aqui')
    return {
        myFavorites: [state.rootReducer.courseDetails.newCourse]
    }
  };


  export default connect(mapStateToProps, null)(CreatedCourses)