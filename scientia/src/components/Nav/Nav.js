import React from "react";
import './Nav.css';
import { Link } from "react-router-dom";
import CustomizedBadges from "../Cart/customCart";
import { connect, useDispatch } from 'react-redux'
import { Avatar } from '@mui/material';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../../actions/actions'
import { clearReduxer } from './../../actions/actions'
import { Navbar, Container, Nav } from 'react-bootstrap'
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';

import sc from '../../images/sc.png';

function Navegacion(props) {
  const imagenPerfil = props.user.photoURL
  const dispatch = useDispatch()


  if (props.user.firstName) {
    let inicialNombre = props.user.firstName[0]
    let inicialApellido = props.user.lastName[0]
    var iniciales = inicialNombre + inicialApellido
  }

  function desconectarse(e) {
    e.preventDefault()
    dispatch(clearReduxer())
    props.clearCart()
    props.logout()
    deslogeo()
  }

  const { enqueueSnackbar } = useSnackbar();

  const deslogeo = () => {
    enqueueSnackbar(`Hasta la próxima ${props.user.firstName}!`, {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      TransitionComponent: Slide,
      variant: 'info',
    })
  }

  return (
    <div className="navigation">
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Navbar.Brand>
            <Link to="/">
              {/* <ControlCameraIcon /> */}
              <img className='imagenNav' src={sc} alt='logo scientia' />
              {/* <li className="liNav">SCientia</li> */}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav >
              <Nav.Link className="elMenu" href="/home">Home</Nav.Link>
              {props.login && <Nav.Link className="elMenu" href="/addCourses_step_1">Add Course</Nav.Link>}
              {props.login && <Nav.Link className="elMenu" href="/mylearning">My Learning</Nav.Link>}
              <Nav.Link href="/cart"><CustomizedBadges /></Nav.Link>
              {!props.login && <Nav.Link className="elMenu" href="/signup">Sign Up</Nav.Link>}
              {props.login ?
                <Nav.Link className="elMenu" href="/">
                  <li onClick={(e) => desconectarse(e)}>
                    Log Out
                  </li></Nav.Link>
                :
                <Nav.Link className="elMenu" href="/login">Sign In</Nav.Link>
              }
              <Link to="/userprofile">
                {
                  props.img && props.login ?
                    <li className="liNav">
                      <Avatar alt="imagen de perfil" src={props.img} />
                    </li>
                    : props.user.photoURL ?
                      <li className="liNav">
                        <Avatar alt="" src={imagenPerfil} />
                      </li>
                      : props.user.firstName &&
                      <li className="liNav">
                        <Avatar sx={{ bgcolor: "orange" }}>{iniciales}</Avatar>
                      </li>
                }
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};


function mapStateToProps(state) {
  return {
    login: state.rootReducer.login,
    user: state.rootReducer.user,
    img: state.rootReducer.userInfo.profilePicture
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navegacion)