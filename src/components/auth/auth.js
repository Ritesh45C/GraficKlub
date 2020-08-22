import React, { Component, Fragment } from "react";
import axios from "axios";
import "./auth.css";
import classnames from "classnames";
import { withRouter } from "react-router";
import Login from "./login";
import { join } from "path";
class Auth extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
    display: "",
    feedback: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    axios
      .post("/api/users/register", newUser)
      .then(res => this.setState({ feedback: res.data, errors: "" }))
      .catch(err => {
        this.setState({ errors: err.response.data });
        console.log(err.response.data);
      });
    console.log("this is new user", newUser);
    // this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <Fragment>
        <div className="authentication">
          <div className="signUpWithEmail">
            <div className="signText">sign up with email</div>
          </div>
          {errors.email && <div className="feedback">*{errors.email}</div>}
          {errors.name && <div className="feedback">*{errors.name}</div>}

          {errors.password && (
            <div className="feedback">*{errors.password}</div>
          )}
          {errors.password2 && (
            <div className="feedback">*{errors.password2}</div>
          )}
          <div style={{ color: "green" }} className="feedback">
            {this.state.feedback ? this.state.feedback : null}{" "}
          </div>

          <div className="signUpWith">
            <div className="singUP_input_2">
              <form onSubmit={event => this.onSubmit(event)}>
                <input
                  className={classnames("inputSize", {
                    registerInput: errors.name
                  })}
                  placeholder="EMAIL"
                  value={this.state.email}
                  onChange={event => this.onChangeHandler(event)}
                  type="text"
                  name="email"
                />

                <input
                  className={classnames("inputSize", {
                    registerInput: errors.email
                  })}
                  placeholder="NAME"
                  value={this.state.name}
                  onChange={event => this.onChangeHandler(event)}
                  type="text"
                  name="name"
                />

                <input
                  className={classnames("inputSize_bottom", {
                    registerInput: errors.password
                  })}
                  placeholder="PASSWORD"
                  value={this.state.password}
                  onChange={event => this.onChangeHandler(event)}
                  type="password"
                  name="password"
                />

                <input
                  className={classnames("inputSize_bottom", {
                    registerInput: errors.password
                  })}
                  placeholder="CONFIRM PASSWORD"
                  value={this.state.password2}
                  onChange={event => this.onChangeHandler(event)}
                  type="password"
                  name="password2"
                />
                <button type="submit" className="button">
                  SIGN UP
                </button>
              </form>
            </div>
          </div>
          <Login />
        </div>
      </Fragment>
    );
  }
}
export default withRouter(Auth);
