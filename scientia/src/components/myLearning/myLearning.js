import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import TrainningCard from '../TrainningCard/TrainningCard'
import { getUserInfo } from '../../actions/actions'
import './myLearning.css'


function MyLearning({ courses, user, getUserInfo }) {

  useEffect(() => {
    user.email && getUserInfo(user.email)
  }, [])

  const email = user.email

  const [values, setValues] = React.useState({
    coupon: ""
  })

  const handleChange = (e) => {
    const { value } = e.target
    setValues({ ...values, coupon: value })
  }

  const handleClick = async (e) => {

    try {
      axios.post(`http://localhost:3001/users/validateGift/${email}`, values)
      getUserInfo(email)
    } catch (err) {
      alert("invalide")
    }

  }

  return (
    <div>
    <div className="title-learning-div">
      <h1>My learning</h1>
    </div>
    <div className="my-learning-div">
      <div className="cupon">
                <div className="inputdiv-cupon">
                    <input
                      className="form-control-cupon"
                      type="text"
                      name="firstName"
                      placeholder=" Enter your gift code..."
                      onChange={handleChange}
                    />

                    <div className="save">
                      <button className="btn btn-primary mx-auto w-50" type="submit" onClick={handleClick}>Redeem</button>
                    </div>
                </div>
      </div>
      {
        (courses.hasOwnProperty("coursesAndData")) ? courses.coursesAndData.length === 0 ? (
          <div>
            <h1> NO COURSES GET </h1>
          </div>
        ) : courses.coursesAndData.length >= 1 ? (

          courses.coursesAndData.map((c) => {
            let suma = 0;
            let average;
            c.reviews.map((r, index) => {
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

            )
          })

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
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    courses: state.rootReducer.userInfo,
    user: state.rootReducer.user
  }
}

export default connect(mapStateToProps, { getUserInfo })(MyLearning)
