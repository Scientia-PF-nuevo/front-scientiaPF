import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CarouselCourses from '../../Carousel/Carousel';
import * as actionCreators from '../../actions/actions'
import { useEffect } from 'react';
import imagen from '../../assets/onLineEducation.jpg'
import './Landing.css'

function Landing({allCourses, getAllCourses, getAllCategories, categories}) {
    useEffect(() => {
        getAllCategories();
        getAllCourses();
    }, []);

    return (
        <div className="landing-wrapper">
        <div className="title-landing-div">
            <h1>Welcome!</h1>
        </div>
        <div className="imagen-landing-div">
            <img src={imagen} alt=""/>
        </div>
        <div>
            <h3>Let´s start learning</h3>
            <CarouselCourses courses={allCourses}/>
            {
                categories.map((category, index) => {
                    let filteredCourses= allCourses.filter(course => course.categories === category.name);
                    return (
                        <div key={index}>
                            {filteredCourses.length>=1 && <div className='sub-title-landing-div'><h3>{category.name.toUpperCase()}</h3></div>}
                            <CarouselCourses courses={filteredCourses}/>
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}
function mapDispatchToProps(Landing) {
    return bindActionCreators(actionCreators, Landing)
}

function mapStateToProps(state) {
    return {
        allCourses: state.rootReducer.coursesBackup,
        categories: state.rootReducer.allCategories
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)