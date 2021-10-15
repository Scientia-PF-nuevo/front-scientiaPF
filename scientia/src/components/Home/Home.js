import React, { useEffect } from "react";
import './Home.css';
import SearchBar from "../Search/SearchBar";
import FilterBy from '../FilterBar/FilterBar'
import CourseList from "../../CourseList/CourseList";
import { getAllCourses } from '../../actions/actions'
import { connect } from "react-redux";


export function Home ({getAllCourses}) {

    useEffect(()=> {
        getAllCourses()
    }, [])


    return (
        <>
            <SearchBar />
            <FilterBy />
        <div className='home-container'>
            <CourseList />
        </div>
        </>
    );
};

export default connect(null, { getAllCourses })(Home)