import React, { useEffect, useState } from 'react'
import LocationCard from './Components/LocationCard';
import LocationTable from './Components/LocationTable';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import AdminSnackbar from './Components/AdminSnackbar';
import UserTable from './Components/UserTable';

const Admin = (props) => {
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    async function fetchUsersAndLocations() {
      await fetchLocations();
      await fetchUsers();
    }
    fetchUsersAndLocations();

  }, []);

  const fetchLocations = () => {
    const FETCH_LOCATION_URL = `http://localhost:3000/get/location`;
    axios.get(FETCH_LOCATION_URL)
    .then(res => {
      setLocations(res.data)
    })
    .catch(err => {
      console.log('error occured,', err);
    })
  }

  const fetchUsers = () => {
    const FETCH_USER_URL = `http://localhost:3000/get/user`;
    axios.get(FETCH_USER_URL)
    .then(res => {
      setUsers(res.data)
    })
    .catch(err => {
      console.log('error occured,', err);
    })
  }

  const handleSaveLocation = (data) => {
    console.log('will be saved loc? ',data);
    const CREATE_LOCATION_URL = 'http://localhost:3000/create/location';
    axios({
      method: 'post',
      url: CREATE_LOCATION_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data
    })
    .then(r => {
      setOpenSnackbar(true);
      setLocations([...locations, data]);
    })
    .catch(e => console.log(e))
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const renderUpdateSnackbar = () => {
    return (
      <AdminSnackbar
        open={openSnackbar}
        closeSnackbar={handleCloseSnackbar}
      />
    )
  }

  return (
    <Grid container spacing={4}>
      <Grid item lg={5} md={5} xl={5} xs={12}>
        <LocationCard handleSaveLocation={handleSaveLocation} />
      </Grid>
      <Grid item lg={7} md={7} xl={7} xs={12}>
        <UserTable users={users}/>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <LocationTable locations={locations}/>
      </Grid>
      {renderUpdateSnackbar()}
    </Grid>
  )
}

const mapStateToProps = state => ({
  adminId: state.users.adminId
});

export default connect(mapStateToProps, null)(Admin);
