import React, { Component } from "react";
import "./Landing.css";
import Navbar from "../Navbar/Navbar";
import Auth from "../../auth/auth";
import HowItWorks from "../../HowItWorks/HowItWorks";
import { withRouter } from "react-router";
class Landing extends Component {
  state = {
    open: false,
    first: "first",
    second: "",
    class2: "",
    opacity: 0,
    scroll: 0
  };
  componentDidMount() {
    this.handleOpacity();
  }
  componentWillMount() {
    // When this component mounts, begin listening for scroll changes

    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollY = window.scrollY;
    this.setState({
      scroll: currentScrollY / 4
    });
    // if (this.state.scroll >= 190) {
    //   this.setState({
    //     scroll: 0
    //   });
    // }
    if (window.screen.width <= 400) {
      this.setState({
        scroll: 0
      });
    }
  };

  handleOpacity = () => {
    if (this.state.first === "first") {
      setTimeout(() => {
        this.setState({ first: "exist", second: "second", opacity: 1 });
      }, 5000);
    }
    if (this.state.second === "second") {
      setTimeout(() => {
        this.setState({ first: "first", second: "exist" });
      }, 5000);
    }

    setTimeout(() => {
      this.handleOpacity();
    }, 500);
  };

  openAuth = () => {
    this.setState({ open: true });
  };
  render() {
    return (
      <div>
        <Navbar />
        {this.state.open ? <Auth open={this.state.open} /> : null}
        <div
          style={{ backgroundPositionY: -this.state.scroll }}
          className="background"
        >
          <div>
            <div className={`heading_one ${this.state.first}`}>
              Design is creativity made visible
            </div>
            <div className={`small_heading ${this.state.first}`}>
              See the creativity take shape with our designer platform.
              Graficklub is the best place to find exclusive designs made by
              creative minds from round the globe.
            </div>
            <div onClick={this.openAuth} className="get_started">
              Get Started
            </div>
          </div>
          <div style={{ opacity: this.state.opacity }}>
            <div className={`head_one ${this.state.second}`}>
              “Today’s Designs, tomorrow’s milestones”
            </div>
            <div className={`small_head ${this.state.second}`}>
              Join us for an exciting journey into a world of possibility. With
              Graficklub, creativities reach millions of hearts, paving
              excellence for our artists.
            </div>
            <div onClick={this.openAuth} className="get_started">
              Get Started
            </div>
          </div>
        </div>
        <HowItWorks />
      </div>
    );
  }
}
export default withRouter(Landing);
