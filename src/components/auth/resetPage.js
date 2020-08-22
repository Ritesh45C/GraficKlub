import React, { Component } from "react";
import "./reset.css";
import axios from "axios";
class ResetPage extends Component {
  state = {
    email: "",
    error: "",
    message: ""
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    const User = {
      email: this.state.email
    };

    axios
      .post("/api/users/reset", User)
      .then(res => {
        console.log(res);
        this.setState({
          message:
            "We just sent you an email that contains your password reset link, If you don't see it in the inbox please check you spam folder. ",
          error: ""
        });
      })
      .catch(err => this.setState({ error: err.response.data }));

    // this.props.registerUser(newUser, this.props.history);
  }
  render() {
    return (
      <div className="reset">
        <h1 className="forgot_password">Forgot Password ?</h1>
        <h2>Please fill your registered email address.</h2>
        <form onSubmit={event => this.onSubmit(event)} className="form">
          <div className="label">Email:</div>
          <input
            name="email"
            value={this.state.email}
            onChange={event => this.onChangeHandler(event)}
            className="email"
            type="email"
          />

          <button className="submit_button" type="submit">
            >
          </button>
        </form>
        <br />
        <h1 style={{ color: "green" }}>
          {" "}
          {this.state.message ? this.state.message : null}{" "}
        </h1>
        <br />
        <h1 style={{ color: "red" }}>
          {" "}
          {this.state.error ? this.state.error.error : null}{" "}
        </h1>
      </div>
    );
  }
}
export default ResetPage;
