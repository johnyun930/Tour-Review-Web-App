import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  CardActions,
  Button,
  Grid,
  TextField,

} from '@material-ui/core';

export default function ProfileDetail(props) {
  const { user, handleChangeUserInfo } = props;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNum, setPhoneNum] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [profile, setProfile] = React.useState('');


  useEffect(() => {
    const { username, password, phoneNum, email, profile } = user;
    setUsername(username);
    setPassword(password);
    setPhoneNum(phoneNum);
    setEmail(email);
    setProfile(profile);
  }, []);


  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    switch(name){
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'profile':
        setProfile(value);
        break;
      case 'phoneNum':
        setPhoneNum(value);
        break;
      default: return;
    }
  }

  const handleOnSaveProfile = () => {
    const entity = {
      username: username,
      password: password,
      email: email,
      profile: profile,
      phoneNum: phoneNum
    }
    handleChangeUserInfo(entity);
  }

  return (
    <Card>
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="User name"
                margin="dense"
                name="username"
                onChange={handleOnChangeInput}
                required
                value={username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                margin="dense"
                name="password"
                type="password"
                onChange={handleOnChangeInput}
                required
                value={password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                type="email"
                onChange={handleOnChangeInput}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phoneNum"
                onChange={handleOnChangeInput}
                required
                value={phoneNum}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Profile"
                multiline
                rows={10}
                margin="dense"
                name="profile"
                onChange={handleOnChangeInput}
                value={profile}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleOnSaveProfile}
          >
            Save Profile
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
