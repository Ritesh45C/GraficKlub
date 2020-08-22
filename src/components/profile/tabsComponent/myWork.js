import React, { Component, Fragment } from "react";
import "./css/tabs.css";
import Spinner from "../../spinner/spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Modal from "./css/Modal";
import { getPhotos } from "../../../actions/profileActions";
import ManageArtwork from "../manageArtwork/manageArtwork";
import UploadArtwork from "../UploadArtwork";
class MyWork extends Component {
  state = {
    photos: [],
    selectedFile: null,
    currentImage: null,
    mangeArtwork: false,
    otherLoading: true,
    form: false,
    description: ""
  };
  showModal = url => {
    this.setState({ show: true, currentImage: url });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  show = () => {
    this.setState({ form: !this.state.form });
  };

  fileHandler = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  componentDidMount() {
    this.props.getPhotos();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.photos) {
      this.setState({ photos: nextProps.photos, otherLoading: false });
    }
  }

  fileUploadHandler = e => {
    e.preventDefault();
    if (!this.state.selectedFile) {
    }
    const fd = new FormData();
    fd.append("image", this.state.selectedFile);
    fd.append("description", this.state.description);
    axios
      .post("api/users/photo", fd)
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  };
  mangeArtwork = () => {
    this.setState({ mangeArtwork: true });
  };
  deletePhoto = id => {
    axios
      .delete(`api/users/delete-photo/${id}`)
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let photos;

    if (
      this.state.photos === undefined ||
      !this.props.isAuth ||
      this.state.photos.length === 0
    ) {
      photos = <h1>there are no photos</h1>;
    } else {
      if (
        this.props.loading ||
        this.state.photos === undefined ||
        this.state.photos === null
        // this.state.photos.length === 0 ||
        // this.state.photos === null ||
      ) {
        photos = <Spinner />;
      } else {
        photos = this.state.photos.map(p => {
          return (
            <div key={p._id} className="hovereffect">
              <img
                key={p._id}
                className="singleImage"
                src={p.imageUrl}
                onClick={() => this.showModal(p.imageUrl)}
                alt="lil"
              />
              <div className="overlay">
                <h2>{p.description}</h2>
                <p className="icon-links">
                  <a href="#">
                    <div
                      onClick={() => this.deletePhoto(p._id)}
                      className="delete"
                    >
                      Delete
                    </div>
                  </a>
                </p>
              </div>
            </div>
          );
        });
      }
    }
    if (this.state.mangeArtwork) {
      photos = <ManageArtwork />;
    }

    return (
      <Fragment>
        {this.state.show ? (
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <img
              style={{ width: "50rem", height: "50rem" }}
              src={this.state.currentImage}
              alt=""
            />
          </Modal>
        ) : null}
        <div className="mywork">
          <div className="list">
            {/* <label class="custom-file-upload">
              <input onChange={this.fileHandler} type="file" />
              Upload your new artwork
            </label>
            <button type="submit" onClick={this.fileUploadHandler}>
              Submit
            </button> */}
            <div className="upload" onClick={this.show}>
              Upload your new artwork
            </div>

            {this.state.form ? <UploadArtwork /> : null}
            <Link className="manageLink" to="/manage">
              Manage uploaded artwork
            </Link>
          </div>

          {/* <div className="content">{images}</div> */}

          <div className="content">
            <div className="photo_content">{photos}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  photos: state.profile.photos,
  loading: state.profile.loading,
  userId: state.auth.user.id,
  isAuth: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { getPhotos }
)(MyWork);
