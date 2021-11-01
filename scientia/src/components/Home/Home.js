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

        <div className="home-div-container">
            <SearchBar />
                <CourseList />
            <ToastContainer className={`p-3 ${s.mensaje}`} position={'top-start'}>
                <Toast className={s.mensaje} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Inico de Sesión</strong>
                    </Toast.Header>
                    <Toast.Body>{`Bienvenido ${user.firstName}!`}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>

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