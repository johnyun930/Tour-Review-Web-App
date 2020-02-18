import React, { useState } from 'react'
import { Card, Divider, CardHeader, TextField, Grid, CardContent, Button, CardActions } from '@material-ui/core';
export default function LocationCard(props) {

  const { handleSaveLocation } = props;
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    switch(name){
      case 'country':
        setCountry(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'name':
        setName(value);
        break;
      default: return;
    }
  }

  const handleSaveOnClick = (e) => {
    e.preventDefault();
    const entity = {
      country,
      name,
      description
    }
    handleSaveLocation(entity);
    setName('');
    setCountry('');
    setDescription('');
  }

  return (
    <Card>
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="This location will be displayed in user page"
          title="Setting Location"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Location name"
                margin="dense"
                name="name"
                onChange={handleOnChangeInput}
                required
                variant="outlined"
                value={name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleOnChangeInput}
                required
                variant="outlined"
                value={country}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={10}
                margin="dense"
                name="description"
                required
                onChange={handleOnChangeInput}
                variant="outlined"
                value={description}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveOnClick}
          >
            Save Location
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
