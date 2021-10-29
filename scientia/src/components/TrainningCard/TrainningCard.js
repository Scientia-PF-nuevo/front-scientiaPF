import React from 'react'
import { Link } from 'react-router-dom'
import './TrainningCard.css'
import {connect} from 'react-redux'
import TextRating from '../../components/CourseCard/Qualify'
import {addDetails, setInfoVideoPlaying} from '../../actions/actions'
import LinearWithValueLabel from '../Progress/Progress'

function TrainningCard(props) {
  
    const {
      id,
      name,
      url,
      urlVideo,
      score,
      state,
      setInfoVideoPlaying,
      barProgress
    } = props;

    const info = {
      id: id,
      url: urlVideo,
    }

    const handleVideoSubmit = () => {
      setInfoVideoPlaying(info)
    }

    
    return (
      <div className="container-course2">
        <div className="title-course2"><h5>{name && name.toUpperCase()}</h5></div>
        <div className="course-div-card2">
          {url ? (
            <img src={`${url}`} alt="Course" className="Img"></img>
          ) : (
            {
              /* <img src={noImage} alt="Course" className="Img"></img> */
            }
          )}
        </div>
        <div className="info-price-div">
          {
            <p>
              <strong>STATUS</strong>: {state && state.toUpperCase()}
            </p>
          }
        </div>

          <LinearWithValueLabel barProgress={barProgress}/>
        <div className="button-container2">

          <Link to='/player' style= {{textDecoration:"none"}}>
          <button className="confirm-button3" onClick={handleVideoSubmit}>PLAY COURSE</button>
          </Link>
        </div>
        <div className="rating-div">
        <TextRating score={score} />
        </div>
      </div>
    );
}



export default connect(null, {addDetails, setInfoVideoPlaying})(TrainningCard);