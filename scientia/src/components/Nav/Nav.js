import React from "react";
import './Nav.css';
import { Link } from "react-router-dom";
import CustomizedBadges from "../Cart/customCart";
import { connect } from 'react-redux'
import { Avatar } from '@mui/material';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../../actions/actions'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';

// Logo
// import logo from '../../images/icon.png';

function Nav(props) {
    const imagenPerfil = props.user.photoURL


    if (props.user.firstName) {
        let inicialNombre = props.user.firstName[0]
        let inicialApellido = props.user.lastName[0]
        var iniciales = inicialNombre + inicialApellido
    }

    function desconectarse() {
        props.clearCart()
        props.logout()
        deslogeo()
    }

    const { enqueueSnackbar } = useSnackbar();

    const deslogeo = () => {
        enqueueSnackbar(`Hasta la próxima ${props.user.firstName}!`, {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
            },
            TransitionComponent: Slide,
            variant: 'info',
        })
    }

    return (
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static" style={{ background: '#8d749e' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
              <Link className="linkNav" to="/home">
                <li className="liNav">Home</li>
              </Link>
              {props.user.firstName ? (
                <Link className="linkNav" to="/form">
                  <li className="liNav">Add Course</li>
                </Link>
              ) : (
                <></>
              )}
              {props.user.firstName ? (
                <Link className="linkNav" to="/mylearning">
                  <li className="liNav">My learning</li>
                </Link>
              ) : (
                <></>
              )}
              {
                <Link className="linkNav" to="/cart">
                  <li className="liNav">
                    <CustomizedBadges />
                  </li>
                </Link>
              }
              {props.user.firstName ? (
                <Link className="linkNav" to="/home">
                  <li className="liNav" onClick={desconectarse}>
                    Log Out
                  </li>
                </Link>
              ) : (
                <Link className="linkNav" to="/login">
                  <li className="liNav">Sign in</li>
                </Link>
              )}
              {props.img && props.login === true ? (
                <Link className="linkNav" to="/userprofile">
                  <li className="liNav">
                    <Avatar alt="" src={props.img} />
                  </li>
                </Link>
              ) : props.user.photoURL ? (
                <Link className="linkNav" to="/userprofile">
                  <li className="liNav">
                    <Avatar alt="" src={imagenPerfil} />
                  </li>
                </Link>
              ) : props.user.firstName ? (
                <Link className="linkNav" to="/userprofile">
                  <li className="liNav">
                    <Avatar sx={{ bgcolor: "orange" }}>{iniciales}</Avatar>
                  </li>
                </Link>
              ) : (
                <></>
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav)