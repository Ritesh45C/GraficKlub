import React, { Component } from "react";
import { connect } from "react-redux";

class MyEarning extends Component {
  render() {
    var earning;
    if (this.props.photos.length === 0 || this.props.photos === null) {
      earning = "there are no photos";
    }
    if (this.props.photos.length > 0) {
      earning = this.props.photos
        .filter(img => img.price > "0.00")
        .map(p => {
          return (
            <div className="container">
              <div className="image">
                <img
                  style={{ height: "13rem" }}
                  src={"http://localhost:5000/" + p.imageUrl}
                  alt="lil"
                />
              </div>
              <div className="item_description">{p.description}</div>
              <div className="item_amount">
                Amount Received <br />{" "}
                <span style={{ color: "#010167" }}> Rs.{p.price} </span>
              </div>
            </div>
          );
        });
    }

    return <div>{earning}</div>;
  }
}
const mapStateToProps = state => ({
  photos: state.profile.photos,
  auth: state.auth
});
export default connect(mapStateToProps)(MyEarning);
