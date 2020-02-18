import React, { useEffect } from 'react'
import Select from 'react-select';
import { makeStyles, Paper, Typography, Box, Container, TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Upload from './Components/Upload';
import axios from 'axios';
import { connect } from 'react-redux';
import AccessDeniedDialog from '../Global/AccessDeniedDialog';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3)
  },
  title: {
    margin: theme.spacing(3)
  },
  label: {
    marginBottom: theme.spacing(1)
  }
}));


const Review = (props) => {
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [hover, setHover] = React.useState(-1);
  const [rating, setRating] = React.useState(-1);
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [title, setTitleValue] = React.useState('');
  const [description, setDescriptionValue] = React.useState('[]');
  const classes = useStyles();
  
  useEffect(() => {
    async function fetchDefaultLocations() {
      await fetchLocations();
    }

    fetchDefaultLocations();
  }, []);

  const fetchLocations = () => {
    const FETCH_LOCATIONS = 'http://localhost:3000/get/location'
    axios.get(FETCH_LOCATIONS)
    .then(res => {
      setLocations(res.data);
    })
    .catch(err => {
      console.log('error occured,', err);
    })
  }

  const suggestions = locations.map(location => ({
      label: `${location.name} (${location.country})`,
      value: location.locationId,
  }));

  const handleChangeLocation = location => {
    console.log('select onchange?',location.value);
    setSelectedLocation(location);
  };

  const handleChangeRatingActive = (e, value) => {
    setHover(value);
  }

  const handleChangeRating = (e, value) => {
    setRating(value);
  }

  const handleClickOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  }

  const handleClickCloseUploadDialog = () => {
    setUploadDialogOpen(false);
  }

  const onFilesAdded = (file) => {
    setFiles(files.concat(file));
  }

  const handleOnChangeTitleInput = (e) => {
    const { value } = e.target;
    setTitleValue(value);
  }

  const handleOnChangeDescriptionInput = (e) => {
    const { value } = e.target;
    setDescriptionValue(value);
  }

  const handleOnClickSaveReview = () => {
    const createdDate = new Date().toISOString().substr(0,10);
    const { userId } = props;
    const CREATE_REVIEW_URL = 'http://localhost:3000/create/review';
    const locationId = selectedLocation.value
    const data = {
      createdDate: createdDate,
      reviewDescription: description,
      title: title,
      userId: userId,
      locationId: locationId,
      rating: rating
    }
    axios({
      method: 'post',
      url: CREATE_REVIEW_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data
    })
    .then(r => {
      props.history.push("/app");
    })
    .catch(e => console.log(e))
    console.log('data?', data);
  }

  const renderUploadDialog = () => {
    return (
      <Upload 
        open={uploadDialogOpen}
        handleClose={handleClickCloseUploadDialog}
        onFilesAdded={onFilesAdded}
        files={files}
      />
    )
  }

  if(!props.userId) {
    return (
      <AccessDeniedDialog />
    );
  }

  console.log('location id?',selectedLocation);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography align="center" variant="h4" className={classes.title}>Write Review!</Typography>
            <Box m={2}>
              <Typography component="label" variant="h6" className={classes.label}>Rating</Typography>
              <Box display="flex">
                <Rating
                  name="hover-side"
                  value={rating}
                  precision={0.5}
                  onChangeActive={handleChangeRatingActive}
                  onChange={handleChangeRating}
                />
                <Box ml={3}><Typography>{labels[hover !== -1 ? hover : rating]}</Typography></Box>
              </Box>
            </Box>
            <Box m={2}>
              <Typography component="label" variant="h6" className={classes.label}>Select Location</Typography>
              <Select
                inputId="react-select-single"
                placeholder="Select your location"
                options={suggestions}
                value={selectedLocation}
                onChange={handleChangeLocation}
              />
            </Box>
            <Box m={2}>
              <Typography component="label" variant="h6">Title</Typography>
              <TextField
                label="Write Title here"
                fullWidth
                onChange={handleOnChangeTitleInput}
                name='title'
                />
            </Box>
            <Box m={2}>
            <Typography component="label" variant="h6" className={classes.label}>Wrtie Your Review Description Here</Typography>
              <TextField
                multiline
                fullWidth
                rows={10}
                variant="outlined"
                name='reviewDescription'
                onChange={handleOnChangeDescriptionInput}
              />
            </Box>
            <Box m={3}>
              <Button variant="outlined" color="primary" onClick={handleClickOpenUploadDialog}>
                Upload Pictures
              </Button>
            </Box>
            <Box m={3} p={3} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleOnClickSaveReview}
                >
                Save
              </Button>
            </Box>
          </Paper>
        </div>
      </Container>
      {renderUploadDialog()}
    </React.Fragment>  
  )
}

const mapStateToProps = state => ({
  userId: state.users.userId
});

export default connect(mapStateToProps, null)(Review);
