import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const AccessDeniedDialog = (props) => {

  const handleRedirectToLogin = () => {
    props.history.push('/login');
  }

  const handleRedirectToDashboard = () => {
    props.history.push('/app/dashboard');
  }

  return (
    <Dialog open={true}>
      <DialogTitle>Requires Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This page requires login.
          Please login first.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRedirectToLogin} color="primary">
          Login
        </Button>
        <Button onClick={handleRedirectToDashboard}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withRouter(AccessDeniedDialog)
