import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    margin: 'auto',
    // maxWidth: 500,
  },
  avatarCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  createdDate: {
    display: 'flex',
    alignItems: 'center'
  },
  createdDateTxt: {
    marginLeft: 8,
  },
  icon: {
    color: grey[300]
  }
}));

export default function Comment(props) {
  const classes = useStyles();
  const { comment } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item className={classes.avatarCenter}>
          <Avatar>{comment.userId.substring(0,2)}</Avatar>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="subtitle1">
                {comment.userId}
              </Typography>
              <div className={classes.createdDate}>
                <AccessTimeIcon className={classes.icon} />
                <Typography variant="body2" color="textSecondary" className={classes.createdDateTxt}>
                  {comment.createdDate}
                </Typography>
              </div>
              <Typography variant="body2" gutterBottom>
                {comment.comment}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
