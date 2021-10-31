import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CarouselCourses from '../../Carousel/Carousel';
import * as actionCreators from './../../actions/actions'
import { useEffect } from 'react';

function Landing({allCourses, getAllCourses, getAllCategories, categories}) {
    useEffect(() => {
        getAllCategories();
        getAllCourses();
    }, []);
    console.log(categories)
    return (
        <div>
            <h3>Todos los cursos</h3>
            <CarouselCourses courses={allCourses}/>
            {
                categories.map((category, index) => {
                    let filteredCourses= allCourses.filter(course => course.categories === category.name);
                    return (
                        <div key={index}>
                            {filteredCourses.length>=1&&<h3>{category.name}</h3>}
                            <CarouselCourses courses={filteredCourses}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
function mapDispatchToProps(Landing) {
    return bindActionCreators(actionCreators, Landing)
}

function mapStateToProps(state) {
    return {
        allCourses: state.rootReducer.allCourses,
        categories: state.rootReducer.allCategories
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)