import React from 'react'
import { connect } from 'react-redux'
import CourseCard from '../components/CourseCard/CourseCard'

function CourseList({courses}) {
  return (
    <div className="course-div-cards">
      {courses.length > 1 ? (
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
          />
        ))
      ) : (
        <div>
          {/* <img className="loading" src={loading} alt=""></img> */}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        courses: state.rootReducer.allCourses
    }
}

export default connect(mapStateToProps, null)(CourseList)
