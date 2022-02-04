import React from "react";

import "./style.css";

function InputSearch({ handleChange, className, placeholder, type, value }) {
  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
}

export default InputSearch;
