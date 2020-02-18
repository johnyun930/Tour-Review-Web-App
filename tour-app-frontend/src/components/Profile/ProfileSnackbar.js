import React from 'react'
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

const ProfileSnackbar = (props) => {
  const { open, closeSnackbar } = props;
  const style = { backgroundColor: green[600] }
 
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackbar}
    >
      <SnackbarContent
        style={style}
        message={
          <span >
            Successfully Profile Updated!
          </span>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={closeSnackbar}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

export default ProfileSnackbar
