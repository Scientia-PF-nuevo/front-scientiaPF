import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import TrainningCard from '../TrainningCard/TrainningCard'
import {getUserInfo} from '../../actions/actions'
import './myLearning.css'

// function MyLearning({courses,user, getUserInfo}) {

//   useEffect (()=> {
    
//     getUserInfo(user.email)
    
//   }, [])
    
//       return (
//         <div className="my-learning-div">

//           {
//             courses === "" ? (
//           <div>
//             <h1> SIN CURSOS COMPRADOS </h1>
//           </div>
//         ) : typeof courses !== "undefined" && courses.length >= 1 ? (
          
//           courses.map((course) => (
            
//             <TrainningCard
//               key={course.courseId}
//               id={course.courseId}
//               name={course.state}
//               score={course.price}
//               date={course.createdAt}
//               price={course.price}
//               // url={course.courseP}
//               categories={course.owner}
//               description={course.owner}
//             />

//           ))
          
//         ) : (
//           <div>
//             <h1>Cargando...</h1>
//           </div>
//         )
//         }
//         </div>
      
//       )
//     }
    
//     const mapStateToProps = (state) => {
//         return {
//             courses: state.rootReducer.userInfo.bought_courses,
//             user: state.rootReducer.user
//         }
//     }
    
//     export default connect(mapStateToProps, {getUserInfo})(MyLearning)
    
function MyLearning({courses,user, getUserInfo}) {
  console.log(courses.coursesAndData)
  useEffect (()=> {
    
    getUserInfo(user.email)
    
  }, [])
    
      return (
        <div className="my-learning-div">

          {
            courses.coursesAndData.length === 0 ? (
          <div>
            <h1> SIN CURSOS COMPRADOS </h1>
          </div>
        ) : courses.coursesAndData.length >= 1 ? (
          
          courses.coursesAndData.map((c) => {
            
            let suma = 0;
					  let average;
					  const SCs = c.reviews.map((r, index) => {
						suma = suma + r.score;						
						average = suma / index;
					});
            console.log(c.url)
            return (
            
            <TrainningCard
              key={c.course.courseId}
              id={c.course.courseId}
              name={c.course.courseName}
              score={average}
              date={c.course.createdAt}
              price={c.course.price}
              url={c.url}
              urlVideo={c.urlVideo}
              categories={c.course.owner}
              description={c.course.description}
            />

          )})
          
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
            courses: state.rootReducer.userInfo,
            user: state.rootReducer.user
        }
    }
    
    export default connect(mapStateToProps, {getUserInfo})(MyLearning)
    