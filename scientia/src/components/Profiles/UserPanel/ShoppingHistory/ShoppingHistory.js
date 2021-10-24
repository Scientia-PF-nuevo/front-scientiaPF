import React from 'react';
import './ShoppingHistory.css';
import { connect } from 'react-redux'

import SnackbarContent from '@mui/material/SnackbarContent';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const ShoppingHistory = ({shoppingHistory}) => {

  console.log('estoy en shopping')
  return shoppingHistory.length >= 1 ? (
      <div className="div-mycourses" style={{ width: 1060 }}>
         <div id="global">
          <div id="mensajes">
          {shoppingHistory.map((shoppingHistory, index) => (
              <SnackbarContent className="snack" message={shoppingHistory.name}  action={"Price: $" + shoppingHistory.price }/>
          ))}
          </div>
        </div>
      </div>
    ) : (
    <div className="div-mycourses">
      <Alert className="alert" severity="info">
        <AlertTitle>You have not bought courses yet</AlertTitle>
        Animate and start learning.
      </Alert>
    </div>
  );
}

    const mapStateToProps = (state) => {
    return {
      shoppingHistory: state.rootReducer.userInfo.coursesAndData
    }
  };


  export default connect(mapStateToProps, null)(ShoppingHistory)