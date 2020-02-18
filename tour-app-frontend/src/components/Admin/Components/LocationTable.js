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

export default function LocationTable(props) {
  const classes = useStyles();
  const { locations } = props;
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom>Location Table</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map(location => (
            <TableRow key={location.id}>
              <TableCell component="th" scope="row">
                {location.name}
              </TableCell>
              <TableCell>{location.country}</TableCell>
              <TableCell>{location.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
