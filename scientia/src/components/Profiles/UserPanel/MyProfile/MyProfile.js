import React from 'react';
import './MyProfile.css';
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const MyProfile = ({userInfo, photo}) => {

  return userInfo ? (
      <div className="div-userinfo">
        <div className="subdiv">
              
         <h2>Profile</h2>
          <div className="div-in">
            <Avatar className="avatar" src={photo} sx={{ width: 200, height: 200, bgcolor: 'orange', fontSize: 100,  }}></Avatar>
            <Box
              className="box"
              component="form"
              noValidate
              sx={{
                display: 'grid',
                gridTemplateColumns: { sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  First Name
                </InputLabel>
                <BootstrapInput defaultValue={userInfo.firstName} id="bootstrap-input" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Last Name
                </InputLabel>
                <BootstrapInput defaultValue={userInfo.lastName} id="bootstrap-input" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Email
                </InputLabel>
                <BootstrapInput defaultValue={userInfo.email} id="bootstrap-input" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Phone
                </InputLabel>
                <BootstrapInput defaultValue={userInfo.phone} id="bootstrap-input" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Country
                </InputLabel>
                <BootstrapInput defaultValue={userInfo.country} id="bootstrap-input" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Province
                </InputLabel>
                <BootstrapInput defaultValue={userInfo.province} id="bootstrap-input" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  City
                </InputLabel>
                <BootstrapInput defaultValue={userInfo.city} id="bootstrap-input" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Postal Code
                </InputLabel>
                <BootstrapInput defaultValue={userInfo.postalcode} id="bootstrap-input" />
              </FormControl>
            </Box>
          </div>
          </div>
      </div>
    ) : (
    <div className="div-userinfo">
      <CircularProgress disableShrink />
    </div>
  );
}

    const mapStateToProps = (state) => {
    return {
      userInfo: state.rootReducer.userInfo,
      photo: state.rootReducer.user.photoURL
    }
  };


  export default connect(mapStateToProps, null)(MyProfile)