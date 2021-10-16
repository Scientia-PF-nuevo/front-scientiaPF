import React from 'react'
import { connect } from 'react-redux'
import CourseCard from '../components/CourseCard/CourseCard'

function CourseList({ courses }) {

  return typeof courses !== "undefined" && courses.length > 1 ? (
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
  ) : courses.length <= 1 ? (
    <div>
      <h1>Cargando</h1>
    </div>
  ) : (
    <CourseCard
      key={courses.id}
      id={courses.id}
      name={courses.name}
      score={courses.score}
      date={courses.date}
      price={courses.price}
      url={courses.url}
      categories={courses.categories}
    />
  );
}

const mapStateToProps = (state) => {
    return {
        courses: state.rootReducer.allCourses
    }
}

export default connect(mapStateToProps, null)(CourseList)
