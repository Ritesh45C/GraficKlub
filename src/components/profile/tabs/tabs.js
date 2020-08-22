import React, { Component } from "react";

import Tab from "./tab";

class Tabs extends Component {
  state = {
    activeTab: this.props.children[0].props.label // this is first tab active by default
  };

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    // const {
    //   onClickTabItem,
    //   props: { children },
    //   state: { activeTab }
    // } = this;

    return (
      <div style={{ textAlign: this.props.style }} className="tabs">
        <ol className="tab-list">
          {this.props.children.map(child => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={this.state.activeTab}
                key={label}
                label={label}
                onClick={this.onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab_container">
          {this.props.children.map(child => {
            if (child.props.label !== this.state.activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
