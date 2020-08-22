import React, { Component, Fragment } from "react";
import "./how.css";
import Modal from "../profile/tabsComponent/css/Modal";
class HowItWorks extends Component {
  state = {
    currentImage: null
  };

  showModal = url => {
    this.setState({ show: true, currentImage: url });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <Fragment>
        {this.state.show ? (
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={this.state.currentImage}
              alt=""
            />
          </Modal>
        ) : null}
        <img
          onClick={() => this.showModal("/images/howitworks.jpg")}
          className="bg"
          src="/images/howitworks.jpg"
          alt=""
        />
      </Fragment>
    );
  }
}
export default HowItWorks;
