import React, { Component } from 'react'
import { Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  withStyles,
  Box,
  Typography,
  GridList,
  GridListTile,
 } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';

import { styles } from './uploadStyles';
import clsx from 'clsx';

export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();
    this.state = {
      images: [],
    }
  }

  componentDidMount(){
    this.createImageUrl(this.props.files);
  }

  componentDidUpdate(prevProps) {
    if (this.props.files !== prevProps.files) {
      this.createImageUrl(this.props.files);
    }
  }

  createImageUrl = (files) => {
    const images = files.map(file => URL.createObjectURL(file));
    this.setState({ images }, () => console.log('images?? ',this.state.images));
  }
  
  onDragOver = (event) => {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({ hightlight: true });
  }

  onDragLeave = (event) => {
    this.setState({ hightlight: false });
  }

  onFilesAdded = (evt) =>  {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  fileListToArray = (list) => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list[i]);
    }
    return array;
  }

  openFileDialog = () => {
    // if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onDrop = (event) => {
    event.preventDefault();
    if (this.props.disabed) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  render() {
    const { hightlight, images } = this.state;
    const { open, handleClose, classes, files } = this.props;
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle>Upload Pictures</DialogTitle>
        <DialogContent className={classes.wrapper}>
          <div
            className={clsx(classes.dropzone, hightlight && classes.hightlight )}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            onDrop={this.onDrop}
            onClick={this.openFileDialog}
            style={{ cursor: this.props.disabled ? "default" : "pointer" }}
          >
            <input
              ref={this.fileInputRef}
              className={classes.fileInput}
              type="file"
              multiple
              onChange={this.onFilesAdded}
            />
            <CloudUploadIcon />
            <span>Upload Files</span>
          </div>
          <Box m={2}>
            <Box>
              <div className={classes.previewWrapper}>
                <GridList cellHeight={100} cols={3} spacing={1}>
                  {images.map(img => (
                    <GridListTile key={img} cols={1}>
                      <img src={img} alt='preview' className={classes.previewImg} />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </Box>
            <Box display="flex" flexDirection="column" p={1}>
              {this.props.files && this.props.files.map(file =>
                <Typography
                  key={file.name}
                  variant="caption"
                  component="span"
                >
                  {file.name}
                </Typography> 
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Upload
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(Upload);

