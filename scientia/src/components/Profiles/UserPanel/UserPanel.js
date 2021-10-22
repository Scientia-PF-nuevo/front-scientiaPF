import React from 'react';
import './UserPanel.css';

// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import UserSidebar from './UserSidebar/UserSidebar';
import Dashboard from './Dashboard/Dashboard';
import MyCourses from './MyCourses/MyCourses';
import MyFavorites from './MyFavorites/MyFavorites';

function UserPanel () {
  return (
    <div className='container-app'>
    <Router>
      <div className="div-app">
        <Route path='/userprofile'>
          <UserSidebar />
        </Route>

        <Route exact path='/userprofile'>
          <Dashboard />
        </Route>

        <Route exact path='/userprofile/mycourses'>
          <MyCourses />
        </Route>

        <Route exact path='/userprofile/myfavorites'>
          <MyFavorites />
        </Route>
      </div>
    </Router>
    </div>
  );
}

export default UserPanel;
