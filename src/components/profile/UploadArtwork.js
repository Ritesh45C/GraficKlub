import React, { Component } from "react";
import { Fab, Button, Dialog, TextField, withStyles } from "@material-ui/core";
import axios from "axios";
class UploadArtwork extends Component {
  state = {
    photos: [],
    selectedFile: null,
    currentImage: null,
    mangeArtwork: false,
    otherLoading: true,
    form: false,
    name: "",
    open: true
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  fileHandler = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  fileUploadHandler = e => {
    e.preventDefault();
    if (!this.state.selectedFile) {
    }
    const fd = new FormData();
    fd.append("image", this.state.selectedFile);
    fd.append("name", this.state.name);
    console.log(fd);
    axios
      .post("api/users/photo", fd)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const styles = {
      dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh"
      }
    };
    console.log(this.state.selectedFile);

    return (
      <Dialog
        fullWidth={250}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        open={this.state.open}
      >
        <div>
          <form onSubmit={this.fileUploadHandler} className="upload_form">
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              onChange={this.fileHandler}
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Choose Artwork from System
              </Button>
            </label>
            <TextField
              id="outlined-name"
              label="Name of Artwork"
              value={this.state.name}
              margin="normal"
              onChange={e => this.onChange(e)}
              name="name"
              variant="outlined"
            />

            <button className="upload_button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Dialog>
    );
  }
}
export default UploadArtwork;
