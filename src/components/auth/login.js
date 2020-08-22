import React, { Component, Fragment } from "react";
import "./auth.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    color: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeColor = () => {
    this.setState({ color: "#cacaca8f" });
  };

  onSubmit(e) {
    e.preventDefault();

    const User = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(User, this.props.history);
    // this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { errors } = this.props;
    return (
      <Fragment>
        <div style={{ fontSize: "2rem", textAlign: "center" }}>
          Already have an Account?
        </div>
        <div
          onClick={this.changeColor}
          style={{ backgroundColor: this.state.color, marginTop: "3rem" }}
        >
          <div className="signUpWithEmail">
            <div className="signText">LOG IN</div>
          </div>
          {errors.email && <div className="feedback">*{errors.email}</div>}
          {errors.password && (
            <div className="feedback">*{errors.password}</div>
          )}
          <form
            style={{ marginLeft: "2rem" }}
            onSubmit={event => this.onSubmit(event)}
          >
            <input
              className="inputSize_bottom"
              placeholder="EMAIL"
              type="text"
              name="email"
              value={this.state.email}
              onChange={event => this.onChangeHandler(event)}
            />
            {/* {props.touched.name && props.errors.name && ( */}
            {/* <div className=feedback}> */}
            {/* *{props.errors.name} */}
            {/* </div> */}
            {/* )} */}
            <input
              className="inputSize_bottom"
              placeholder="PASSWORD"
              type="PASSWORD"
              name="password"
              value={this.state.password}
              onChange={event => this.onChangeHandler(event)}
            />
            <button type="submit" className="button">
              LOG IN
            </button>
          </form>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/forgot-password">FORGOT PASSWORD?</Link>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
