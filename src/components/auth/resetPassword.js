import React, { Component } from "react";
import axios from "axios";
class ResetPassword extends Component {
  state = {
    reset: false,
    userId: "",
    error: "",
    password: "",
    confirmPassword: ""
  };
  componentDidMount() {
    axios
      .get(`/api/users/getreset/${this.props.match.params.token}`)
      .then(res => {
        console.log(res.data);
        this.setState({ reset: true, userId: res.data.userId });
      })
      .catch(err => this.setState({ error: "Sorry! Something went wrong" }));
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: "password doesn't match" });
    } else {
      const newPassword = {
        password: this.state.password,
        userId: this.state.userId,
        passwordToken: this.props.match.params.token
      };
      axios
        .post("/api/users/new-password", newPassword)
        .then(res => {
          console.log(res);
          this.setState({ message: "Please check you email ", error: "" });
        })
        .catch(err => console.log(err));

      // this.props.registerUser(newUser, this.props.history);
    }
  }

  render() {
    var reset = "loading";
    if (this.state.reset) {
      reset = (
        <div>
          <form onSubmit={event => this.onSubmit(event)} className="form">
            <div className="label">New-Password:</div>
            <input
              name="password"
              value={this.state.password}
              onChange={event => this.onChangeHandler(event)}
              className="Password"
              type="Password"
            />
            <div className="label">Confirm-Password:</div>
            <input
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={event => this.onChangeHandler(event)}
              className="confirmPassword"
              type="password"
            />

            <button type="submit">></button>
          </form>
        </div>
      );
    }
    return (
      <div>
        {reset} {this.state.error ? this.state.error : null}{" "}
      </div>
    );
  }
}
export default ResetPassword;
