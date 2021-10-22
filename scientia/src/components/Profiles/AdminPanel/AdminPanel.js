import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import './AdminPanel.css'
import { Link } from "react-router-dom";


 
const AdminSidebar = () => {   

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
            Admin Profile
          </a>
        </CDBSidebarHeader>
 
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <div>
              <Link to="/adminprofile" >
                <CDBSidebarMenuItem  icon="user">Dashboard</CDBSidebarMenuItem>
              </Link>
            </div>
            <div>
              <Link to="/adminprofile/user-management" >
                <CDBSidebarMenuItem  icon="table">User Management</CDBSidebarMenuItem>
              </Link>
            </div>
            <div>
              <Link to="/adminprofile/course-management" >
                <CDBSidebarMenuItem icon="sticky-note">Course Management</CDBSidebarMenuItem>
              </Link>
            </div>
            <div>
              <Link to="/adminprofile/statistics" >
                <CDBSidebarMenuItem icon="th">Statistics</CDBSidebarMenuItem>
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
 
export default AdminSidebar;
