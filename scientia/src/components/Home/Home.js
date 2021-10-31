import React, { useEffect } from "react";
import s from './Home.module.css';
import SearchBar from "../Search/SearchBar";
import CourseList from "../../CourseList/CourseList";
import { getAllCourses, getGenresCourses, getUsers, getUserInfo, getCart, saludo } from '../../actions/actions'
import { connect } from "react-redux";
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';

export function Home({ user, getUserInfo, getAllCourses, getGenresCourses, getCart, bienvenido, login, saludo }) {

    const { enqueueSnackbar } = useSnackbar();

    const logeoCorrecto = () => {
        enqueueSnackbar(`Bienvenido ${user.firstName}!`, {
            anchorOrigin: {
                vertical: 'top',
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
        console.log(bienvenido)
    }, [])

    const saludar = () => {
        if(user.firstName !== undefined && bienvenido) {
            logeoCorrecto()
            saludo()
        }
    }

    return (
        <>
            <SearchBar />
            <div className={s.homeContainer}>
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