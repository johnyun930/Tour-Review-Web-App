import React from 'react'
import { Divider, Drawer, List, ListItem, makeStyles, ListItemIcon, ListItemText } from '@material-ui/core';
import clsx from 'clsx';
import SidebarProfile from './Components/SidebarProfile';
import {
  Dashboard as DashboardIcon,
  PostAdd as PostAddIcon,
  AccountCircle as AccountIcon,
  ExitToApp as ExitToAppIcon
  // PhotoCamera as PhotoCameraIcon,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { logout } from '../../shared/actions/actions';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, user, adminId } = props;
  console.log('adminid?', adminId);
  const classes = useStyles();
  const sidebarNav = [
    {
      title: 'Dashboard',
      href: '/app/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Write Review',
      href: '/app/write-review',
      icon: <PostAddIcon />
    },
    {
      title: 'Account',
      href: '/app/profile',
      icon: <AccountIcon />
    },
  ];

  const sidebarBelow = [
    {
      title: 'Wrtie Post',
      href: '/app/write-review',
      icon: <PostAddIcon />
    },
    // {
    //   title: 'Wrtie Post',
    //   href: '/app/write-review',
    //   icon: <PhotoCameraIcon />
    // },
  ];

  const adminSidebarNav = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <DashboardIcon />
    },
  ];

  const handleOnClickLogout = () => {
    const { logout } = props;
    logout();
    props.history.push('/app');
  }

  const handleOnClickLogin = () => {
    props.history.push('/login');
  }

  const renderLogout = () => {
    return (
      <ListItem button onClick={handleOnClickLogout} key='logout'>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItem>
    );
  }

  const renderLogin = () => {
    return (
      <ListItem button onClick={handleOnClickLogin} key='login'>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary='Login' />
      </ListItem>
    )
  }

  const isLoggedIn = user ? true : adminId ? true : false;
  // const isUser = user ? true : false;
  // const isAdmin = adminId ? true : false;

  console.log('is logged in?',isLoggedIn);
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      variant={variant}
      classes={{ paper: classes.drawer }}
    >
      <div
        className={clsx(classes.root, className)}
      >
        <SidebarProfile user={user} adminId={adminId} />
        <Divider className={classes.divider}/>
        <List>
          {!adminId && sidebarNav.map(e => (
            <ListItem button component="a" href={e.href} key={e.href}>
              <ListItemIcon>
                {e.icon}
              </ListItemIcon>
              <ListItemText primary={e.title} />
            </ListItem>
          ))}
          {adminId && adminSidebarNav.map(e=> (
            <ListItem button component="a" href={e.href} key={e.href}>
              <ListItemIcon>
                {e.icon}
              </ListItemIcon>
              <ListItemText primary={e.title} />
            </ListItem>
          ))}
          {isLoggedIn
            ? renderLogout()
            : renderLogin()
          }
        </List>
        <Divider className={classes.divider}/>
        { user && 
          <List>
            {sidebarBelow.map(e => (
              <ListItem button component="a" href={e.href} key={e.href}>
                <ListItemIcon>
                  {e.icon}
                </ListItemIcon>
                <ListItemText primary={e.title} />
              </ListItem>
            ))}
          </List>
        }
      </div>
    </Drawer>
  )
}

const mapStateToProps = state => ({
  user: state.users.user,
  adminId: state.users.adminId
});

const mapDispatchToProps = {
  logout
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
