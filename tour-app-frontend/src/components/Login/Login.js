import React from "react";
import {
  Grid,
  withStyles,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
  Snackbar,
  SnackbarContent,
  IconButton,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { withRouter, Redirect } from "react-router-dom";
import { styles } from './styles';
import clsx from 'clsx';
import axios from 'axios';
import { Close as CloseIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { addUserId, addUser, addAdminId } from '../../shared/actions/actions';

const TabPanel = (props) => {
  const { children, activeTab, index, ...other } = props;

  return (
    <Typography
      component="div"
      hidden={activeTab !== index}
      {...other}
    >
      <Box flexDirection="column" display="flex" p={3} width="350px" margin="auto">{children}</Box>
    </Typography>
  );
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    activeTab: 0,
    snackbarOpen: false,
    "userId":"",
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "phoneNum": "",
    "profile": "",
    isAdmin: false
  }

  onChangeHandleTabs = (e, activeTab) => {
    this.setState({ activeTab });
  }

  onClickegisterButton = e => {
    e.preventDefault();
    const { activeTab, redirectToReferrer, snackbarOpen, ...data } = this.state;
    data["userId"] = `${data.username}123`;
    const REGISTER_USER_URL = 'http://localhost:3000/create/user';
    axios({
      method: 'post',
      url: REGISTER_USER_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data
    })
    .then(r => {
      // console.log('response?', r);
      this.setState({ snackbarOpen: true })
    })
    .catch(e => console.log(e))
  }

  onClickeLoginButton = e => {
    e.preventDefault();
    const { isAdmin } = this.state;
    if (isAdmin) {
      this.renderAdminLogin();
    } else {
      this.renderUserLogin();
    }
  }

  renderUserLogin = () => {
    const { username, password } = this.state;
    // FIXME: force to make a userID
    const userId = `${username}123`;
    const LOGIN_USER_URL = 'http://localhost:3000/login/user';
    axios({
      method: 'post',
      url: LOGIN_USER_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data: {
        userId: userId,
        password: password
      }
    })
    .then(r => {
      this.props.addUserId(r.data[0].userId);
      this.props.addUser(r.data[0]);
      this.setState({ redirectToReferrer: true })
    })
    .catch(e => console.log(e))
  }

  renderAdminLogin = () => {
    const { username, password } = this.state;
    // FIXME: force to make a userID
    const adminId = `${username}123`;
    const LOGIN_ADMIN_URL = 'http://localhost:3000/login/admin';
    axios({
      method: 'post',
      url: LOGIN_ADMIN_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data: {
        adminId: adminId,
        adminpassword: password
      }
    })
    .then(r => {
      this.props.addAdminId(r.data);
      // FIXME: force to set null user
      this.props.addUserId(null);
      this.props.addUser(null);
      this.props.history.push('/admin/dashboard');
    })
    .catch(e => console.log(e))
  }

  onChangeRegisterFields = e => {
    const { name, value } = e.target;
    this.setState({[name] : value});
  }

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  }

  onPopupSnackbar = () => {
    const { classes } = this.props;
    const { snackbarOpen, username } = this.state;
    return(
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={this.handleCloseSnackbar}
      >
        <SnackbarContent
          className={clsx(classes.success)}
          message={
            <span className={classes.message}>
              Successfully Registered, hi {username}!
            </span>
          }
          action={[
            <IconButton key="close" color="inherit" onClick={this.handleCloseSnackbar}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }

  handleOnChangeAuth = (e) => {
    this.setState(prevState => ({
      isAdmin: !prevState.isAdmin
    }));
  }

  render() {
    const { classes } = this.props;
    const { redirectToReferrer, activeTab, isAdmin } = this.state
    const { from } = this.props.location.state || { from: {pathname: "/" }}
    if(redirectToReferrer === true) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <Grid container className={classes.container}>
        <div className={clsx(classes.logotypeContainer, activeTab===1 && classes.registerPhoto )}>
          <img src="https://source.unsplash.com/user/jplenio/1600x900/" alt="logo" className={classes.loginImage} />
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <div>
              <Tabs
                value={activeTab}
                onChange={this.onChangeHandleTabs}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
              >
                <Tab label="Sign In" />
                <Tab label="Register" />
              </Tabs>
            </div>
            <TabPanel activeTab={activeTab} index={0}>
              <Typography variant="h3" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h4" className={classes.subGreeting}>
                Sign In
              </Typography>
              <TextField
                label="Username"
                margin="normal"
                name="username"
                onChange={this.onChangeRegisterFields}
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                name="password"
                onChange={this.onChangeRegisterFields}
              />
               <FormGroup>
                <FormControlLabel
                  control={<Switch checked={isAdmin} onChange={this.handleOnChangeAuth} />}
                  label={!isAdmin ? 'User' : 'Admin'}
                />
              </FormGroup>
              <Button
                onClick={this.onClickeLoginButton}
                variant="contained"
                color="primary"
                size="large"
                className={classes.signInButton}
              >
                Log in
              </Button>
            </TabPanel>
            <TabPanel activeTab={activeTab} index={1}>
              <Typography variant="h3" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h4" className={classes.subGreeting}>
                Register
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <TextField
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  required
                  onChange={this.onChangeRegisterFields}
                />
                <TextField
                  label="Last Name"
                  margin="normal"
                  onChangeRegisterFields
                  name="lastName"
                  onChange={this.onChangeRegisterFields}
                />
              </Box>
              <TextField
                label="Username"
                margin="normal"
                name="username"
                onChange={this.onChangeRegisterFields}
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                name="password"
                onChange={this.onChangeRegisterFields}
              />
              <TextField
                label="email"
                type="email"
                margin="normal"
                name="email"
                onChange={this.onChangeRegisterFields}
              />
               <TextField
                label="Phone Number"
                margin="normal"
                name="phoneNum"
                onChange={this.onChangeRegisterFields}
              />
              <TextField
                label="Type your Personal Fav or anything!"
                margin="normal"
                name="profile"
                onChange={this.onChangeRegisterFields}
                multiline
                rows={3}
              />
              <Button
                onClick={this.onClickegisterButton}
                variant="contained"
                color="primary"
                size="large"
                className={classes.signInButton}
              >
                Register
              </Button>
            </TabPanel>
          </div>
        </div>
        {this.onPopupSnackbar()}
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  addUserId,
  addUser,
  addAdminId
}

// const mapStateToProps = ({ users }) => {
//   console.log('state,', users);
//   return ({
//     users
//   })
// }

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(
    withRouter(Login)
  )
);
