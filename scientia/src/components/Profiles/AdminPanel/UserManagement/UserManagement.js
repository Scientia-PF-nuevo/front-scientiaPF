import React, {useState} from 'react';
import axios from 'axios';
import './UserManagement.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../../../actions/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CircularProgress from '@mui/material/CircularProgress';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';



const UserManagement = ({users}) => {
  const dispatch = useDispatch();


    
  const columns = [
    {
      title: "First Name",
      field: "firstName"
    },
    {
      title: "Last Name",
      field: "lastName"
    },
    {
      title: "Email",
      field: "email"
    },
    {
      title: "Status",
      field: "active",
      lookup: { true: 'Enable', false: 'Disable' }
    },
    {
      title: "User Type",
      field: "isAdmin",
      lookup: { true: 'Admin', false: 'User' }
    }
  ]

 

  const onClickEnable = (email) => {
    const isAdmin = {isAdmin: "true"}

    confirmAlert({
      title: 'Confirm to continue',
      message: 'Activate user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => 
          {
            await axios.put(`/admin/ban/${email}`, isAdmin);
            dispatch(getUsers());
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const onClickDesable = (email) => {
    const isAdmin = {isAdmin: "false"}

    confirmAlert({
      title: 'Confirm to continue',
      message: 'Suspend user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => 
          {
            await axios.put(`/admin/ban/${email}`, isAdmin);
            dispatch(getUsers());
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const onClickAdmin = (email) => {
    const isAdmin = {isAdmin: "true"}

    confirmAlert({
      title: 'Confirm to continue',
      message: 'Promote this user to admin?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => 
          {
            await axios.put(`/admin/promote/${email}`, isAdmin);
            dispatch(getUsers());
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  return users.length >= 1 ? (
      <div className="div-usermanagement" style={{ maxWidth: "100%" }}>
        <MaterialTable
        columns={columns}
        data={users}
        title="Users"
        icons={{
          ResetSearch: ClearIcon,
          Filter: FilterListIcon,
          Search: SearchIcon,
          ViewColumn: ViewColumnIcon,
          FirstPage:  FirstPageIcon,
          LastPage:  LastPageIcon,
          NextPage:  ChevronRightIcon,
          PreviousPage: ChevronLeftIcon,
          SortArrow: ArrowDownward
        }}
        actions={[
          {
            icon: PersonIcon,
            tooltip: 'Enable user',
            onClick: (event, rowData) => onClickEnable(rowData.email)
            // (event, rowData) => window.confirm ('Has presionado editar ' + rowData.firstName)
          },
          {
            icon: PersonOffIcon,
            tooltip: 'Disable user',
            onClick: (event, rowData) => onClickDesable(rowData.email)
          },
          {
            icon: MilitaryTechIcon,
            tooltip: 'Promote administrator',
            onClick: (event, rowData) => onClickAdmin(rowData.email)
          }
        ]}
        options={{
          search: true,
          headerStyle: {
            backgroundColor: "#53A6B7",
            color: '#FFF',
            colorRendering: "white"
          },
          pageSize: 10
    
      }
        
      }
        />
      </div>
    ) : (
    <div className="div-usermanagement">
      <CircularProgress disableShrink />
      <div className="div-usermanagement" style={{ maxWidth: "100%" }}>
        <MaterialTable
        className="table"
        columns={columns}
        data={users}
        title="Users"
        icons={{
          ResetSearch: ClearIcon,
          Filter: FilterListIcon,
          Search: SearchIcon,
          ViewColumn: ViewColumnIcon,
          FirstPage:  FirstPageIcon,
          LastPage:  LastPageIcon,
          NextPage:  ChevronRightIcon,
          PreviousPage: ChevronLeftIcon,
          SortArrow: ArrowDownward
        }}
        actions={[
          {
            icon: PersonIcon,
            tooltip: 'Enable user',
            onClick: (event, rowData) => onClickEnable(rowData)
            // (event, rowData) => window.confirm ('Has presionado editar ' + rowData.firstName)
          },
          {
            icon: PersonOffIcon,
            tooltip: 'Disable user',
            onClick: (event, rowData) => onClickDesable(rowData)
          },
          {
            icon: MilitaryTechIcon,
            tooltip: 'Promote administrator',
            onClick: (event, rowData) => onClickAdmin(rowData)
          }
        ]}
        options={{
          filtering: true,
          search: true,
          headerStyle: {
            backgroundColor: "#53A6B7",
            color: '#FFF',
            colorRendering: "white"
          },
          pageSize: 10
    
      }
        
      }
        />
      </div>
    </div>
  );
}

    const mapStateToProps = (state) => {
      
    return {
        users: state.rootReducer.users
    }
  };


  export default connect(mapStateToProps, null)(UserManagement)