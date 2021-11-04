import React from 'react';
import './Statistics.css';
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AppsIcon from '@mui/icons-material/Apps';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { element } from 'prop-types';

const UserManagement = ({info}) => {

  const solds  = info.allCourses.map( course => {return course.solds})
 
  let suma = 0;
    solds.forEach (function(sold){
        suma += sold;
    });

  return info.users.length >= 1 ? (
      <div className="div-adminstatistics">
        <div className="box-statistics-admin">
          <div className="box-value-statistics-admin">
            <div className="value-statistics-admin">{info.users.length}</div>
          </div>
          <PeopleAltIcon fontSize="large"/>
          <div className="text-statistics-admin">Users </div>
        </div>
        <div className="box-statistics-admin">
          <div className="box-value-statistics-admin">
            <div className="value-statistics-admin">{info.allCourses.length}</div>
          </div>
          <LibraryBooksIcon fontSize="large" />
          <div className="text-statistics-admin">Courses</div>
        </div>
        <div className="box-statistics-admin">
          <div className="box-value-statistics-admin">
            <div className="value-statistics-admin">{info.allCategories.length}</div>
          </div>
          <AppsIcon fontSize="large" />
          <div className="text-statistics-admin">Categories</div>
        </div>
        <div className="box-statistics-admin">
          <div className="box-value-statistics-admin">
            <div className="value-statistics-admin">{suma}</div>
          </div>
          <PointOfSaleIcon fontSize="large" />
          <div className="text-statistics-admin">Solds Courses</div>
        </div>
      </div>
    ) : (
    <div className="div-adminstatistics">
      <CircularProgress disableShrink />
    </div>
  );
}

    const mapStateToProps = (state) => {
    return {
        info: state.rootReducer
    }
  };


  export default connect(mapStateToProps, null)(UserManagement)