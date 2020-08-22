import React, { Component, Fragment } from "react";
import "./Navbar.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Auth from "../../auth/auth";
import { logoutUser } from "../../../actions/authActions";
class Navbar extends Component {
  state = {
    open: false,
    navClass: "navbar-toggler",
    navulClass: "navItems",
    display: "block"
  };
  onlogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  onClick = () => {
    if (this.state.navClass === "navbar-toggler") {
      this.setState({
        navClass: "navbar-toggler open-navbar-toggler",
        navulClass: "navItems_small"
      });
    }
    if (this.state.navClass === "navbar-toggler open-navbar-toggler") {
      this.setState({ navClass: "navbar-toggler", navulClass: "navItems" });
    }
  };

  openAuth = () => {
    this.setState({ open: true });
  };
  render() {
    var auth = (
      <ul className={this.state.navulClass}>
        <li>
          <Link to="/about-us">About</Link>
        </li>
        <li>
          <Link to="/how-it-works">How it works</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
        <li>
          <Link to="/#" onClick={this.openAuth}>
            Sign In/ Register
          </Link>
        </li>
      </ul>
    );
    if (this.props.color) {
      var background = this.props.color;
      var color = "white";
      var height = "5.5rem";
      var size = "2.5rem";
    }

    if (this.props.isAuth) {
      auth = (
        <ul className="navItemss">
          {" "}
          <Link
            to="/#"
            className="nav_logout"
            style={{ color: color, marginRight: "4rem" }}
            onClick={e => this.onlogoutClick(e)}
          >
            Logout
          </Link>{" "}
        </ul>
      );
    }

    return (
      <Fragment>
        <nav style={{ backgroundColor: background, height: height }}>
          <Link
            style={{ color: color, fontSize: size }}
            className="logo"
            to="/"
          >
            Graficklub
          </Link>
          <div className="navlinks">{auth}</div>
          <button
            style={{ marginRight: "2rem" }}
            onClick={this.onClick}
            className={this.state.navClass}
          >
            <span />
          </button>
        </nav>

        {this.state.open ? <Auth open={this.state.open} /> : null}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
