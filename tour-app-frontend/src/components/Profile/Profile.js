import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import ProfileDetail from './ProfileDetail';
import { connect } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../shared/actions/actions';
import ProfileSnackbar from './ProfileSnackbar';
import AccessDeniedDialog from '../Global/AccessDeniedDialog';

const Profile = (props) => {
  const { user } = props;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChangeUserInfo = (entity) => {
    const data = { ...user, ...entity };
    const UPDATE_USER_URL = `http://localhost:3000/update/user/${user.userId}`;
    axios({
      method: 'put',
      url: UPDATE_USER_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data
    })
    .then(r => {
      fetchUpdatedUser();
    })
    .catch(e => console.log(e))
  }

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  }

  const renderProfileDialog = () => {
    return (
      <ProfileSnackbar
        open={openSnackbar}
        closeSnackbar={closeSnackbar}
      />
    );
  }

  const fetchUpdatedUser = () => {
    const FETCH_USER = `http://localhost:3000/get/user/${user.userId}`
    const { addUser } = props;
    axios.get(FETCH_USER)
    .then(res => {
      addUser(res.data[0]);
      setOpenSnackbar(true);
    })
    .catch(err => {
      console.log('error occured,', err);
    })
  }

  if(!props.user) {
    return (
      <AccessDeniedDialog />
    );
  }

  return (
    <div>
      <Grid container spacing={4}>
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <ProfileCard user={user} handleChangeUserInfo={handleChangeUserInfo}/>
      </Grid>
      <Grid item lg={8} md={6} xl={8} xs={12}>
        <ProfileDetail user={user} handleChangeUserInfo={handleChangeUserInfo} />
      </Grid>
      </Grid>
      {renderProfileDialog()}
    </div>
  )
}

const mapDispatchToProps = {
  addUser
}

const mapStateToProps = state => ({
  user: state.users.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
