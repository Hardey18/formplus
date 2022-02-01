import React from "react";
import "./card.css";

function Card({ name, height }) {
  return (
    <div className="item">
      <div className="top-container">
        <div className="name">{name}</div>
        <div className="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          dolorem repellendus modi possimus, eos
        </div>
        <div>{height}</div>
      </div>
      <div className="bottom">Use template</div>
    </div>
  );
}

export default Card;
