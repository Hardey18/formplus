import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { retrieveTemplate } from "../../slices/template";
import "./homepage.css";
import Card from "../Card";

function Homepage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setNewSearch] = useState("");
  const [mass, setMass] = useState("");

  const templates = useSelector((state) => state.templates);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveTemplate());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  // const filtered = !search
  //   ? templates
  //   : templates.filter((result) =>
  //       result.name.toLowerCase().includes(search.toLowerCase())
  //     );

  const filtered = search
    ? templates.filter((result) =>
        result.name.toLowerCase().includes(search.toLowerCase())
      )
    : mass
    ? templates.filter((result) =>
        result.mass.toLowerCase().includes(mass.toLowerCase())
      )
    : templates;

  const currentPageData = filtered
    .slice(offset, offset + PER_PAGE)
    .map(({ name, height }, index) => (
      <div key={index}>
        <Card name={name} height={height} />
      </div>
    ));

  const pageCount = Math.ceil(filtered.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };
  const handleMassChange = (e) => {
    setMass(e.target.value);
  };
  return (
    <>
      <div>
        <input
          className="search"
          placeholder="Search Templates"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
        <select onChange={handleMassChange}>
          <option value="">All</option>
          <option value="77">77</option>
          <option value="75">75</option>
          <option value="32">32</option>
        </select>
      </div>
      <p className="category">{mass || "All"} Templates</p>
      <div className="container">{currentPageData}</div>
      <ReactPaginate
        previousLabel={"< Previous"}
        nextLabel={"Next >"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>
  );
}

export default Homepage;
