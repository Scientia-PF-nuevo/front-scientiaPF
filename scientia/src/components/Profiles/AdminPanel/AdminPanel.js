import React from 'react';
import './AdminPanel.css'

// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import AdminSidebar from './AdminSidebar/AdminSidebar';
import AdminDashboard from './Dashboard/AdminDashboard';
import UserManagement from './UserManagement/UserManagement';
import CourseManagement from './CourseManagement/CourseManagement';
import Statistics from './Statistics/Statistics';

function AdminPanel () {
  return (
    <div className='container-app-admin'>
    <Router>
      <div className="div-app">
      <Route path='/adminprofile'>
          <AdminSidebar />
        </Route>

        <Route exact path='/adminprofile'>
          <AdminDashboard />
        </Route>

        <Route exact path='/adminprofile/user-management'>
          <UserManagement />
        </Route>

        <Route exact path='/adminprofile/course-management'>
          <CourseManagement />
        </Route>

        <Route exact path='/adminprofile/statistics'>
          <Statistics />
        </Route>
      </div>
    </Router>
    </div>
  );
}

export default AdminPanel;




{/* <div className="div-app">
        <Route path='/userprofile'>
          <Sidebar />
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
      </div> */}