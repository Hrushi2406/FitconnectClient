import React from "react";

function Slider({ min, max, value, onChange }) {
  return (
    <div className="slider">
      <h6 className="pr1"> {min}</h6>
      <div> </div>
      <input
        className="slider-input"
        value={value}
        onChange={onChange}
        type="range"
        min={min}
        max={max}
      />
      <h6 className="pl1"> {value}</h6>
    </div>
  );
}

export default Slider;
