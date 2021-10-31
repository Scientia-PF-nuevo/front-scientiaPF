import React, { useState, useEffect } from "react";
import s from './Home.module.css';
import SearchBar from "../Search/SearchBar";
import CourseList from "../../CourseList/CourseList";
import { getAllCourses, getGenresCourses, getUsers, getUserInfo, getCart, bienvenido } from '../../actions/actions'
import { connect } from "react-redux";
import { Row, Col, Toast, ToastContainer } from 'react-bootstrap'

export function Home({ user, getUserInfo, getAllCourses, getGenresCourses, getUsers, getCart, bienvenido }) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        getAllCourses()
        getGenresCourses()
        user.email && getUserInfo(user.email)
        getCart(user.email)
        !user.bienvenido && saludar()
    }, [])

    const saludar = () => {
        setShow(true)
        bienvenido()
    }

    return (
        <>

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

            <SearchBar />
            <div className={s.homeContainer}>
                <CourseList />
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.user
    }
}

export default connect(mapStateToProps, { getAllCourses, getGenresCourses, getUsers, getUserInfo, getCart, bienvenido })(Home)