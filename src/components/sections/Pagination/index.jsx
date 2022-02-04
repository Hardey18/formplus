import React from "react";

import "./style.css";

function Pagination({
  handlePrevbtn,
  currentPage,
  pages,
  totalPage,
  handleNextbtn,
}) {
  return (
    <div className="pageNumbers">
      <button onClick={handlePrevbtn} disabled={currentPage === pages[0]}>
        Previous
      </button>
      <div>
        <span className="currentPage">{currentPage}</span> of{" "}
        <span className="totalPage">{totalPage}</span>
      </div>
      <button
        onClick={handleNextbtn}
        disabled={currentPage === pages[pages.length - 1]}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
