import React, { useEffect } from "react";
import './Home.css';
import SearchBar from "../Search/SearchBar";
import CourseList from "../../CourseList/CourseList";
import { getAllCourses, getGenresCourses, getUsers,getUserInfo } from '../../actions/actions'
import { connect } from "react-redux";
import Carousel from '../../Carousel/Carousel'


export function Home ({user,getUserInfo, getAllCourses, getGenresCourses, getUsers}) {

    useEffect(()=> {
        getAllCourses()
        getGenresCourses()
        getUsers()
        getUserInfo(user.email)
    }, [])


    return (
        <>
        {/* <Carousel/> */}
            <SearchBar />
        <div className='home-container'>
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

export default connect(mapStateToProps, { getAllCourses, getGenresCourses, getUsers, getUserInfo })(Home)