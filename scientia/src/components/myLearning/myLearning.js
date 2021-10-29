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
            (courses.hasOwnProperty("coursesAndData")) ? courses.coursesAndData.length === 0 ? (
          <div>
            <h1> NO COURSES GET </h1>
          </div>
        ) : courses.coursesAndData.length >= 1 ? (
          
          courses.coursesAndData.map((c) => {
            let suma = 0;
					  let average;
					  const SCs = c.reviews.map((r, index) => {
						suma = suma + r.score;						
						average = suma / index;
					});
      

          if (courses.coursesAndData.length >= 1) {
           
            var barProgress = 0;

           var fullTime = c.course.lenghtVideo
           var timeSaw = c.course.timeWatched
           if (timeSaw >= 1) {

           barProgress = Math.ceil(((timeSaw / fullTime) * 100))
           }
          }

            return (
            
            <TrainningCard
              key={c.course.courseId}
              id={c.course.courseId}
              name={c.course.courseName}
              score={average}
              state={c.course.state}
              url={c.url}
              urlVideo={c.urlVideo}
              barProgress={barProgress}
            />

          )})
          
        ) : (
          <div>
            <h1>LOADING...</h1>
          </div>
        ) : 
        (
          <div>
            <h1>SERVER ERROR</h1>
          </div>
        ) 
        }
        
        </div>
      
      )
    }
    
    const mapStateToProps = (state) => {
        return {
            courses: state.rootReducer.userInfo,
            user: state.rootReducer.user
        }
    }
    
    export default connect(mapStateToProps, {getUserInfo})(MyLearning)
    