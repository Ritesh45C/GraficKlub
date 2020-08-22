import React, { Component } from "react";
import axios from "axios";
class PostContest extends Component {
  state = {
    title: "",
    description: "",
    price: "",
    feedback: "",
    errors: {}
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    const newInfo = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price
    };
    axios
      .post("/api/admin/postContest", newInfo)
      .then(res => this.setState({ feedback: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)} className="contest_form">
          <h1 className="contest_name">Contest Name</h1>
          <input
            value={this.state.title}
            name="title"
            onChange={e => this.onChangeHandler(e)}
            type="text"
          />
          <h1> Contest Description </h1>
          <textarea
            value={this.state.description}
            onChange={e => this.onChangeHandler(e)}
            placeholder="Write contest Description...."
            name="description"
            id=""
            cols="30"
            rows="10"
          />
          <h1>Contest Price</h1>
          <input
            value={this.state.price}
            name="price"
            onChange={e => this.onChangeHandler(e)}
            type="text"
          />
          <button style={{ margin: "auto" }} className="button" type="submit">
            Submit
          </button>
        </form>
        <h1 style={{ color: "green" }}>
          {" "}
          {this.state.feedback ? this.state.feedback : null}
        </h1>
      </div>
    );
  }
}
export default PostContest;
