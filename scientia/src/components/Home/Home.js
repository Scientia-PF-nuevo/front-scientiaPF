
import React, { useState, useEffect } from "react";
import SearchBar from "../Search/SearchBar";
import CourseList from "../../CourseList/CourseList";
import { getAllCourses, getGenresCourses, getUsers, getUserInfo, getCart, saludo } from '../../actions/actions'
import { connect } from "react-redux";
import './Home.css';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';

export function Home({ user, getUserInfo, getAllCourses, getGenresCourses, getCart, bienvenido, login, saludo }) {

    const { enqueueSnackbar } = useSnackbar();

    const logeoCorrecto = () => {
        enqueueSnackbar(`Bienvenido ${user.firstName}!`, {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            TransitionComponent: Slide,
            variant: 'success',
        })
    }

    useEffect(() => {
        getAllCourses()
        getGenresCourses()
        user.email && getUserInfo(user.email)
        if (login) { getCart(user.email) }
        bienvenido && saludar()
    }, [])

    const saludar = () => {
        if (user.firstName !== undefined && bienvenido) {
            logeoCorrecto()
            saludo()
        }
    }

    return (
        <>
            <div className="title-home-div">
                <h1>Home</h1>
            </div>

            <div className="home-div-container">
                <SearchBar />
                <CourseList />
            </div>
        </>
    );

};

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.user,
        login: state.rootReducer.login,
        bienvenido: state.reducerForm.bienvenido
    }
}

export default connect(mapStateToProps, { getAllCourses, getGenresCourses, getUsers, getUserInfo, getCart, saludo })(Home)