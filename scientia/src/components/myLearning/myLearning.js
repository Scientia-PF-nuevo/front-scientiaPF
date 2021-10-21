import React from 'react'
import { connect } from 'react-redux'
import TrainningCard from '../TrainningCard/TrainningCard'
import './myLearning.css'

function MyLearning({courses}) {

    if (courses.length === 1) {
        var arrCourse = []
        arrCourse.push(courses)
      }
    
      return (
        <div className="my-learning-div">

          {
            courses === "" ? (
          <div>
            <h1> SIN CURSOS COMPRADOS </h1>
          </div>
        ) : typeof courses !== "undefined" && courses.length >= 1 ? (
          
          courses.map((course) => (
            <TrainningCard
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
        )
        }
        </div>
      
      )
    }
    
    const mapStateToProps = (state) => {
        return {
            courses: state.rootReducer.allCourses
        }
    }
    
    export default connect(mapStateToProps, null)(MyLearning)
    