import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CarouselCourses from '../../Carousel/Carousel';
import * as actionCreators from './../../actions/actions'
import { useEffect } from 'react';

function Landing({allCourses, getAllCourses}) {
    useEffect(() => {
        getAllCourses();
    }, []);
    return (
        <div>
            <CarouselCourses courses={allCourses}/>
        </div>
    )
}
function mapDispatchToProps(Landing) {
    return bindActionCreators(actionCreators, Landing)
}

function mapStateToProps(state) {
    return {
        allCourses: state.rootReducer.allCourses
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)