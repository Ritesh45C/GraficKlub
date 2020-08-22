import React, { Component } from "react";
import "./profile.css";
import Tabs from "./tabs/tabs";
import { connect } from "react-redux";

import MyWork from "./tabsComponent/myWork";
import ProjectContest from "./tabsComponent/ProjectContest";
import ManageArtwork from "./manageArtwork/manageArtwork";
import Navbar from "../layout/Navbar/Navbar";
import MyEarning from "./tabsComponent/MyEarning";
import { Link, Button } from "@material-ui/core";
class Profile extends Component {
  state = {
    active: false
  };

  render() {
    const { name } = this.props;
    // console.log(name, "this is name");
    return (
      <div>
        <Navbar color={"#242614"} height="5.5rem" />
        <div className="profile_container">
          <div className="profile_pic">
            <img
              src={`https://ui-avatars.com/api/?name=${name}&rounded=true&size=128&background=FFB25B&bold=true&color=ffff`}
              alt="name"
            />
            <div className="profile_name">{name}</div>
            <a
              onClick={() => this.props.history.push("/profile-settings")}
              className="profile_setting"
            >
              Profile Setting
            </a>
          </div>
          <div className="profile_navlist">
            <Tabs>
              <div label="MY WORK">
                <MyWork />
              </div>

              <div label="PROJECT & CONTEST">
                <ProjectContest />
              </div>
              <div label="MY EARNING">
                <MyEarning />
              </div>
              <div label="COMMUNITY">
                Nothing to see here, this tab is <em>extinct</em>!
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  name: state.auth.user.name
});

export default connect(mapState)(Profile);
