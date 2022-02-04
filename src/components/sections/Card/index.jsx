import React from "react";

import "./style.css";

function Card({ name, description }) {
  return (
    <div className="item">
      <div className="top-container">
        <div className="name">{name}</div>
        <div className="content">{description}</div>
      </div>
      <div className="bottom">Use template</div>
    </div>
  );
}

export default Card;
