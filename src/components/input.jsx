import React from "react";

function Input({ placeholder, type, value, onChange }) {
  return (
    <input
      className="fullWidth"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
