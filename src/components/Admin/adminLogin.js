import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAdmin } from "../../actions/adminActions";
class AdminLogin extends Component {
  state = {
    email: "",
    password: ""
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    const admin = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginAdmin(admin, this.props.history);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "22rem"
        }}
      >
        <form onSubmit={event => this.onSubmit(event)}>
          <input
            className="inputSize"
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
            className="inputSize"
            placeholder="password"
            type="PASSWORD"
            name="password"
            value={this.state.password}
            onChange={event => this.onChangeHandler(event)}
          />
          <button type="submit" className="button">
            LOG IN
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.auth.errors
});
export default connect(
  mapStateToProps,
  { loginAdmin }
)(AdminLogin);
