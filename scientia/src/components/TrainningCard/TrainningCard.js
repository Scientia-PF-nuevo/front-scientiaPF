import React from 'react'
import { Link } from 'react-router-dom'
import './TrainningCard.css'
import {connect} from 'react-redux'
import TextRating from '../../components/CourseCard/Qualify'
import {addDetails, setInfoVideoPlaying, deleteCourse} from '../../actions/actions'
import LinearWithValueLabel from '../Progress/Progress'
import { Modal, Button } from 'react-bootstrap'
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import Form from 'react-bootstrap/Form'
import styles from './modal.css.js'

function TrainningCard(props) {
  
    const {
      id,
      name,
      url,
      urlVideo,
      score,
      state,
      setInfoVideoPlaying,
      barProgress,
      deleteCourse,
      email
    } = props;

const { enqueueSnackbar } = useSnackbar();

const handleClickVariantOk = () => {
        enqueueSnackbar('COURSE DELETED CORRECTLY', {
          anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',              
          },
          TransitionComponent: Slide,
          variant: 'success',
      })
}

const handleClickVariantWrongEmail = () => {
  enqueueSnackbar('INCORRECT EMAIL OR MISSED', {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',              
    },
    TransitionComponent: Slide,
    variant: 'error',
})
}

    const [emailUser, setEmailUser] = React.useState({ emailGift: "" });
    const handleChangeEmail = (e) => setEmailUser({[e.target.name]: e.target.value})
    const [show, setShow] = React.useState(false);
    
    
    
    const handleClose = () => {
      setShow(false)
    };
    
    
    const info = {
      id: id,
      url: urlVideo,
    }
    
    const handleVideoSubmit = () => {
      setInfoVideoPlaying(info)
    }
    
    const handdleDeleteCourse = () => {
      setShow(true)
    }
    
    const handleDeleteSubmit = () => {
      
      if (emailUser.emailGift === email) {   
        deleteCourse(email, id)
        setShow(false)
        window.location.href="/mylearning"
        handleClickVariantOk()
      } else {
        handleClickVariantWrongEmail()
      }
    } 
    
    return (
      <div className="container-course2">
      <div className="button-delete-div">
          <button className="button-delete-course" onClick={handdleDeleteCourse}><p>X</p></button>
      </div>
        <div className="title-course2"><h5>COURSE OF {name && name.toUpperCase()}</h5></div>
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
        <Modal show={show} onHide={handleClose} style={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label style={{ marginLeft: "10" }}>INSER YOUR EMAIL AND CONFIRM DELETE: </Form.Label>
            <Form.Control
              type="email"
              name="emailGift"
              onChange={handleChangeEmail}
              placeholder="email@email.com"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
          >
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={handleDeleteSubmit}
          >
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      
    );
}

function mapStateToProps (state) {
  return {
    email: state.rootReducer.user.email
  }
}



export default connect(mapStateToProps, {addDetails, setInfoVideoPlaying, deleteCourse})(TrainningCard);