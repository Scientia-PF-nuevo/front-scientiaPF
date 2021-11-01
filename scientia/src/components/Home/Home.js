import React, { useState, useEffect } from "react";
import SearchBar from "../Search/SearchBar";
import CourseList from "../../CourseList/CourseList";
import { getAllCourses, getGenresCourses, getUsers, getUserInfo, getCart, bienvenido } from '../../actions/actions'
import { connect } from "react-redux";
import './Home.css';

export function Home({ user, getUserInfo, getAllCourses, getGenresCourses, getUsers, getCart, bienvenido, login }) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        getAllCourses()
        getGenresCourses()
        user.email && getUserInfo(user.email)
        if (login) {getCart(user.email)}
        !user.bienvenido && saludar()
    }, [])

    const saludar = () => {
        setShow(true)
        bienvenido()
    }

    return (
        <div>
        <div className="title-home-div">
            <h1>Home</h1>
        </div>
        <div className="home-div-container">
            <SearchBar />
            <CourseList />
        </div>
        </div>
    );

};

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.user,
        login: state.rootReducer.login
    }
}

export default connect(mapStateToProps, { getAllCourses, getGenresCourses, getUsers, getUserInfo, getCart, bienvenido })(Home)