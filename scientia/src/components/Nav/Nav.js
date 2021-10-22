import React from "react";
import './Nav.css';
import { Link } from "react-router-dom";
import CustomizedBadges from "../Cart/customCart";
import { connect } from 'react-redux'
import { Avatar } from '@mui/material';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../../actions/actions'

// Logo
// import logo from '../../images/icon.png';

function Nav(props) {
    const imagenPerfil = props.user.photoURL
    
    if (props.user.displayName) {
        let inicialNombre = props.user.displayName.split(' ')[0][0]
        let inicialApellido = props.user.displayName.split(' ')[1][0]
        var iniciales = inicialNombre + inicialApellido
    }

    
    return (
        <div className='container'>
            <div className='containLogo'>
                {/* <Link to='/home'>
                    <img className='logoNav' src={logo} alt='logo Scientia' />
                </Link> */}
            </div>
            <nav className='containerNav'>
                <div className='containLi'>
                    <Link className='linkNav' to='/home'>
                        <li className='liNav'>
                            Home
                        </li>
                    </Link>
                    {
                        props.user.displayName ?
                            <Link className='linkNav' to='/form'>
                                <li className='liNav'>
                                    Add Course
                                </li>
                            </Link>
                            :
                            <></>
                    }
                    {
                        props.user.displayName ?
                            <Link className='linkNav' to='/mylearning'>
                                <li className='liNav'>
                                    My learning
                                </li>
                            </Link>
                            :
                            <></>
                    }
                    <Link className='linkNav' to='/cart'>
                        <li className='liNav'>
                            <CustomizedBadges />
                        </li>
                    </Link>
                    {
                        props.user.displayName ?
                            <Link className='linkNav' to='/home'>
                                <li className='liNav' onClick={props.logout} >
                                    Log Out
                                </li>
                            </Link>
                            :
                            <Link className='linkNav' to='/login'>
                                <li className='liNav'>
                                    Sign in
                                </li>
                            </Link>
                    }
                    {
                        props.user.photoURL ?
                            <Link className='linkNav' to='/userprofile'>
                                <li className='liNav'>
                                    <Avatar alt="" src={imagenPerfil} />
                                </li>
                            </Link>
                            :
                            props.user.displayName ?
                                <Link className='linkNav' to='/userprofile'>
                                    <li className='liNav'>
                                        <Avatar sx={{ bgcolor: 'orange' }}>{iniciales}</Avatar>
                                    </li>
                                </Link>
                                :
                                <></>
                    }

                </div>
            </nav>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        login: state.rootReducer.login,
        user: state.rootReducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)