import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import TrainningCard from '../TrainningCard/TrainningCard'
import {getUserInfo} from '../../actions/actions'
import './myLearning.css'

function MyLearning({courses,user, getUserInfo}) {

  useEffect (()=> {
    
    getUserInfo(user.email)
    
  }, [])
    
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
              key={course.courseId}
              id={course.courseId}
              name={course.state}
              score={course.price}
              date={course.createdAt}
              price={course.price}
              url="https://www.tallermecanico.com.ar/wp-content/uploads/2018/08/blog10-960x500.jpg"
              categories={course.owner}
              description={course.owner}
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
            courses: state.rootReducer.userInfo.usuario.bought_courses,
            user: state.rootReducer.user
        }
    }
    
    export default connect(mapStateToProps, {getUserInfo})(MyLearning)
    