import React from 'react'
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));


export default function SidebarProfile(props) {
  const classes = useStyles();
  const { user, adminId } = props;
  const rednerUserAvatar = (user) => {
    return (
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.photo && user.photo }
        to="/app/profile"
      >
        {user && user.photo ? '' : user.firstName.substring(0,2)}
      </Avatar>
    )
  }

  const renderGuestAvatar = () => {
    return (
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
    )
  }

  if (adminId) {
    return (
      <div className={classes.root}>
      {renderGuestAvatar()}
       <Typography
        className={classes.name}
        variant="h6"
        gutterBottom={true}
        color='primary'
      >
        Admin
      </Typography>
    </div>
    )
  }

  return (
    <div className={classes.root}>
      {
        user
        ? rednerUserAvatar(user)
        : renderGuestAvatar()
      }
       <Typography
        className={classes.name}
        variant="h6"
        gutterBottom={true}
        color='primary'
      >
        {
          user
          ? `${user.firstName} ${user.lastName}`
          : "guest"
        }
      </Typography>
      <Typography variant="body2">
        {
          user
          ? `${user.firstName} ${user.lastName}`
          : ""
        }
        {
          user
          ? user.profile
          : ""
        }
      </Typography>
    </div>
  )
}
