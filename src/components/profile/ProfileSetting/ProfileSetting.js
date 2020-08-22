import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Navbar from "../../layout/Navbar/Navbar";
import { connect } from "react-redux";
import axios from "axios";
class ProfileSetting extends Component {
  state = {
    name: "",
    phone: "",
    address: ""
  };

  componentDidMount() {
    axios
      .get("api/users/user-info")
      .then(res =>
        this.setState({
          name: res.data.full_name,
          phone: res.data.phoneNo,
          address: res.data.address
        })
      )
      .catch(err => console.log(err));
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const profile = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      message: ""
    };
    axios
      .post("api/users/user-info", profile)
      .then(res => this.setState({ message: res.data }))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <Navbar color={"#242614"} />
        <div className="profile_container">
          <div className="profile_pic">
            <img
              src={`https://ui-avatars.com/api/?name=${
                this.props.name
              }&rounded=true&size=128&background=FFB25B&bold=true&color=ffff`}
              alt="name"
            />
            <div className="profile_name">{this.props.name}</div>
          </div>
        </div>
        <div>
          <div style={{ color: "green" }} className="feedback">
            {this.state.message ? this.state.message : null}{" "}
          </div>
          <form
            onSubmit={e => this.onSubmit(e)}
            className="profile_form"
            action=""
          >
            <TextField
              name="name"
              id="outlined-name"
              label="Full Name"
              onChange={e => this.onChange(e)}
              margin="normal"
              value={this.state.name}
              variant="outlined"
            />

            <TextField
              name="phone"
              id="outlined-number"
              label="Phone No."
              type="number"
              onChange={e => this.onChange(e)}
              margin="normal"
              value={this.state.phone}
              variant="outlined"
            />
            <TextField
              name="address"
              id="outlined-full-width"
              label="Address"
              onChange={e => this.onChange(e)}
              style={{ margin: 8 }}
              placeholder="Address"
              fullWidth
              margin="normal"
              value={this.state.address}
              variant="outlined"
            />
            <button className="profile_submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  name: state.auth.user.name
});
export default connect(mapStateToProps)(ProfileSetting);
