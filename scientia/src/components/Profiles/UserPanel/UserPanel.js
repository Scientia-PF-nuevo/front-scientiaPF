import React from 'react';
import './UserPanel.css';

// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import UserSidebar from './UserSidebar/UserSidebar';
import Dashboard from './Dashboard/Dashboard';
import ShoppingHistory from './ShoppingHistory/ShoppingHistory';
import MyProfile from './MyProfile/MyProfile';
import CreatedCourses from './CreatedCourses/CreatedCourses';

function UserPanel () {
  return (
    <div>
    <div className="title-userProfile-div">
      <h1>My Profile</h1>
    </div>
    <div className='container-app'>
    <Router>
      <div className="div-app">
        <Route path='/userprofile'>
          <UserSidebar />
        </Route>

        <Route exact path='/userprofile'>
          <Dashboard />
        </Route>

        <Route exact path='/userprofile/my-profile'>
          <MyProfile />
        </Route>

        <Route exact path='/userprofile/shopping-history'>
          <ShoppingHistory />
        </Route>

        {/* <Route exact path='/userprofile/created-courses'>
          <CreatedCourses />
        </Route> */}
      </div>
    </Router>
    </div>
    </div>
  );
}

export default UserPanel;
