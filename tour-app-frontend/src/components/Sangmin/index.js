import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '80%',
    overflowX: 'auto',
    padding: '0 30px'
  },
  table: {
    minWidth: 650
  }
});

function createData(name, userID, username, email, phonenumber) {
  return { name, userID, username, email, phonenumber };
}

const rows = [
  createData('John Doe', 'John123', 'JohnKing', 'John123@gmail.com', '666-666-6666'),
  createData('Sam Lee', 'Sam123', 'SamKing', 'Sam123@gmail.com', '777-777-7777'),
  createData('Rachael Johnson', 'Rachael123', 'RachealQueen', 'Racheal123@gmail.com', '555-555-5555'),
  createData('Jessica Wilson', 'Jessica123', 'JessicaQueen', 'Jessica123@gmail.com', '333-333-3333'),
  createData('Jeff Hurst', 'Jeff123', 'JeffKing', 'Jeff123@gmail.com', '666-666-6666')
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>All User Information</b>
            </TableCell>
            <TableCell align='right'>
              <b>User Id</b>
            </TableCell>
            <TableCell align='right'>
              <b>User Name</b>
            </TableCell>
            <TableCell align='right'>
              <b>E-mail</b>
            </TableCell>
            <TableCell align='right'>
              <b>Phone Number</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.userID}</TableCell>
              <TableCell align='right'>{row.username}</TableCell>
              <TableCell align='right'>{row.email}</TableCell>
              <TableCell align='right'>{row.phonenumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
