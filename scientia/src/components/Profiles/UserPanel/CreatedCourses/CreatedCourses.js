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
import CommentIcon from '@mui/icons-material/Comment';
import { confirmAlert } from 'react-confirm-alert';


const CreatedCourses = ({courses}) => {
  
  console.log(courses, 'shopping....')
  const data = courses.uploadedCourses;
  const rejected = courses.rejectedCourses[0]

  const onClickEnable = (e) => {

    if (e.state === "rejected") {
      let ac = ""
      for (let i = 0; i < rejected.length; i++) {
        if (rejected[i].id === e.id) {
          ac = rejected[i].adminComments
        }
      }

      confirmAlert({
        title: "Admin Comments",
        message: ac,
        buttons: [
          {
            label: 'Ok',
            onClick: async () => 
            {
            }
          }
        ]
      });
    } else if (e.state === "active") {
      confirmAlert({
        title: "Approved",
        message: "No comments from the administrator",
        buttons: [
          {
            label: 'Ok',
            onClick: async () => 
            {
            }
          }
        ]
      });
    } else {
      confirmAlert({
        title: "Pending approval",
        message: "No administrator comments yet",
        buttons: [
          {
            label: 'Ok',
            onClick: async () => 
            {
            }
          }
        ]
      });
    }
  }

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
      lookup: { active: 'Active', pendingToApprove: "Pending to approve", rejected: "Rejected" }
    }
  ]


  return data.length >= 1 ? (
      <div className="div-coursesmanagement" style={{ maxWidth: "100%" }}>
        <MaterialTable
        columns={columns}
        data={data}
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
            icon: CommentIcon,
            tooltip: 'Enable user',
            onClick: (event, rowData) => onClickEnable(rowData)
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
    return {
      courses: state.rootReducer.userInfo
      
    }
  };


  export default connect(mapStateToProps, null)(CreatedCourses)