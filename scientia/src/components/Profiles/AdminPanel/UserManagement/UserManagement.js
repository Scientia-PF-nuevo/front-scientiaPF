import React from 'react';
import './UserManagement.css';
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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

  const data = users;

  const onClickEnable = (e) => {
    console.log('entré a onClick', e.email)
  }

  const onClickDesable = (e) => {
    console.log('entré a onClick', e.email)
  }

  const onClickAdmin = (e) => {
    console.log('entré a onClick', e.email)
    window.confirm ('Promote administrator ' + e.firstName + ' ?')
    console.log(window.confirm, 'win confirm')
  }

  if (users.length === 1) {
    var arrUsers = []
    arrUsers.push(users)
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
    ) : (
    <div className="div-usermanagement">
      <CircularProgress disableShrink />
    </div>
  );
}

    const mapStateToProps = (state) => {
      console.log(state.rootReducer.users)
    return {
        users: state.rootReducer.users
    }
  };


  export default connect(mapStateToProps, null)(UserManagement)