import React from "react";
import Dialog from "../dialog";

function GeneralDialog({
  openDialog,
  close,
  title,
  subtitle,
  button1,
  onButton1Click,
  button2,
  onButton2Click,
}) {
  return (
    <React.Fragment>
      <Dialog open={openDialog} onClose={close}>
        <div className="clickable" onClick={close}></div>
        <div className="dialog-box pt3 pb3 pl3 pr3">
          <h4 className=" mr1">{title}</h4>

          <h6 className="mt2 mb2">{subtitle}</h6>

          <div className="spaced-between fullWidth mt3">
            <button
              className="fullWidth secondary-btn"
              onClick={onButton1Click}
            >
              {button1}
            </button>
            <button className="fullWidth" onClick={onButton2Click}>
              {button2}
            </button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default GeneralDialog;
