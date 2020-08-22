import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Tabs from "../tabs/tabs";
import Navbar from "../../layout/Navbar/Navbar";
import { getPhotos } from "../../../actions/profileActions";
class ManageArtwork extends Component {
  state = {
    photos: []
  };
  // componentDidMount() {
  //   this.props.getPhotos();
  // }
  async componentDidMount() {
    await this.props.getPhotos();

    if (this.props.photos.length > 0) {
      this.setState({
        photos: this.props.photos
      });
    }
  }

  render() {
    const { photos, loading, name } = this.props;
    console.log("this is stsate phot", this.props.photos);
    let accepted = [];
    let rejected = [];
    let active = [];
    if (photos === null || loading) {
      accepted = "loading";
    } else {
      if (photos.length > 0) {
        accepted = photos
          .filter(img => img.accepted === true)
          .map(p => {
            return p ? (
              <div style={{ marginLeft: "12rem" }}>
                <img
                  style={{ width: "150px" }}
                  src={p.imageUrl}
                  onClick={() => this.showModal(p.imageUrl)}
                  alt="lil"
                />
              </div>
            ) : null;
          });
        rejected = photos
          .filter(img => img.rejected === true)
          .map(p => {
            return p ? (
              <div style={{ marginLeft: "12rem" }}>
                <img
                  style={{ width: "150px" }}
                  src={p.imageUrl}
                  onClick={() => this.showModal(p.imageUrl)}
                  alt="lil"
                />
              </div>
            ) : (
              <h1>There are not photos</h1>
            );
          });
        active = photos
          .filter(img => img.active === true)
          .map(p => {
            return p ? (
              <div style={{ marginLeft: "12rem" }}>
                <img
                  style={{ width: "150px" }}
                  src={p.imageUrl}
                  onClick={() => this.showModal(p.imageUrl)}
                  alt="lil"
                />
              </div>
            ) : null;
          });
      } else {
        accepted = [];
        rejected = [];
        active = [];
      }
    }
    // let accepted;
    // console.log(this.props.photos, "this is real");
    // if (this.state.photos === undefined || !this.props.isAuth) {
    //   accepted = <h1>there are no photos</h1>;
    // } else {
    //   if (
    //     this.props.loading
    //     // this.state.photos.length === 0 ||
    //     // this.state.photos === null ||
    //   ) {
    //     accepted = "loading";
    //   } else {
    //     accepted = this.state.photos
    //       .filter(img => img.accepted === true)
    //       .map(p => {
    //         return (
    //           <img
    //             style={{ width: "150px" }}
    //             src={"http://localhost:5000/" + p.imageUrl}
    //             onClick={() => this.showModal(p.imageUrl)}
    //             alt="lil"
    //           />
    //         );
    //       });
    //   }
    // }
    console.log("this is accep", accepted, rejected, active);
    return (
      <Fragment>
        <Navbar color={"#242614"} />
        <div className="profile_container">
          <div className="profile_pic">
            <img
              src={`https://ui-avatars.com/api/?name=${name}&rounded=true&size=128&background=FFB25B&bold=true&color=ffff`}
              alt="name"
            />
            <div className="profile_name">{name}</div>
          </div>
          <div className="profile_navlist">
            <Tabs>
              <div label={`Active(${active.length})`}>
                {active.length === 0 ? (
                  <h1 style={{ marginLeft: "20%" }}>
                    "There are no active projects!"{" "}
                  </h1>
                ) : (
                  active
                )}
              </div>
              <div label={`Accepted(${accepted.length})`}>
                {" "}
                {accepted.length === 0 ? (
                  <h1 style={{ marginLeft: "20%" }}>
                    "There are no accepted projects!"
                  </h1>
                ) : (
                  accepted
                )}
              </div>
              <div label={`Rejected(${rejected.length})`}>
                {" "}
                {rejected.length === 0 ? (
                  <h1 style={{ marginLeft: "20%" }}>
                    "There are no rejected projects!"
                  </h1>
                ) : (
                  rejected
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  photos: state.profile.photos,
  loading: state.profile.loading,
  name: state.auth.user.name
});
export default connect(
  mapStateToProps,
  { getPhotos }
)(ManageArtwork);
