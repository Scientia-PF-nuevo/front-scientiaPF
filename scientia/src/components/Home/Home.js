import React, { useEffect } from "react";
import './Home.css';
import SearchBar from "../Search/SearchBar";
import CourseList from "../../CourseList/CourseList";
import { getAllCourses, getGenresCourses, getUsers } from '../../actions/actions'
import { connect } from "react-redux";
import Sidebar from "../Side/Side";


export function Home ({getAllCourses, getGenresCourses, getUsers}) {

    useEffect(()=> {
        getAllCourses()
        getGenresCourses()
        getUsers()
    }, [])


    return (
        <>
            <SearchBar />
            {/* <Sidebar /> */}
        <div className='home-container'>
            <CourseList />
        </div>
        </>
    );
};

export default connect(null, { getAllCourses, getGenresCourses, getUsers })(Home)