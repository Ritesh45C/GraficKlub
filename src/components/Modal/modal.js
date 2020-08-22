import React, { Fragment } from "react";
import "./modal.css";
import Backdrop from "./backdrop";
const Modal = ({ handleClose, show, children }) => {
  // const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    // {/* <div className={showHideClassName} onClick={handleClose} /> > */}
    <Fragment>
      <Backdrop show={show} clicked={handleClose} />
      {/* <section className="modal-main">{children}</section> */}
      <div
        className="Modal"
        style={{
          transform: show ? "translateY(0)" : "translateY(-50vh)",
          opacity: show ? "1" : "0"
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Modal;
