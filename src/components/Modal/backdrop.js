import React from "react";
import "./backdrop.css";
const Backdrop = props =>
  props.show ? <div className="Backdrop" onClick={props.clicked} /> : null;

export default Backdrop;
