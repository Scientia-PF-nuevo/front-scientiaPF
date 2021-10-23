import React from 'react'
import { Link } from 'react-router-dom'
import './TrainningCard.css'
import {connect} from 'react-redux'
import Button from '@mui/material/Button';
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
      categories,
      setInfoVideoPlaying
    } = props;

    const info = {
      id: id,
      url: urlVideo,
    }

    const handleVideoSubmit = () => {
      setInfoVideoPlaying(info)
    }
    
    return (
      <div className="container-course">
        <div className="title-course"><h5>{name && name.toUpperCase()}</h5></div>
        <div className="course-div-card">
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
              <strong>STATE</strong>:  STARTED {id}
            </p>
          }
        </div>
        <div className="info-cat-div">
          <p>
            <strong>Category</strong>:{" "}
            {`${categories && categories.toUpperCase()}`}
          </p>
        </div>
          <LinearWithValueLabel/>
        <div className="button-container">

          <Link to='/player' style= {{textDecoration:"none"}}>
          <Button onClick={handleVideoSubmit} variant="contained" color="success">PLAY COURSE</Button>
          </Link>
        </div>
        <div className="rating-div">
        <TextRating score={score} />
        </div>
      </div>
    );
}


export default connect(null, {addDetails, setInfoVideoPlaying})(TrainningCard);