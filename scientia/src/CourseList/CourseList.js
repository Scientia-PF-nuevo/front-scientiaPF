import React from 'react'
import { connect } from 'react-redux'
import CourseCard from '../components/CourseCard/CourseCard'
import './CourseList.css'

function CourseList({ courses }) {

  if (courses.length === 1) {
    var arrCourse = []
    arrCourse.push(courses)
  }

  return courses === "" ? (
    <div>
      <h1> NO ENCONTRADO </h1>
    </div>
  ) : 
    
  typeof courses !== "undefined" && courses.length >= 1 ? (
    courses.map((course) => (
      <CourseCard
        key={course.id}
        id={course.id}
        name={course.name}
        score={course.score}
        date={course.date}
        price={course.price}
        url={course.url}
        categories={course.categories}
        description={course.description}
      />
    ))
  ) : (
    <div>
      <h1>Cargando...</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        courses: state.rootReducer.allCourses
    }
}

export default connect(mapStateToProps, null)(CourseList)
