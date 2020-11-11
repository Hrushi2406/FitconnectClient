import React, { useState } from "react";

function Chipbox(props) {
  return (
    <button
      style={props.style}
      className={
        props.isSelected
          ? "spaced-between chipbox pl2 pr2 pt1 pb1"
          : "chipbox pl5 pr5 pt1 pb1"
      }
      onClick={props.onClick}
    >
      <p className="text">{props.text}</p>
      {props.isSelected ? <i className="fas fa-check icon"></i> : <div></div>}
    </button>
  );
}

export default Chipbox;
