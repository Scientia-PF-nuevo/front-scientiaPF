import React from 'react';
import './CreatedCourses.css';
import { connect } from 'react-redux'



const CreatedCourses = ({shoppingHistory}) => {

  return shoppingHistory.length >= 1 ? (
      <div className="div-mycourses" style={{ width: 1060 }}>
         
      </div>
    ) : (
    <div className="div-mycourses">
      
    </div>
  );
}

    const mapStateToProps = (state) => {

    return {
      shoppingHistory: state.rootReducer.userInfo.uploadedCourses
      
    }
  };


  export default connect(mapStateToProps, null)(CreatedCourses)