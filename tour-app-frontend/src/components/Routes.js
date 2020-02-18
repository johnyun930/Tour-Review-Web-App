import React, { useState } from "react";
import clsx from 'clsx';
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import Header from "./Header/Header";
import Review from './Review/Review';
import Dashboard from "./Dashboard/Dashboard";
import Profile from './Profile/Profile';
import Admin from './Admin/Admin';
import Sidebar from './Sidebar/Sidebar';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%',
    margin: theme.spacing(4),
  }
}));


const Routes = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);
  
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Header onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        <Switch>
          <Route path="/app/dashboard" component={Dashboard} />
          <Route path="/app/write-review" component={Review} />
          <Route path="/app/profile" component={Profile} />
          <Route path="/app/review/:id" component={Review} />
          <Route path="/admin/dashboard" component={Admin} />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(Routes);
