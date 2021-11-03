import React from 'react';
import './CreatedCourses.css';
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';


const CreatedCourses = ({shoppingHistory}) => {
  console.log(shoppingHistory, 'shopping....')

  const columns = [
    {
      title: "Id",
      field: "id"
    },
    {
      title: "Name",
      field: "name"
    },
    {
      title: "Price",
      field: "price"
    },
    {
      title: "Solds",
      field: "solds"
    },
    {
      title: "State",
      field: "state",
      lookup: { active: 'Active', rejected: 'Rejected' }
    },
    {
      title: "Admin Comments",
      field: "adminComments",
    }
  ]

  const data = shoppingHistory;

  const onClickEnable = (e) => {
    console.log('entré a onClick', e.email)
  }

  return shoppingHistory.length >= 1 ? (
      <div className="div-coursesmanagement" style={{ maxWidth: "100%" }}>
        <MaterialTable
        columns={columns}
        data={shoppingHistory}
        title="Courses"
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
            icon: MiscellaneousServicesIcon,
            tooltip: 'Enable user',
            onClick: (event, rowData) => onClickEnable(rowData)
            // (event, rowData) => window.confirm ('Has presionado editar ' + rowData.firstName)
          }
        ]}
        options={{
          filtering: false,
          search: false,
          headerStyle: {
            backgroundColor: "#655E5E",
            color: '#FFF',
            colorRendering: "white"
          },
          pageSize: 10,
          actionsColumnIndex: -1
    
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
      console.log(state.rootReducer, 'root')

    return {
      shoppingHistory: state.rootReducer.userInfo.uploadedCourses
      
    }
  };


  export default connect(mapStateToProps, null)(CreatedCourses)