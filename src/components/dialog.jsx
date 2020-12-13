import React, { useState } from "react";

function Dialog(props) {
  if (!props.open) return <React.Fragment></React.Fragment>;

  return (
    <div onClick={props.close}>
      <div className={"overlay " + props.className}>{props.children}</div>
    </div>
  );
}

export default Dialog;
