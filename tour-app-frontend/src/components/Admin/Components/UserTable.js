import React from 'react'

import { Table, makeStyles, Paper, TableHead, TableCell, TableBody, TableRow, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

export default function UserTable(props) {
  const classes = useStyles();
  const { users } = props;
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom>User Table</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Full Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.userId}>
              <TableCell component="th" scope="row">
                {user.userId}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
