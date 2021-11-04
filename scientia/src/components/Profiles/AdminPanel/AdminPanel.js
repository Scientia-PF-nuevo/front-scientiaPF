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
      <div className="div-app-admin">
      <Route path='/userprofile'>
          <AdminSidebar />
        </Route>

        <Route exact path='/userprofile'>
          <AdminDashboard />
        </Route>

        <Route exact path='/userprofile/user-management'>
          <UserManagement />
        </Route>

        <Route exact path='/userprofile/course-management'>
          <CourseManagement />
        </Route>

        <Route exact path='/userprofile/statistics'>
          <Statistics />
        </Route>
      </div>
    </Router>
    </div>
  );
}

export default AdminPanel;