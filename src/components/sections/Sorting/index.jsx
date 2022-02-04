import React from "react";

import "./style.css";

function Sorting({ handleChange, data }) {
  return (
    <div className="sortInput">
      <select onChange={handleChange}>
        <option value="">{data.length !== 2 ? "All" : "Default"}</option>
        {data.map((res, index) => (
          <option key={index} value={res}>
            {res}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sorting;
