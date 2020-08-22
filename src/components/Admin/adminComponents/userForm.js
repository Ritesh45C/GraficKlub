import React, { Component } from "react";
import "../../auth/auth.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

class UserForm extends Component {
  state = {
    name: "",
    email: "",
    accepted: "",
    active: "",
    owner: "",
    rejected: "",
    price: ""
  };
  // componentWillReceiveProps(nextProps) {
  //   console.log("this is userform ", nextProps);
  // }
  componentDidMount() {
    console.log(this.props.imgData);
    if (this.props.imgData) {
      this.setState({
        accepted: this.props.imgData.accepted,
        active: this.props.imgData.active,
        rejected: this.props.imgData.rejected,
        name: this.props.imgData.name,
        email: this.props.imgData.email,
        id: this.props.imgData._id,
        price: this.props.imgData.price
      });
    }
  }
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    const newInfo = {
      accepted: this.state.accepted,
      active: this.state.active,
      rejected: this.state.rejected,
      price: this.state.price
    };
    axios
      .put(`/api/admin/photos/${this.state.id}`, newInfo)
      .then(res => this.setState({ message: res.data.message }))
      .catch(err => {
        this.setState({ errors: err.response.data });
        console.log(err.response.data);
      });

    // this.props.registerUser(newUser, this.props.history);
  }
  render() {
    return (
      // {/* <div>
      //   <h2>Name:{String(this.props.imgData.name)}</h2>;
      //   <h2>Email:{String(this.props.imgData.email)}</h2>;
      //   <h2>Accepted:{String(this.props.imgData.accepted)}</h2>;
      //   <h2>Active:{String(this.props.imgData.active)}</h2>
      //   <h2>Rejected:{String(this.props.imgData.rejected)}</h2>
      //   <h2>Owner_id{String(this.props.imgData.owner)}</h2>
      // </div> */}

      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={event => this.onSubmit(event)}
        >
          <TextField
            id="outlined-name"
            label="Email"
            name="email"
            value={this.state.email}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Name of the Designer"
            name="name"
            value={this.state.name}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Active"
            name="active"
            onChange={event => this.onChangeHandler(event)}
            value={this.state.active}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Accepted"
            name="accepted"
            value={this.state.accepted}
            onChange={event => this.onChangeHandler(event)}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Rejected"
            name="rejected"
            value={this.state.rejected}
            onChange={event => this.onChangeHandler(event)}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Amount to pay:"
            name="price"
            value={this.state.price}
            onChange={event => this.onChangeHandler(event)}
            margin="normal"
            variant="outlined"
          />

          <h2 style={{ color: "green" }}>
            {" "}
            <div> {this.state.message} </div>{" "}
          </h2>
          <button style={{ margin: "auto" }} type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default UserForm;
