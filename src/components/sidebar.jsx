import React from "react";
import "../css/pages/home.css";
import Chip from "../components/chip.jsx";

function Sidebar({
  name,
  fcRating,
  imageUrl,
  profession,
  distance,
  gender,
  age,
  mobile,
  button,
  onButtonClick,
}) {
  return (
    <div>
      {/* <div className="img-overlay"> */}
      {/* <div className="img-overlay-1"></div> */}
      <div className="spaced-between">
        <h5>{name}</h5>
        {fcRating != "" ? <Chip text={fcRating} /> : <div />}
      </div>
      <img
        className="person-img mt1"
        src={
          imageUrl ??
          "https://images.unsplash.com/photo-1528720208104-3d9bd03cc9d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        }
        alt="Fitconnect images"
      />
      {/* <h5 className="overlay-name">{name}</h5> */}
      {/* HEADING */}
      {/* </div> */}

      <div className="spaced-between mt2 mb2">
        <Chip text={profession} />
        <Chip text={distance} background="secondary-light" />
      </div>

      {/* PERSONAL INGO */}
      <div className="container pl4 pr4 pt3 pb3 secondary-background ">
        {/* <div className="spaced-between mb3">
          <h6>Fitconnect Rating</h6>
          <p>{fcRating}</p>
        </div> */}

        <div className="spaced-between mb3">
          <h6>Gender</h6>
          <p>{gender}</p>
        </div>

        <div className="spaced-between mb3">
          <h6>Age</h6>
          <p>{age}</p>
        </div>

        <div className="spaced-between">
          <h6>Mobile</h6>
          <p>{mobile}</p>
        </div>
      </div>

      {/* BUTTOn */}
      <button className="mt3 fullWidth" onClick={onButtonClick}>
        {button}
      </button>
    </div>
  );
}

export default Sidebar;
