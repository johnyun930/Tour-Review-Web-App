import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(0, 3, 3, 3),
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: grey[50]
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },

}));

export default function CountryList(props) {
  const classes = useStyles();
  const { locations } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h5">Explore Worlds</Typography>
      <GridList spacing={20} className={classes.gridList} cols={3}>
        {
          locations.map((location, i) => (
            <GridListTile key={i}>
              <img src={`https://source.unsplash.com/1600x900/?${location.name}`} alt={location.name}/>
              <GridListTileBar
                title={location.name}
                subtitle={location.description}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))
        }
      </GridList>
    </div>
  );
}
