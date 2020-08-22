import React, { Component, Fragment } from "react";
import axios from "axios";
import Spinner from "../../spinner/spinner";
class ProjectContest extends Component {
  state = {
    projects: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("api/users/contests")
      .then(res => {
        this.setState({ projects: res.data, loading: false });
      })
      .catch(err => console.log(err));
  }
  render() {
    var projects;
    if (this.state.projects.length === 0 || this.state.loading) {
      projects = <Spinner />;
    }
    if (this.state.projects.length !== 0) {
      projects = this.state.projects.map(project => {
        return (
          <div key={project.id} className="contest" style={{ display: "flex" }}>
            <div className="blank" />
            <div className="contest_container">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="contest_title">{project.title}</div>
                <div className="contest_price">Rs.{project.price}</div>
              </div>
              <div className="contest_description">{project.description}</div>
            </div>
          </div>
        );
      });
    }
    if (this.state.projects === undefined || null) {
      projects = (
        <h1 style={{ textAlign: "center" }} className="contest">
          There are no contest yet!
        </h1>
      );
    }
    return <Fragment>{projects}</Fragment>;
  }
}
export default ProjectContest;
