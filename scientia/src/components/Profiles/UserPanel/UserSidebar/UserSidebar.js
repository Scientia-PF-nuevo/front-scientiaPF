import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import './UserSidebar.css'
import { Link } from "react-router-dom";


 
const UserSidebar = () => {   

  return (
      
    <div className="div-sidebar">
    <div>
      <CDBSidebar textColor="#fff" backgroundColor="#333" >
        <CDBSidebarHeader >
          <a
            href="#"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            User Profile
          </a>
        </CDBSidebarHeader>
 
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
              <div>
            <Link to="/userprofile" >
              <CDBSidebarMenuItem  icon="user">Dashboard</CDBSidebarMenuItem>
            </Link>
            </div>
            <div>
            <Link to="/userprofile/my-profile" >
              <CDBSidebarMenuItem icon="sticky-note">My profile</CDBSidebarMenuItem>
              </Link>
            </div>
            <div>
            <Link to="/userprofile/shopping-history" >
              <CDBSidebarMenuItem  icon="table">Shopping history</CDBSidebarMenuItem>
            </Link>
            </div>
            <div>
            <Link to="/userprofile/created-courses" >
              <CDBSidebarMenuItem  icon="table">Created Courses</CDBSidebarMenuItem>
            </Link>
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>
 
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div> 
    
    </div>
  );
};
 
export default UserSidebar;
