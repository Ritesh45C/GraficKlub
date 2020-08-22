import React, { Component, Fragment } from "react";
import FileDownload from "js-file-download";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  CardMedia,
  makeStyles,
  Typography
} from "@material-ui/core/";

import UserForm from "./userForm";
// import Tabs from "../profile/tabs/tabs";

import Modal from "../../Modal/modal";
import "../Admin.css";

function convertArrayOfObjectsToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ",";
  lineDelimiter = args.lineDelimiter || "\n";

  keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
function downloadCSV(args, file) {
  var data, filename, link;

  var csv = convertArrayOfObjectsToCSV({
    data: file
  });
  if (csv == null) return;

  filename = args.filename || "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = "data:text/csv;charset=utf-8," + csv;
  }
  data = encodeURI(csv);

  link = document.createElement("a");
  link.setAttribute("href", data);
  link.setAttribute("download", filename);
  link.click();
}

class Admin extends Component {
  state = {
    photos: [],
    currentProfile: null,
    selectedFile: null
  };
  componentDidMount() {
    axios
      .get("/api/admin/photos")
      .then(res => {
        this.setState({ photos: res.data });
      })
      .catch(err => console.log(err));
  }
  showModal = imgData => {
    this.setState({ show: true, currentProfile: imgData });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  download = () => {
    // window.open("/api/admin/download");

    axios
      .get("/api/admin/download")
      .then(res => {
        var data = res.data.map(b => Object.assign(b, b.userData[0]));
        data.map(a => delete a.userData);
        downloadCSV({ filename: "stock-data.csv" }, data);
      })
      .catch(err => console.log(err));
  };
  fileHandler = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  render() {
    let photos;
    if (this.state.photos.length === 0) {
      photos = <h1>there are no photos</h1>;
    } else {
      photos = this.state.photos.map(img => {
        console.log(img);
        return (
          <Fragment>
            {this.state.show ? (
              <Modal show={this.state.show} handleClose={this.hideModal}>
                <UserForm imgData={this.state.currentProfile} />
              </Modal>
            ) : null}
            <input onChange={this.fileHandler} type="file" />

            <Card>
              <CardActionArea>
                <CardMedia
                  onClick={() => this.showModal(img)}
                  image={`http://localhost:5000/${img.imageUrl}`}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {img.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={this.download} size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Fragment>
        );
      });
    }
    return (
      <Fragment>
        <div>
          <div className="photos_collage">{photos}</div>;
        </div>
      </Fragment>
    );
  }
}
export default Admin;
