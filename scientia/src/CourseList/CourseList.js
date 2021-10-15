import React from 'react'
import { connect } from 'react-redux'
import CourseCard from '../components/CourseCard/CourseCard'

function CourseList({courses}) {
  return (
    <div className="course-div">
      {courses.length > 1 ? (
        courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            name={course.name}
            // rating={g.rating}
            price={course.price}
            url={course.url}
            category={course.category}
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
